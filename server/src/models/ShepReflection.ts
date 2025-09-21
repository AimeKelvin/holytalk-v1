import mongoose, { Schema, InferSchemaType } from 'mongoose';

const shepReflectionSchema = new Schema(
  {
    date: { type: String, index: true },
    translation: { type: String, index: true },
    verseRef: { type: String, index: true },
    content: {
      reflection: String,
      question: String,
      blessing: String
    },
    hash: { type: String }
  },
  { timestamps: false }
);

shepReflectionSchema.index({ date: 1, translation: 1, verseRef: 1 }, { unique: true });

export type ShepReflectionDoc = InferSchemaType<typeof shepReflectionSchema> & { _id: mongoose.Types.ObjectId };
export const ShepReflection = mongoose.model('ShepReflection', shepReflectionSchema);

