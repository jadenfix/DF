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

export type AnalysisRecord = mongoose.InferSchemaType<typeof AnalysisSchema>;
export default (mongoose.models.Analysis as mongoose.Model<AnalysisRecord> | undefined) || mongoose.model<AnalysisRecord>('Analysis', AnalysisSchema); 