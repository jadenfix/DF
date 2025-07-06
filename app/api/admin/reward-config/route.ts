import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../lib/mongodb';
import RewardConfig from '../../../../models/RewardConfig';
import { z } from 'zod';

const schema = z.object({
  accuracy: z.number().min(-10).max(10),
  helpfulness: z.number().min(-10).max(10),
  latency: z.number().min(-10).max(10),
});

function isAdmin(req: NextRequest) {
  return req.headers.get('x-admin-secret') === process.env.ADMIN_SECRET;
}

export async function GET(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await db();
  const RewardModel = RewardConfig as any;
  const doc = await RewardModel.findOne({}).sort({ updatedAt: -1 });
  return NextResponse.json({ data: doc });
}

export async function PUT(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  const parse = schema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ error: parse.error.flatten() }, { status: 400 });
  }
  await db();
  const RewardModel = RewardConfig as any;
  const doc = await RewardModel.findOneAndUpdate({}, parse.data, { upsert: true, new: true });
  return NextResponse.json({ data: doc });
} 