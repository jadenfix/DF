import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import { z } from 'zod';
import db from '../../lib/mongodb';
import Feedback from '../../models/Feedback';
import { updateFeedbackRewards } from '../../lib/mongodb';

const schema = z.object({
  analysisId: z.string(),
  upvote: z.boolean(),
  rewardScore: z.number().optional(),
  comment: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST' && req.url?.endsWith('/reward')) {
    // Simple admin secret check (replace with real auth in prod)
    if (req.headers['x-admin-secret'] !== process.env.ADMIN_SECRET) {
      return res.status(401).json({ status: 'error', error: 'Unauthorized' });
    }
    await updateFeedbackRewards(100);
    return res.status(200).json({ status: 'ok', message: 'Rewards updated' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', error: 'Method not allowed' });
  }

  await db();
  const parse = schema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ status: 'error', error: parse.error.flatten() });
  }

  const { analysisId, upvote, rewardScore, comment } = parse.data;
  const session = await getServerSession(req, res, authOptions);
  const userId = (session?.user as any)?.id;

  try {
    await (Feedback as any).create({ analysisId, upvote, userId, rewardScore, comment });
    return res.status(200).json({ status: 'ok' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 'error', error: 'Internal server error' });
  }
} 