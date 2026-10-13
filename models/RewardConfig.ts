import mongoose from 'mongoose';

const RewardConfigSchema = new mongoose.Schema({
  accuracy: { type: Number, default: 2 },
  helpfulness: { type: Number, default: 1 },
  latency: { type: Number, default: -1 },
}, { timestamps: true });

export type RewardConfigRecord = mongoose.InferSchemaType<typeof RewardConfigSchema>;
export default (mongoose.models.RewardConfig as mongoose.Model<RewardConfigRecord> | undefined) || mongoose.model<RewardConfigRecord>('RewardConfig', RewardConfigSchema); 