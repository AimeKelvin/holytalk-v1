import './loadEnv.js';
import { createServer } from 'http';
import app from './server.js';
import { connectToDatabase } from './lib/db.js';

const port = process.env.PORT ? Number(process.env.PORT) : 3001;

async function start() {
  await connectToDatabase();
  const httpServer = createServer(app);
  httpServer.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${port}`);
  });
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start server', err);
  process.exit(1);
});

