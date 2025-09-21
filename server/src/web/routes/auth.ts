import { Router } from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';

export const authRouter = Router();

const refreshSchema = z.object({ refreshToken: z.string() });

authRouter.post('/google', async (_req, res) => {
  // TODO: Implement Google OAuth exchange (passport or token-based) and user linking
  return res.status(501).json({ error: 'Not implemented' });
});

authRouter.post('/refresh', (req, res) => {
  const parsed = refreshSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid payload' });
  try {
    const payload = jwt.verify(parsed.data.refreshToken, process.env.JWT_REFRESH_SECRET || '');
    const accessToken = jwt.sign({ sub: (payload as any).sub }, process.env.JWT_ACCESS_SECRET || '', { expiresIn: '15m' });
    return res.json({ accessToken });
  } catch {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
});

