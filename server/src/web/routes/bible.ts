import { Router } from 'express';
import { Verse } from '../../models/Verse.js';

export const bibleRouter = Router();

bibleRouter.get('/books', async (_req, res) => {
  const books = await Verse.aggregate([
    { $group: { _id: '$book', bookIndex: { $first: '$bookIndex' } } },
    { $sort: { bookIndex: 1 } },
    { $project: { _id: 0, book: '$_id', bookIndex: 1 } }
  ]);
  res.json(books);
});

bibleRouter.get('/:book/:chapter', async (req, res) => {
  const { book, chapter } = req.params;
  const translation = (req.query.translation as string) || 'KJV';
  const verses = await Verse.find({ book, chapter: Number(chapter), translation }).sort({ verse: 1 }).lean();
  res.json({ book, chapter: Number(chapter), translation, verses });
});

bibleRouter.get('/verse', async (req, res) => {
  const ref = req.query.ref as string;
  const translation = (req.query.translation as string) || 'KJV';
  if (!ref) return res.status(400).json({ error: 'Missing ref' });
  const verse = await Verse.findOne({ ref, translation }).lean();
  if (!verse) return res.status(404).json({ error: 'Not found' });
  res.json(verse);
});

