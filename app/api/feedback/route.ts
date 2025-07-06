import { NextRequest, NextResponse } from 'next/server';
import db from '../../../lib/mongodb';
import Feedback from '../../../models/Feedback';
import mongoose from 'mongoose';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    await db();
    
    const schema = z.object({
      analysisId: z.string(),
      feedback: z.enum(['positive', 'negative']),
      rewardScore: z.number().optional(),
      comment: z.string().optional(),
    });

    const body = await request.json();
    const parse = schema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json({ success: false, error: parse.error.flatten() }, { status: 400 });
    }

    const { analysisId, feedback: sentiment, rewardScore, comment } = parse.data;

    // Ensure analysisId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(analysisId)) {
      console.warn('Invalid analysisId provided, skipping save:', analysisId);
      return NextResponse.json({ success: true, message: 'Feedback received (demo mode)' });
    }

    const upvote = sentiment === 'positive';

    await Feedback.create({ analysisId, upvote, rewardScore, comment });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Feedback error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to record feedback' },
      { status: 500 }
    );
  }
} 