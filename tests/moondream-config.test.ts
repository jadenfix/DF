import { getMoondreamClient, MoondreamClient } from '../lib/moondream';

describe('request-time vision provider configuration', () => {
  const original = process.env.MOONDREAM_KEY;
  afterEach(() => {
    if (original === undefined) delete process.env.MOONDREAM_KEY;
    else process.env.MOONDREAM_KEY = original;
  });
  it('can import provider module without credentials but refuses inference client creation', () => {
    delete process.env.MOONDREAM_KEY;
    expect(() => getMoondreamClient()).toThrow('Valid Moondream API key is required');
  });
  it('reads credentials added after module import', () => {
    process.env.MOONDREAM_KEY = 'local-test-only-key';
    expect(getMoondreamClient()).toBeInstanceOf(MoondreamClient);
  });
});

import { POST as generate } from '../app/api/generate/route';
import { POST as analyze } from '../app/api/analyze/route';
import { NextRequest } from 'next/server';

describe('unconfigured inference routes', () => {
  const original = process.env.MOONDREAM_KEY;
  beforeEach(() => { delete process.env.MOONDREAM_KEY; });
  afterEach(() => {
    if (original === undefined) delete process.env.MOONDREAM_KEY;
    else process.env.MOONDREAM_KEY = original;
  });
  it.each([generate, analyze])('validates input before reporting unavailable inference', async (handler) => {
    const request = new NextRequest('http://localhost/api/test', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' });
    expect((await handler(request)).status).toBe(400);
  });
  it.each([generate, analyze])('returns explicit 503 rather than fabricated results', async (handler) => {
    const request = new NextRequest('http://localhost/api/test', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ image: 'data:image/png;base64,test', prompt: 'Describe this' }) });
    const response = await handler(request);
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ success: false, error: 'Configure MOONDREAM_KEY to enable image inference.' });
  });
});
