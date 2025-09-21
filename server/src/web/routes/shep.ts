import { Router } from 'express';
import { z } from 'zod';
import { ShepReflection } from '../../models/ShepReflection.js';
import { Verse } from '../../models/Verse.js';

export const shepRouter = Router();

shepRouter.get('/daily', async (req, res) => {
  const translation = (req.query.translation as string) || 'KJV';
  const ref = (req.query.ref as string) || 'John 3:16';
  const date = new Date().toISOString().slice(0, 10);

  let cached = await ShepReflection.findOne({ date, translation, verseRef: ref }).lean();
  if (cached) return res.json(cached);

  const verse = await Verse.findOne({ ref, translation }).lean();
  if (!verse) return res.status(404).json({ error: 'Verse not found' });

  // Placeholder until LLM integration and caching policy implemented
  const content = {
    reflection: 'God’s love is freely given; receive it and let it shape your day.',
    question: 'Where can you show love that mirrors His today?',
    blessing: 'Grace and peace to you.'
  };

  cached = await ShepReflection.create({ date, translation, verseRef: ref, content, hash: `${date}|${translation}|${ref}` });
  res.json(cached);
});

const topicSchema = z.object({ topic: z.string().min(2) });
shepRouter.post('/topic', async (req, res) => {
  const parsed = topicSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid payload' });
  const translation = (req.query.translation as string) || 'KJV';
  const q = parsed.data.topic;
  const verses = await Verse.find({ translation, text: { $regex: q, $options: 'i' } })
    .limit(7)
    .lean();
  res.json({ verses });
});

const ctxSchema = z.object({ question: z.string().min(2) });
shepRouter.post('/context', async (req, res) => {
  const parsed = ctxSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid payload' });
  // Placeholder: Implement RAG constrained to retrieved verses
  res.json({ answer: 'Please read the provided passages for fuller context.', citations: [] });
});

