// Header/request contracts with explicit provider/database mocks. Device headers
// do not simulate rendered mobile layout or a real network.
import { NextRequest } from 'next/server';
import { POST as analyze } from '../app/api/analyze/route';
import { POST as feedback } from '../app/api/feedback/route';
import { GET as status } from '../app/api/status/route';
import { POST as generate } from '../app/api/generate/route';
import { POST as retrain } from '../app/api/retrain/route';
import { GET as analytics } from '../app/api/analytics/route';
import { moondream } from '../lib/moondream';
import db from '../lib/mongodb';
import Feedback from '../models/Feedback';

jest.mock('../lib/moondream', () => ({ moondream: { analyzeImage: jest.fn() } }));
jest.mock('../lib/mongodb', () => ({ __esModule: true, default: jest.fn() }));
jest.mock('../models/Feedback', () => ({ __esModule: true, default: { create: jest.fn() } }));
const agents = { iPhone: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)',
  Android: 'Mozilla/5.0 (Linux; Android 11; SM-G991B)', iPad: 'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X)' };
const devices = Object.keys(agents) as (keyof typeof agents)[];
const image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
const request = (path: string, body?: unknown, device: keyof typeof agents = 'iPhone') => new NextRequest(`http://localhost/api/${path}`, {
  method: body === undefined ? 'GET' : 'POST', headers: { 'content-type': 'application/json',
    'user-agent': agents[device], 'viewport-width': device === 'iPad' ? '1024' : '375', 'cache-control': 'no-cache' },
  ...(body === undefined ? {} : { body: JSON.stringify(body) }),
});
const vision = jest.mocked(moondream.analyzeImage);
const save = jest.mocked(Feedback.create);
const original = { vision: process.env.MOONDREAM_KEY, mongo: process.env.MONGODB_URI };

describe('API request contracts across device headers', () => {
  beforeEach(() => {
    jest.resetAllMocks(); process.env.MOONDREAM_KEY = 'fixture-only-key'; delete process.env.MONGODB_URI;
    vision.mockResolvedValue('Fixture mobile analysis'); jest.mocked(db).mockResolvedValue(undefined as never);
    save.mockResolvedValue({} as never);
  });
  afterAll(() => {
    for (const [name, value] of Object.entries({ MOONDREAM_KEY: original.vision, MONGODB_URI: original.mongo })) {
      if (value === undefined) delete process.env[name]; else process.env[name] = value;
    }
  });
  it('desktop status describes configuration, not measured health', async () => {
    expect(await (await status()).json()).toMatchObject({ status: 'degraded', dependenciesVerified: false });
  });
  it.each(devices)('%s status is independent of device headers', async () => {
    const response = await status(); expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ dependenciesVerified: false, services: { ai: 'configured_unverified' } });
  });
  it('requires image input on mobile', async () => {
    expect((await analyze(request('analyze', { prompt: 'Describe' }))).status).toBe(400);
    expect(vision).not.toHaveBeenCalled();
  });
  it('returns the supplied small-image provider result', async () => {
    const response = await analyze(request('analyze', { image, prompt: 'Describe quickly' }));
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ success: true, result: 'Fixture mobile analysis' });
    expect(vision).toHaveBeenCalledWith(image, 'Describe quickly');
  });
  it.each(devices)('forwards %s analysis requests', async device => {
    const prompt = `Analysis from ${device}`;
    expect((await analyze(request('analyze', { image, prompt }, device))).status).toBe(200);
    expect(vision).toHaveBeenCalledWith(image, prompt);
  });
  it('generation returns provider output and finite heuristic reward', async () => {
    const response = await generate(request('generate', { modelId: 'moondream2', image, prompt: 'Quick mobile test' }));
    expect(response.status).toBe(200);
    const body = await response.json(); expect(body.success).toBe(true);
    expect(body.result.response).toBe('Fixture mobile analysis');
    expect(Number.isFinite(body.result.rewardScore)).toBe(true);
  });
  it('generation with missing credentials refuses provider work', async () => {
    delete process.env.MOONDREAM_KEY;
    expect((await generate(request('generate', { image, prompt: 'Quick test' }))).status).toBe(503);
    expect(vision).not.toHaveBeenCalled();
  });
  it('generation provider failures remain failures', async () => {
    vision.mockRejectedValue(new Error('Provider unavailable'));
    const response = await generate(request('generate', { image, prompt: 'Quick test' }));
    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ success: false, error: 'Generation failed' });
  });
  it('analytics returns the prototype data shape, without asserting live metrics', async () => {
    const response = await analytics(request('analytics?branch=staging&timeRange=24h'));
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ branch: 'staging', timeRange: '24h', metrics: expect.any(Object), recentCalls: expect.any(Array) });
  });
  it('retraining validates missing reward weights', async () => {
    const response = await retrain(request('retrain', { model: 'moondream2', rewardFunction: 'mobile_optimized', datasetSize: 'small' }));
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ success: false, error: 'Reward weights are required' });
  });
  it('retraining returns a prototype plan, not proof of a trained model', async () => {
    const response = await retrain(request('retrain', { rewardWeights: { accuracy: 1 } }));
    expect(response.status).toBe(200);
    expect((await response.json()).steps).toEqual(expect.arrayContaining([expect.objectContaining({ step: 'complete' })]));
  });
  it('invalid analysisId is explicitly labeled demo feedback and not persisted', async () => {
    const response = await feedback(request('feedback', { analysisId: 'invalid-id', feedback: 'positive' }));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true, message: 'Feedback received (demo mode)' });
    expect(save).not.toHaveBeenCalled();
  });
  it.each(devices)('persists valid %s feedback', async device => {
    const comment = `Great answer from ${device}`;
    expect((await feedback(request('feedback', { analysisId: '507f1f77bcf86cd799439011', feedback: 'positive', rewardScore: 1, comment }, device))).status).toBe(200);
    expect(save).toHaveBeenCalledWith(expect.objectContaining({ upvote: true, comment }));
  });
  it('accepts supported sentiment alongside touch metadata', async () => {
    expect((await feedback(request('feedback', { analysisId: '507f1f77bcf86cd799439012', feedback: 'negative', rewardScore: 0.5,
      comment: 'Touch feedback', interactionType: 'touch', sessionDuration: 1500 }))).status).toBe(200);
    expect(save).toHaveBeenCalledWith(expect.objectContaining({ upvote: false, comment: 'Touch feedback' }));
  });
  it('a delayed provider is awaited before returning its result', async () => {
    let resolve: (value: string) => void = () => { throw new Error('No pending provider request'); };
    vision.mockImplementation(() => new Promise<string>(done => { resolve = done; }));
    const pending = analyze(request('analyze', { image, prompt: 'Slow connection' }));
    await new Promise(done => setImmediate(done));
    expect(vision).toHaveBeenCalledTimes(1);
    resolve('Delayed fixture answer');
    expect((await (await pending).json()).result).toBe('Delayed fixture answer');
  });
  it('concurrent status requests each return a complete honest response', async () => {
    const responses = await Promise.all(devices.map(() => status()));
    for (const response of responses) {
      expect(response.status).toBe(200);
      expect(await response.json()).toMatchObject({ status: 'degraded', dependenciesVerified: false });
    }
  });
});
