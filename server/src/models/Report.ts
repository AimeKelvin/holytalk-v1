import mongoose, { Schema, InferSchemaType } from 'mongoose';

const reportSchema = new Schema(
  {
    targetType: { type: String, enum: ['post', 'comment', 'user'], required: true },
    targetId: { type: Schema.Types.ObjectId, required: true },
    reporterId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reason: { type: String },
    status: { type: String, enum: ['open', 'reviewing', 'resolved'], default: 'open' },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: false }
);

export type ReportDoc = InferSchemaType<typeof reportSchema> & { _id: mongoose.Types.ObjectId };
export const Report = mongoose.model('Report', reportSchema);

