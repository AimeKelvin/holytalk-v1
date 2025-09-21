HolyTalk
=========

Minimalist, scripture-first Bible app with light social features and an AI companion named Shep. The Bible is always free.

Monorepo Layout
----------------
- `mobile/` — Expo React Native app (TypeScript)
- `server/` — Express API (TypeScript, Mongoose)
- `packages/ui/` — Shared RN UI components and tokens
- `scripts/` — Data ingest, embeddings, and cron utilities
- `docs/` — API spec, prompts, env example and notes

Getting Started
---------------
1) Copy environment variables template:
   - `cp docs/env.example .env`

2) Install dependencies at the repo root:
   - `npm install`

3) Start services:
   - API: `npm run server_dev`
   - Mobile app: `npm run mobile_dev`

Tech Stack
----------
- Mobile: Expo (React Native, TypeScript), `expo-router`, `@tanstack/react-query`, Zustand, NativeWind (Tailwind), lucide-react-native
- Server: Node.js (Express, TypeScript), MongoDB (Mongoose), JWT + Google OAuth, Zod, Helmet, CORS, Rate Limit
- Vector Search: MongoDB Atlas Vector Search
- AI: OpenAI or DeepSeek

Non‑Negotiables
---------------
- Bible access is 100% free
- Privacy-first, accessible, and fast

hey this will be a mobile app
