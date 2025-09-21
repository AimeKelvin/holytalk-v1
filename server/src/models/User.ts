import mongoose, { Schema, InferSchemaType } from 'mongoose';

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true, index: true },
    googleId: { type: String, index: true },
    displayName: { type: String },
    avatarUrl: { type: String },
    bio: { type: String },
    privacyLevel: {
      type: String,
      enum: ['public', 'followers', 'private'],
      default: 'public'
    }
  },
  { timestamps: true }
);

export type UserDoc = InferSchemaType<typeof userSchema> & { _id: mongoose.Types.ObjectId };
export const User = mongoose.model('User', userSchema);

