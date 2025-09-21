import mongoose, { Schema, InferSchemaType } from 'mongoose';

const verseSchema = new Schema(
  {
    book: { type: String, index: true },
    chapter: { type: Number, index: true },
    verse: { type: Number, index: true },
    text: { type: String },
    translation: { type: String, index: true },
    bookIndex: { type: Number, index: true },
    ref: { type: String, index: true }
  },
  { timestamps: false }
);

verseSchema.index({ book: 1, chapter: 1, verse: 1, translation: 1 }, { unique: true });

export type VerseDoc = InferSchemaType<typeof verseSchema> & { _id: mongoose.Types.ObjectId };
export const Verse = mongoose.model('Verse', verseSchema);

