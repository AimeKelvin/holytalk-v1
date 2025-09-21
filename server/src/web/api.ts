import { Router } from 'express';
import { authRouter } from './routes/auth.js';
import { bibleRouter } from './routes/bible.js';
import { searchRouter } from './routes/search.js';
import { streakRouter } from './routes/streak.js';
import { feedRouter } from './routes/feed.js';
import { shepRouter } from './routes/shep.js';
import { meRouter } from './routes/me.js';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/bible', bibleRouter);
apiRouter.use('/search', searchRouter);
apiRouter.use('/streak', streakRouter);
apiRouter.use('/feed', feedRouter);
apiRouter.use('/shep', shepRouter);
apiRouter.use('/', meRouter);

