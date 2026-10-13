import { GET } from '../app/api/status/route';
describe('observable service status', () => {
  const original = { mongo: process.env.MONGODB_URI, vision: process.env.MOONDREAM_KEY };
  afterEach(() => {
    for (const [name, value] of Object.entries({ MONGODB_URI: original.mongo, MOONDREAM_KEY: original.vision })) {
      if (value === undefined) delete process.env[name]; else process.env[name] = value;
    }
  });
  it('does not report unconfigured providers as operational', async () => {
    delete process.env.MONGODB_URI;
    delete process.env.MOONDREAM_KEY;
    const body = await (await GET()).json();
    expect(body.status).toBe('degraded');
    expect(body.services).toEqual({ api: 'operational', database: 'not_configured', ai: 'not_configured' });
    expect(body.dependenciesVerified).toBe(false);
  });
  it('does not mistake configured credentials for verified availability', async () => {
    process.env.MONGODB_URI = 'mongodb://localhost:27017/test';
    process.env.MOONDREAM_KEY = 'fixture-key';
    const body = await (await GET()).json();
    expect(body.status).toBe('unverified');
    expect(body.services.ai).toBe('configured_unverified');
    expect(body.services.database).toBe('configured_unverified');
  });
});
