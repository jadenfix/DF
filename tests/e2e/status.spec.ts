import { test, expect } from '@playwright/test';

test('status endpoint distinguishes local API from unverified dependencies', async ({ request }) => {
  const res = await request.get('/api/status');
  expect(res.status()).toBe(200);
  const json = await res.json();
  expect(['degraded', 'unverified']).toContain(json.status);
  expect(json.dependenciesVerified).toBe(false);
  expect(json.services.ai).not.toBe('operational');
  expect(json.services.database).not.toBe('operational');
  expect(json.services).toBeDefined();
  expect(json.services.api).toBe('operational');
  expect(json.timestamp).toBeDefined();
}); 