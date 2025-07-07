import { createMocks } from 'node-mocks-http';
import { POST as analyzeHandler } from '../app/api/analyze/route';
import { POST as feedbackHandler } from '../app/api/feedback/route';

describe('API route handlers', () => {
  it('POST /api/analyze returns ok', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { image: 'test', prompt: 'Describe' },
    });
    await analyzeHandler(req as any, res as any);
    expect(res._getStatusCode()).toBe(200);
    const json = JSON.parse(res._getData());
    expect(json.status).toBe('ok');
  });

  it('POST /api/feedback accepts upvote, rewardScore, and comment', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        analysisId: '507f1f77bcf86cd799439011',
        upvote: true,
        rewardScore: 1.0,
        comment: 'Great answer',
      },
    });
    await feedbackHandler(req as any, res as any);
    expect(res._getStatusCode()).toBe(200);
    const json = JSON.parse(res._getData());
    expect(json.status).toBe('ok');
  });

  it('POST /api/feedback/reward updates rewards (admin)', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      url: '/api/feedback/reward',
      headers: { 'x-admin-secret': 'testsecret' },
    });
    process.env.ADMIN_SECRET = 'testsecret';
    await feedbackHandler(req as any, res as any);
    expect(res._getStatusCode()).toBe(200);
    const json = JSON.parse(res._getData());
    expect(json.status).toBe('ok');
    expect(json.message).toBe('Rewards updated');
  });

  it('POST /api/analyze blocks guest over usage limit', async () => {
    process.env.FREE_IMAGE_LIMIT = '1';
    const { req, res } = createMocks({
      method: 'POST',
      body: { image: 'test', prompt: 'Describe' },
    });
    // Mock session as guest
    (req as any).session = { user: { id: 'guest-1', name: 'Guest' } };
    // First call should pass
    await analyzeHandler(req as any, res as any);
    // Second call should block
    const { req: req2, res: res2 } = createMocks({
      method: 'POST',
      body: { image: 'test', prompt: 'Describe' },
    });
    (req2 as any).session = { user: { id: 'guest-1', name: 'Guest' } };
    await analyzeHandler(req2 as any, res2 as any);
    expect(res2._getStatusCode()).toBe(429);
    const json = JSON.parse(res2._getData());
    expect(json.status).toBe('error');
    expect(json.error).toMatch(/limit/);
  });

  it('POST /api/analyze blocks guest over image size limit', async () => {
    process.env.FREE_MAX_IMAGE_SIZE_KB = '1';
    const bigImage = 'a'.repeat(2048); // >1KB base64
    const { req, res } = createMocks({
      method: 'POST',
      body: { image: bigImage, prompt: 'Describe' },
    });
    (req as any).session = { user: { id: 'guest-2', name: 'Guest' } };
    await analyzeHandler(req as any, res as any);
    expect(res._getStatusCode()).toBe(413);
    const json = JSON.parse(res._getData());
    expect(json.status).toBe('error');
    expect(json.error).toMatch(/too large/);
  });
}); 