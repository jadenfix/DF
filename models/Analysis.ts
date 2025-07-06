import mongoose from 'mongoose';

const AnalysisSchema = new mongoose.Schema(
  {
    userId: { type: String, required: false },
    prompt: { type: String, required: true },
    image: { type: String, required: true }, // base64 or URL
    answer: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Analysis || mongoose.model('Analysis', AnalysisSchema); 