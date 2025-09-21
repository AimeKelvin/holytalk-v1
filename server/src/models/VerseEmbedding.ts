import mongoose, { Schema, InferSchemaType } from 'mongoose';

const verseEmbeddingSchema = new Schema(
  {
    verseId: { type: Schema.Types.ObjectId, ref: 'Verse', index: true },
    vector: { type: [Number], required: true },
    translation: { type: String }
  },
  { timestamps: false }
);

export type VerseEmbeddingDoc = InferSchemaType<typeof verseEmbeddingSchema> & { _id: mongoose.Types.ObjectId };
export const VerseEmbedding = mongoose.model('VerseEmbedding', verseEmbeddingSchema);

