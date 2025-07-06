import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema(
  {
    analysisId: { type: mongoose.Schema.Types.ObjectId, ref: 'Analysis', required: true },
    userId: { type: String, required: false },
    upvote: { type: Boolean, required: true },
    rewardScore: { type: Number, required: false }, // RLHF reward value
    comment: { type: String, required: false }, // Optional qualitative feedback
  },
  { timestamps: true }
);

export default mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema); 