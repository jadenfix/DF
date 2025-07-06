import mongoose from 'mongoose';

const RewardConfigSchema = new mongoose.Schema({
  accuracy: { type: Number, default: 2 },
  helpfulness: { type: Number, default: 1 },
  latency: { type: Number, default: -1 },
}, { timestamps: true });

export default mongoose.models.RewardConfig || mongoose.model('RewardConfig', RewardConfigSchema); 