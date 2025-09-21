import mongoose, { Schema, InferSchemaType } from 'mongoose';

const followSchema = new Schema(
  {
    followerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    followeeId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: false }
);

followSchema.index({ followerId: 1, followeeId: 1 }, { unique: true });

export type FollowDoc = InferSchemaType<typeof followSchema> & { _id: mongoose.Types.ObjectId };
export const Follow = mongoose.model('Follow', followSchema);

