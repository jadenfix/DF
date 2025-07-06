import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import { z } from 'zod';
import db from '../../lib/mongodb';
import Analysis from '../../models/Analysis';
import { moondream } from '../../lib/moondream';
import { anthropic } from '../../lib/anthropic';
import { incrementGuestUsage, getGuestUsageCount } from '../../lib/mongodb';

const schema = z.object({
  image: z.string(), // base64 encoded image or URL
  prompt: z.string(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', error: 'Method not allowed' });
  }

  await db();

  const parse = schema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ status: 'error', error: parse.error.flatten() });
  }

  const { image, prompt } = parse.data;

  // Determine user (may be guest)
  const session = await getServerSession(req, res, authOptions);
  // NextAuth default types don't include id; cast to any.
  const userId = (session?.user as any)?.id;
  const isGuest = session?.user?.name === 'Guest';

  // Guest usage limit enforcement
  if (isGuest) {
    const limit = Number(process.env.FREE_IMAGE_LIMIT || 25);
    const usage = await getGuestUsageCount(userId);
    if (usage >= limit) {
      return res.status(429).json({ status: 'error', error: `Guest usage limit (${limit}) reached. Please sign in for more.` });
    }
    await incrementGuestUsage(userId);
  }

  // Image size limit enforcement
  const maxSizeKB = Number(process.env.FREE_MAX_IMAGE_SIZE_KB || 256);
  if (!image.startsWith('http')) {
    // base64 size in bytes = (length * 3/4) - padding
    const sizeBytes = Math.ceil((image.length * 3) / 4) - (image.endsWith('==') ? 2 : image.endsWith('=') ? 1 : 0);
    const sizeKB = sizeBytes / 1024;
    if (isGuest && sizeKB > maxSizeKB) {
      return res.status(413).json({ status: 'error', error: `Image too large for guest (${Math.round(sizeKB)}KB > ${maxSizeKB}KB). Sign in for larger uploads.` });
    }
  }

  try {
    // Call Moondream model
    const primaryAnswer = await moondream.analyzeImage(image, prompt);

    // Optionally enrich with Anthropic if prompt seems complex (placeholder logic)
    let answer = primaryAnswer;
    if (prompt.length > 120 && process.env.ANTHROPIC_API_KEY) {
      answer = await anthropic.complete(`Image analysis result: ${primaryAnswer}. Question: ${prompt}. Provide detailed answer.`);
    }

    // Save to DB
    await (Analysis as any).create({ userId, prompt, image, answer });

    return res.status(200).json({ status: 'ok', data: { answer } });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ status: 'error', error: 'Internal server error' });
  }
} 