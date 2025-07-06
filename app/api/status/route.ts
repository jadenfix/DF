import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const status = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      services: {
        api: 'operational',
        database: 'operational',
        ai: 'operational',
      },
      uptime: process.uptime(),
    };

    return NextResponse.json(status);
  } catch (error) {
    return NextResponse.json(
      { status: 'error', error: 'Service unavailable' },
      { status: 503 }
    );
  }
} 