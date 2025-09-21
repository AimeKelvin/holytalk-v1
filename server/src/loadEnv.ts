import dotenv from 'dotenv';

dotenv.config();

const requiredVars = [
  'MONGODB_URI',
  'JWT_ACCESS_SECRET',
  'JWT_REFRESH_SECRET',
  'LLM_PROVIDER',
  'LLM_MODEL_NAME',
  'EMBEDDINGS_MODEL_NAME'
];

for (const key of requiredVars) {
  if (!process.env[key]) {
    // eslint-disable-next-line no-console
    console.warn(`[env] Missing ${key}. Some features may be disabled in dev.`);
  }
}

export {};

