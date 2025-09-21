import mongoose, { Schema, InferSchemaType } from 'mongoose';

const postSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    verseRef: { type: String, default: null },
    text: { type: String, maxlength: 300 },
    imageUrl: { type: String, default: null },
    visibility: { type: String, enum: ['public', 'followers', 'private'], default: 'public', index: true },
    createdAt: { type: Date, default: Date.now, index: true },
    reactionsCount: {
      amen: { type: Number, default: 0 },
      heart: { type: Number, default: 0 }
    }
  },
  { timestamps: false }
);

export type PostDoc = InferSchemaType<typeof postSchema> & { _id: mongoose.Types.ObjectId };
export const Post = mongoose.model('Post', postSchema);

