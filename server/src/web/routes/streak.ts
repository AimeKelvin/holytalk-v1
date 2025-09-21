import { Router } from 'express';
import { Streak } from '../../models/Streak.js';

export const streakRouter = Router();

streakRouter.post('/checkin', async (req, res) => {
  const userId = (req as any).userId || req.body.userId; // placeholder auth
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  const today = new Date();
  const todayKey = today.toISOString().slice(0, 10);
  const streak = (await Streak.findOne({ userId })) || new Streak({ userId, current: 0, longest: 0 });
  const lastKey = streak.lastCheckinDate ? streak.lastCheckinDate.toISOString().slice(0, 10) : null;
  if (lastKey === todayKey) return res.json(streak);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yKey = yesterday.toISOString().slice(0, 10);
  if (lastKey === yKey) {
    streak.current += 1;
  } else {
    streak.current = 1;
  }
  if (streak.current > streak.longest) streak.longest = streak.current;
  streak.lastCheckinDate = today;
  await streak.save();
  res.json(streak);
});

streakRouter.get('/me', async (req, res) => {
  const userId = (req as any).userId || req.query.userId; // placeholder
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  const streak = await Streak.findOne({ userId }).lean();
  res.json(streak || { current: 0, longest: 0 });
});

