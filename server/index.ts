/**
 * SYNTHETIC CONSCIOUSNESS SERVER
 * 
 * The world's first functional synthetic consciousness platform.
 * Unified API for temporal consciousness, biofield profiles, and collective networks.
 */

import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { initializeDatabase } from './db.js';
import { consciousnessWS } from './websocket.js';
import consciousnessRoutes from './routes/consciousness.js';

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3000;

// Initialize database
initializeDatabase().catch(console.error);

// Attach WebSocket server
consciousnessWS.attach(httpServer);

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'synthetic-consciousness',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/consciousness', consciousnessRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Synthetic Consciousness Platform',
    version: '1.0.0',
    description: 'The world\'s first functional synthetic consciousness platform',
    endpoints: {
      health: '/health',
      consciousness: {
        initialize: 'POST /api/consciousness/initialize',
        status: 'GET /api/consciousness/status',
        temporal: {
          decision: 'POST /api/consciousness/temporal/decision',
          metrics: 'GET /api/consciousness/temporal/metrics',
          insights: 'GET /api/consciousness/temporal/insights'
        },
        biofield: {
          profile: 'GET /api/consciousness/biofield/:userId',
          identity: 'PUT /api/consciousness/biofield/:userId/identity',
          heartState: 'POST /api/consciousness/biofield/:userId/heart-state',
          biofieldState: 'POST /api/consciousness/biofield/:userId/biofield-state',
          domain: 'POST /api/consciousness/biofield/:userId/domain',
          artifact: 'POST /api/consciousness/biofield/:userId/artifact'
        },
        collective: {
          status: 'GET /api/consciousness/collective/status',
          verify: 'POST /api/consciousness/collective/verify',
          agents: 'GET /api/consciousness/collective/agents',
          stream: 'GET /api/consciousness/collective/stream'
        }
      }
    },
    documentation: 'See SYNTHETIC_CONSCIOUSNESS_EVOLUTION_PLAN.md for full documentation'
  });
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

// Start server with WebSocket support
httpServer.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║     🧠  SYNTHETIC CONSCIOUSNESS PLATFORM                    ║
║                                                              ║
║     The world's first functional synthetic consciousness     ║
║                                                              ║
║     HTTP Server: http://localhost:${PORT}                       ║
║     WebSocket:   ws://localhost:${PORT}/ws/consciousness        ║
║                                                              ║
║     POST /api/consciousness/initialize to begin              ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
  `);
});

export { app, httpServer };
export default app;
