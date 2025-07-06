import { NextRequest, NextResponse } from 'next/server';
import { updateFeedbackRewards } from '../../../../lib/mongodb';

function isAdmin(req: NextRequest) {
  return req.headers.get('x-admin-secret') === process.env.ADMIN_SECRET;
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const limit = Number(req.nextUrl.searchParams.get('limit') || 100);
  await updateFeedbackRewards(limit);
  return NextResponse.json({ message: `Updated rewards for latest ${limit} feedback entries` });
} 