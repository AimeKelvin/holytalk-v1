import mongoose, { Schema, InferSchemaType } from 'mongoose';

const streakSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    current: { type: Number, default: 0 },
    longest: { type: Number, default: 0 },
    lastCheckinDate: { type: Date }
  },
  { timestamps: false }
);

export type StreakDoc = InferSchemaType<typeof streakSchema> & { _id: mongoose.Types.ObjectId };
export const Streak = mongoose.model('Streak', streakSchema);

