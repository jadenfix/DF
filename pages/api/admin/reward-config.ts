import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { z } from 'zod';
import db from '../../../lib/mongodb';
import RewardConfig from '../../../models/RewardConfig';

const schema = z.object({
  accuracy: z.number().min(-10).max(10),
  helpfulness: z.number().min(-10).max(10),
  latency: z.number().min(-10).max(10),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await db();
  const session = await getServerSession(req, res, authOptions);
  const isAdmin = (session?.user?.email && session.user.email === process.env.ADMIN_EMAIL) || req.headers['x-admin-secret'] === process.env.ADMIN_SECRET;
  if (!isAdmin) {
    return res.status(401).json({ status: 'error', error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const RewardModel = RewardConfig as any;
    const doc = await RewardModel.findOne({}).sort({ updatedAt: -1 });
    return res.status(200).json({ status: 'ok', data: doc });
  }

  if (req.method === 'PUT') {
    const parse = schema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ status: 'error', error: parse.error.flatten() });
    }
    const RewardModel = RewardConfig as any;
    const doc = await RewardModel.findOneAndUpdate({}, parse.data, { upsert: true, new: true });
    return res.status(200).json({ status: 'ok', data: doc });
  }

  return res.status(405).json({ status: 'error', error: 'Method not allowed' });
} 