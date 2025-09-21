import mongoose, { Schema, InferSchemaType } from 'mongoose';

const highlightSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    verseRef: { type: String, index: true },
    color: { type: String },
    note: { type: String },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: false }
);

export type HighlightDoc = InferSchemaType<typeof highlightSchema> & { _id: mongoose.Types.ObjectId };
export const Highlight = mongoose.model('Highlight', highlightSchema);

