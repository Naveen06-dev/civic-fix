import { handle } from '@hono/node-server/vercel';
import app from '../build/server/index.js';

// Vercel Serverless Function wrapper around our built Hono application
export default handle(app);
