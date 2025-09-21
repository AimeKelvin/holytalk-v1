import { Router } from 'express';
import { z } from 'zod';
import { User } from '../../models/User.js';

export const meRouter = Router();

meRouter.get('/me', async (req, res) => {
  const userId = (req as any).userId || req.query.userId; // placeholder
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  const user = await User.findById(userId).lean();
  res.json(user);
});

const updateSchema = z.object({
  displayName: z.string().optional(),
  bio: z.string().optional(),
  privacyLevel: z.enum(['public', 'followers', 'private']).optional()
});

meRouter.patch('/me', async (req, res) => {
  const userId = (req as any).userId || req.query.userId; // placeholder
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid payload' });
  const user = await User.findByIdAndUpdate(userId, parsed.data, { new: true }).lean();
  res.json(user);
});

