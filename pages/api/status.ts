import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/mongodb';
import { moondream } from '../../lib/moondream';
import { anthropic } from '../../lib/anthropic';

// Simple health check endpoint to verify env keys and connectivity.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ status: 'error', error: 'Method not allowed' });
  }

  const status: Record<string, any> = {};

  // MongoDB status
  try {
    await db();
    status.mongodb = 'ok';
  } catch (err: any) {
    status.mongodb = 'error: ' + err.message;
  }

  // Moondream key presence
  status.moondreamKey = !!process.env.MOONDREAM_KEY || !!process.env.FAL_KEY;

  // Anthropic key presence
  status.anthropicKey = !!process.env.ANTHROPIC_API_KEY;

  // Stripe key presence
  status.stripeKey = !!process.env.STRIPE_SECRET_KEY;

  return res.status(200).json({ status: 'ok', data: status });
} 