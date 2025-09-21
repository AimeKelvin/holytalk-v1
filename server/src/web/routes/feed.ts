import { Router } from 'express';
import { Post } from '../../models/Post.js';
import { Reaction } from '../../models/Reaction.js';
import { Report } from '../../models/Report.js';

export const feedRouter = Router();

feedRouter.get('/', async (req, res) => {
  const userId = (req as any).userId || req.query.userId; // placeholder
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  const limit = Math.min(Number(req.query.limit) || 20, 50);
  const cursor = req.query.cursor as string | undefined;

  const query: any = { visibility: 'public' };
  if (cursor) query._id = { $lt: cursor };

  const items = await Post.find(query).sort({ _id: -1 }).limit(limit).lean();
  const nextCursor = items.length === limit ? String(items[items.length - 1]._id) : null;
  res.json({ items, nextCursor });
});

feedRouter.post('/', async (req, res) => {
  const userId = (req as any).userId || req.body.userId; // placeholder
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  const { verseRef = null, text = '', imageUrl = null, visibility = 'public' } = req.body || {};
  const post = await Post.create({ userId, verseRef, text, imageUrl, visibility });
  res.status(201).json(post);
});

feedRouter.post('/:id/react', async (req, res) => {
  const userId = (req as any).userId || req.body.userId; // placeholder
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  const { type } = req.body;
  const postId = req.params.id;
  if (!['amen', 'heart'].includes(type)) return res.status(400).json({ error: 'Invalid type' });
  try {
    await Reaction.create({ postId, userId, type });
  } catch {
    return res.status(409).json({ error: 'Already reacted' });
  }
  const incField = `reactionsCount.${type}`;
  await Post.updateOne({ _id: postId }, { $inc: { [incField]: 1 } as any });
  res.json({ ok: true });
});

feedRouter.post('/:id/report', async (req, res) => {
  const userId = (req as any).userId || req.body.userId; // placeholder
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  const postId = req.params.id;
  const { reason } = req.body || {};
  const report = await Report.create({ targetType: 'post', targetId: postId, reporterId: userId, reason });
  res.status(201).json(report);
});

