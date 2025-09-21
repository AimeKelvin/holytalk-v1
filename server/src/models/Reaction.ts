import mongoose, { Schema, InferSchemaType } from 'mongoose';

const reactionSchema = new Schema(
  {
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['amen', 'heart'], required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: false }
);

reactionSchema.index({ postId: 1, userId: 1, type: 1 }, { unique: true });

export type ReactionDoc = InferSchemaType<typeof reactionSchema> & { _id: mongoose.Types.ObjectId };
export const Reaction = mongoose.model('Reaction', reactionSchema);

