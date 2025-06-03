import mongoose, { Schema, Document } from 'mongoose';
import { IPlan } from './Plan';

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'editor' | 'concierge';
  plan: Schema.Types.ObjectId | IPlan;
  iaSearchesUsed: number;
  suggestionUsed: number;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, enum: ['admin', 'editor', 'concierge'], default: 'concierge' },
  plan: { type: Schema.Types.ObjectId, ref: 'Plan', required: true },
  iaSearchesUsed: { type: Number, default: 0 },
  suggestionUsed: { type: Number, default: 0 },
});

export const User = mongoose.model<IUser>('User', UserSchema);
