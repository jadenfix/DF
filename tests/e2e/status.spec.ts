import { test, expect } from '@playwright/test';

test('status endpoint reports healthy', async ({ request }) => {
  const res = await request.get('http://localhost:3000/api/status');
  expect(res.status()).toBe(200);
  const json = await res.json();
  expect(json.status).toBe('ok');
  expect(json.data.mongodb).toBe('ok');
  if (process.env.MOONDREAM_KEY || process.env.FAL_KEY) {
    expect(json.data.moondreamKey).toBe(true);
  }
  if (process.env.ANTHROPIC_API_KEY) {
    expect(json.data.anthropicKey).toBe(true);
  }
}); 