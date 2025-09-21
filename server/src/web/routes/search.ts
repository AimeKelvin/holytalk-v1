import { Router } from 'express';
import { Verse } from '../../models/Verse.js';

export const searchRouter = Router();

searchRouter.get('/', async (req, res) => {
  const q = (req.query.q as string) || '';
  const semantic = String(req.query.semantic) === 'true';
  const translation = (req.query.translation as string) || 'KJV';

  if (!q) return res.json({ results: [] });

  // Keyword baseline
  const keywordResults = await Verse.find({ translation, text: { $regex: q, $options: 'i' } })
    .limit(20)
    .lean();

  // Semantic placeholder: to be implemented with Atlas Vector Search
  const semanticResults = semantic ? [] : [];

  res.json({ keyword: keywordResults, semantic: semanticResults });
});

