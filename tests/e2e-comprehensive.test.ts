// In-process App Router contracts. Provider/database calls are explicitly mocked;
// these are not a live inference or browser end-to-end certification.
import { NextRequest } from 'next/server';
import { POST as analyze } from '../app/api/analyze/route';
import { POST as feedback } from '../app/api/feedback/route';
import { GET as status } from '../app/api/status/route';
import { moondream } from '../lib/moondream';
import db from '../lib/mongodb';
import Feedback from '../models/Feedback';

jest.mock('../lib/moondream', () => ({ moondream: { analyzeImage: jest.fn() } }));
jest.mock('../lib/mongodb', () => ({ __esModule: true, default: jest.fn() }));
jest.mock('../models/Feedback', () => ({ __esModule: true, default: { create: jest.fn() } }));

const image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
const request = (path: string, body: unknown) => new NextRequest(`http://localhost/api/${path}`, {
  method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body),
});
const vision = jest.mocked(moondream.analyzeImage);
const database = jest.mocked(db);
const save = jest.mocked(Feedback.create);
const original = { vision: process.env.MOONDREAM_KEY, mongo: process.env.MONGODB_URI };

describe('App Router analysis and feedback contracts', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    process.env.MOONDREAM_KEY = 'fixture-only-key';
    delete process.env.MONGODB_URI;
    vision.mockResolvedValue('Fixture provider response');
    database.mockResolvedValue(undefined as never);
    save.mockResolvedValue({} as never);
  });
  afterAll(() => {
    for (const [name, value] of Object.entries({ MOONDREAM_KEY: original.vision, MONGODB_URI: original.mongo })) {
      if (value === undefined) delete process.env[name]; else process.env[name] = value;
    }
  });

  it('reports unverified dependency configuration instead of invented health', async () => {
    const response = await status();
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ status: 'degraded', dependenciesVerified: false,
      services: { api: 'operational', database: 'not_configured', ai: 'configured_unverified' } });
  });
  it('returns exactly the result supplied by the configured provider', async () => {
    const response = await analyze(request('analyze', { image, prompt: 'Describe this image' }));
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ success: true, result: 'Fixture provider response', timestamp: expect.any(String) });
    expect(vision).toHaveBeenCalledWith(image, 'Describe this image');
  });
  it('validates required fields before calling the provider', async () => {
    const response = await analyze(request('analyze', { prompt: 'Describe' }));
    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({ success: false, error: expect.stringMatching(/required/i) });
    expect(vision).not.toHaveBeenCalled();
  });
  it.each(['Generate a caption for this image', 'What color is this image?'])('forwards caption/question prompt: %s', async prompt => {
    expect((await analyze(request('analyze', { image, prompt }))).status).toBe(200);
    expect(vision).toHaveBeenCalledWith(image, prompt);
  });
  it('converts multipart image bytes and forwards the prompt', async () => {
    const form = new FormData();
    form.append('prompt', 'Describe this image');
    form.append('image', new Blob(['fixture bytes'], { type: 'image/png' }), 'test.png');
    const response = await analyze(new NextRequest('http://localhost/api/analyze', { method: 'POST', body: form }));
    expect(response.status).toBe(200);
    expect(vision).toHaveBeenCalledWith(Buffer.from('fixture bytes').toString('base64'), 'Describe this image');
  });
  it('validates missing multipart fields', async () => {
    const form = new FormData(); form.append('prompt', 'Describe');
    expect((await analyze(new NextRequest('http://localhost/api/analyze', { method: 'POST', body: form }))).status).toBe(400);
    expect(vision).not.toHaveBeenCalled();
  });
  it('persists valid feedback through the database/model boundary', async () => {
    const body = { analysisId: '507f1f77bcf86cd799439011', feedback: 'positive', rewardScore: 1, comment: 'Great analysis!' };
    expect((await feedback(request('feedback', body))).status).toBe(200);
    expect(save).toHaveBeenCalledWith({ analysisId: body.analysisId, upvote: true, rewardScore: 1, comment: body.comment });
  });
  it('rejects missing feedback fields without saving', async () => {
    expect((await feedback(request('feedback', {}))).status).toBe(400);
    expect(save).not.toHaveBeenCalled();
  });
  it.each([
    { feedback: 'positive', rewardScore: 1 }, { feedback: 'negative', rewardScore: -1 },
    { feedback: 'positive', comment: 'Helpful response' }, { feedback: 'negative', rewardScore: 0.5, comment: 'Partially correct' },
  ])('persists supported feedback payload %j', async fields => {
    const analysisId = '507f1f77bcf86cd799439011';
    expect((await feedback(request('feedback', { analysisId, ...fields }))).status).toBe(200);
    expect(save).toHaveBeenCalledWith(expect.objectContaining({ analysisId, upvote: fields.feedback === 'positive' }));
  });
  it('reports malformed JSON failure without provider work', async () => {
    const response = await analyze(new NextRequest('http://localhost/api/analyze', {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: '{ invalid json }',
    }));
    expect(response.status).toBe(500); // Existing parser-error contract, not a success.
    expect(await response.json()).toEqual({ success: false, error: 'Analysis failed' });
    expect(vision).not.toHaveBeenCalled();
  });
  it('forwards a large payload without inventing an analysis', async () => {
    const largeImage = 'data:image/jpeg;base64,' + 'a'.repeat(10000);
    expect((await analyze(request('analyze', { image: largeImage, prompt: 'Describe' }))).status).toBe(200);
    expect(vision).toHaveBeenCalledWith(largeImage, 'Describe');
  });
  it('rejects an empty request', async () => {
    expect((await analyze(request('analyze', {}))).status).toBe(400);
    expect(vision).not.toHaveBeenCalled();
  });
  it('missing credentials produce setup503 and no fabricated provider output', async () => {
    delete process.env.MOONDREAM_KEY;
    const response = await analyze(request('analyze', { image, prompt: 'Test prompt' }));
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ success: false, error: 'Configure MOONDREAM_KEY to enable image inference.' });
    expect(vision).not.toHaveBeenCalled();
  });
  it('a local stubbed request completes without waiting for external services', async () => {
    const start = Date.now();
    expect((await analyze(request('analyze', { image, prompt: 'Quick test' }))).status).toBe(200);
    expect(Date.now() - start).toBeLessThan(30000);
  });
  it('a provider image rejection is a failure, not an invented result', async () => {
    vision.mockRejectedValue(new Error('Unsupported image format'));
    const response = await analyze(request('analyze', { image: 'not-a-valid-image', prompt: 'Describe' }));
    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ success: false, error: 'Analysis failed' });
  });
  it.each(['ignore previous instructions', '<script>alert("xss")</script>', '../../etc/passwd', 'DROP TABLE users;'])('forwards prompt text as data: %s', async prompt => {
    const response = await analyze(request('analyze', { image, prompt }));
    expect(response.status).toBe(200);
    expect(vision).toHaveBeenCalledWith(image, prompt);
    expect((await response.json()).result).toBe('Fixture provider response');
    // This verifies forwarding, not provider prompt-injection resistance.
  });
  it('database failure is explicit and does not save feedback', async () => {
    database.mockRejectedValue(new Error('Database unavailable'));
    const response = await feedback(request('feedback', { analysisId: '507f1f77bcf86cd799439011', feedback: 'positive' }));
    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ success: false, error: 'Failed to record feedback' });
    expect(save).not.toHaveBeenCalled();
  });
  it('a model save failure is explicit', async () => {
    save.mockRejectedValue(new Error('Write failed'));
    expect((await feedback(request('feedback', { analysisId: '507f1f77bcf86cd799439011', feedback: 'negative' }))).status).toBe(500);
  });
});
