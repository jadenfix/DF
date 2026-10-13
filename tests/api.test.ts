import { NextRequest } from 'next/server';
import { POST as analyze } from '../app/api/analyze/route';
import { POST as feedback } from '../app/api/feedback/route';
import Feedback from '../models/Feedback';
jest.mock('../lib/mongodb', () => ({ __esModule: true, default: jest.fn().mockResolvedValue(undefined) }));
jest.mock('../models/Feedback', () => ({ __esModule: true, default: { create: jest.fn().mockResolvedValue({}) } }));
const request = (body: unknown) => new NextRequest('http://localhost/api/test', {
  method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body),
});
describe('App Router request/response contracts', () => {
  beforeEach(() => { jest.clearAllMocks(); });
  it('validates incomplete analysis input', async () => {
    expect((await analyze(request({ image: 'fixture' }))).status).toBe(400);
  });
  it('requires configured vision inference rather than fabricating a result', async () => {
    const original = process.env.MOONDREAM_KEY;
    delete process.env.MOONDREAM_KEY;
    try {
      const response = await analyze(request({ image: 'fixture', prompt: 'Describe' }));
      expect(response.status).toBe(503);
      expect((await response.json()).success).toBe(false);
    } finally {
      if (original === undefined) delete process.env.MOONDREAM_KEY; else process.env.MOONDREAM_KEY = original;
    }
  });
  it('persists valid positive feedback through the model', async () => {
    const response = await feedback(request({ analysisId: '507f1f77bcf86cd799439011', feedback: 'positive', comment: 'Useful' }));
    expect(response.status).toBe(200);
    expect(Feedback.create).toHaveBeenCalledWith(expect.objectContaining({ upvote: true, comment: 'Useful' }));
  });
  it('rejects invalid feedback sentiment without writing', async () => {
    expect((await feedback(request({ analysisId: '507f1f77bcf86cd799439011', feedback: 'unknown' }))).status).toBe(400);
    expect(Feedback.create).not.toHaveBeenCalled();
  });
  it('labels non-persisted demo IDs instead of saving them as database records', async () => {
    const response = await feedback(request({ analysisId: 'demo-id', feedback: 'negative' }));
    expect((await response.json()).message).toContain('demo mode');
    expect(Feedback.create).not.toHaveBeenCalled();
  });
});
