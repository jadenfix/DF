import { test, expect } from '@playwright/test';

test('status endpoint reports healthy', async ({ request }) => {
  const res = await request.get('http://localhost:3000/api/status');
  expect(res.status()).toBe(200);
  const json = await res.json();
  expect(json.status).toBe('healthy');
  expect(json.services).toBeDefined();
  expect(json.services.api).toBe('operational');
  expect(json.timestamp).toBeDefined();
}); 