import mongoose, { Schema, Document } from 'mongoose';

export interface IPlan extends Document {
  name: string;
  iaSearchQuota: number;
  suggestionQuota: number;
  users: number;
}

const PlanSchema = new Schema<IPlan>({
  name: { type: String, required: true, unique: true },
  iaSearchQuota: { type: Number, required: true },
  suggestionQuota: { type: Number, required: true },
  users: { type: Number, required: true },
});

export const Plan = mongoose.model<IPlan>('Plan', PlanSchema);
