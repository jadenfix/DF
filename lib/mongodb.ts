import mongoose from 'mongoose';
import Feedback from '../models/Feedback';
import Analysis from '../models/Analysis';

let MONGODB_URI = process.env.MONGODB_URI as string | undefined;

// Fallback to an in-memory MongoDB instance during local development/testing
async function getMemoryServerUri() {
  const { MongoMemoryServer } = await import('mongodb-memory-server');
  const mem = await MongoMemoryServer.create();
  // eslint-disable-next-line no-console
  console.warn(`[MongoDB] Using in-memory MongoDB instance at ${mem.getUri()}`);
  return mem.getUri();
}

interface MongooseGlobal {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached: MongooseGlobal = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export default async function db() {
  if (cached.conn) return cached.conn;

  // If no URI or previous attempt failed, use memory server
  async function connect(uri: string) {
    return mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
  }

  if (!cached.promise) {
    try {
      const uri = MONGODB_URI || '';
      if (uri) {
        cached.promise = connect(uri);
        cached.conn = await cached.promise;
        return cached.conn;
      }
      if (process.env.NODE_ENV === 'production') {
        throw new Error('MONGODB_URI is required in production.');
      }
      // Only allow in-memory fallback in dev/test
      MONGODB_URI = await getMemoryServerUri();
      cached.promise = connect(MONGODB_URI);
      cached.conn = await cached.promise;
      return cached.conn;
    } catch (err) {
      if (process.env.NODE_ENV === 'production') {
        throw err;
      }
      // eslint-disable-next-line no-console
      console.warn('[MongoDB] Primary connection failed, falling back to in-memory');
      MONGODB_URI = await getMemoryServerUri();
      cached.promise = connect(MONGODB_URI);
      cached.conn = await cached.promise;
      return cached.conn;
    }
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

/**
 * Fetches recent feedback and associated analysis for RLHF training.
 * @param {number} limit - Max number of feedback entries to fetch.
 * @returns {Promise<Array<{feedback: any, analysis: any}>>}
 */
export async function getFeedbackForRLHF(limit = 100): Promise<Array<{feedback: any, analysis: any}>> {
  await db();
  // Get latest feedback with populated analysis
  const FeedbackModel = Feedback as mongoose.Model<any>;
  const feedbacks = await FeedbackModel.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('analysisId');
  return feedbacks.map((fb: any) => ({
    feedback: fb.toObject(),
    analysis: fb.analysisId ? fb.analysisId.toObject() : null,
  }));
}

/**
 * Calculates RLHF reward for a feedback/analysis pair using env weights.
 * @param feedback - Feedback document
 * @param analysis - Analysis document
 * @returns {number} Reward value
 */
export function calculateRLHFReward(feedback: any, analysis: any): number {
  // Example: reward = w1*upvote + w2*helpfulness + w3*latency
  const wAccuracy = Number(process.env.REWARD_WEIGHT_ACCURACY || 2);
  const wHelpfulness = Number(process.env.REWARD_WEIGHT_HELPFULNESS || 1);
  const wLatency = Number(process.env.REWARD_WEIGHT_LATENCY || -1);
  // For now, use upvote as accuracy, helpfulness as 1 if comment exists, latency as 0 (placeholder)
  const accuracy = feedback.upvote ? 1 : 0;
  const helpfulness = feedback.comment ? 1 : 0;
  const latency = 0; // TODO: add latency tracking
  return wAccuracy * accuracy + wHelpfulness * helpfulness + wLatency * latency;
}

/**
 * Updates rewardScore for recent feedbacks using calculateRLHFReward.
 * Intended for use in RLHF cron job.
 */
export async function updateFeedbackRewards(limit = 100) {
  const items = await getFeedbackForRLHF(limit);
  for (const { feedback, analysis } of items) {
    const reward = calculateRLHFReward(feedback, analysis);
    const FeedbackModel = Feedback as mongoose.Model<any>;
    await FeedbackModel.updateOne({ _id: feedback._id }, { $set: { rewardScore: reward } });
  }
}

/**
 * Increments guest usage count for a user (by userId) in Analysis collection.
 * @param userId - Guest user ID
 */
export async function incrementGuestUsage(userId: string) {
  const AnalysisModel = Analysis as mongoose.Model<any>;
  await AnalysisModel.create({ userId, prompt: '__usage__', image: '__usage__' });
}

/**
 * Gets the number of analysis requests made by a guest user.
 * @param userId - Guest user ID
 * @returns {Promise<number>} Usage count
 */
export async function getGuestUsageCount(userId: string): Promise<number> {
  return Analysis.countDocuments({ userId });
} 