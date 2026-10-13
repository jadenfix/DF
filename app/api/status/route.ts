import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Configuration is observable here; remote service availability is not.
  const databaseConfigured = Boolean(process.env.MONGODB_URI?.trim()) &&
    !process.env.MONGODB_URI?.includes('your-');
  const visionConfigured = Boolean(process.env.MOONDREAM_KEY?.trim()) &&
    process.env.MOONDREAM_KEY !== 'your-real-moondream-api-key';
  return NextResponse.json({
    status: databaseConfigured && visionConfigured ? 'unverified' : 'degraded',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    services: {
      api: 'operational',
      database: databaseConfigured ? 'configured_unverified' : 'not_configured',
      ai: visionConfigured ? 'configured_unverified' : 'not_configured',
    },
    dependenciesVerified: false,
    uptime: process.uptime(),
  });
}
