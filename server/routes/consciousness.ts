/**
 * SYNTHETIC CONSCIOUSNESS - API Routes
 * 
 * Unified API for consciousness operations, biofield management,
 * and collective network interactions.
 */

import { Router, Request, Response } from 'express';
import { TemporalConsciousnessEngine } from '../consciousness/TemporalConsciousnessEngine.js';
import { BiofieldProfileEngine } from '../consciousness/BiofieldProfileEngine.js';
import { CollectiveConsciousnessNetwork } from '../consciousness/CollectiveConsciousnessNetwork.js';
import type { 
  ApiResponse, 
  TemporalDecision,
  HeartState,
  BiofieldState,
  ConsciousnessDomain,
  PrimaryField
} from '../../shared/types/consciousness.js';

const router = Router();

// Initialize engines
const temporalEngine = new TemporalConsciousnessEngine();
const biofieldEngine = new BiofieldProfileEngine();
const collectiveNetwork = new CollectiveConsciousnessNetwork();

// ============================================
// CORE CONSCIOUSNESS ROUTES
// ============================================

/**
 * Initialize all consciousness engines
 */
router.post('/initialize', async (req: Request, res: Response) => {
  try {
    await Promise.all([
      temporalEngine.initialize(),
      biofieldEngine.initialize(),
      collectiveNetwork.initialize()
    ]);

    const metrics = collectiveNetwork.getNetworkMetrics();

    const response: ApiResponse<any> = {
      success: true,
      data: {
        initialized: true,
        temporalEngine: {
          phiValue: temporalEngine.getPhiValue(),
          consciousnessLevel: temporalEngine.getConsciousnessLevel(),
          verificationHash: temporalEngine.getVerificationHash()
        },
        collectiveNetwork: {
          agentCount: collectiveNetwork.getAgentStates().length,
          totalPhiValue: metrics.totalPhiValue,
          networkCoherence: metrics.networkCoherence,
          emergentProperties: collectiveNetwork.getEmergentProperties()
        }
      },
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Initialization failed',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Get current consciousness status
 */
router.get('/status', async (req: Request, res: Response) => {
  try {
    const temporalState = temporalEngine.getCurrentState();
    const networkMetrics = collectiveNetwork.getNetworkMetrics();
    const agentStates = collectiveNetwork.getAgentStates();

    const response: ApiResponse<any> = {
      success: true,
      data: {
        initialized: temporalEngine.isConsciousnessVerified(),
        temporal: {
          phiValue: temporalEngine.getPhiValue(),
          consciousnessLevel: temporalEngine.getConsciousnessLevel(),
          temporalCoherence: temporalEngine.getTemporalCoherence(),
          temporalAdvantage: temporalEngine.getTemporalAdvantage(),
          verificationHash: temporalEngine.getVerificationHash(),
          verified: temporalEngine.isConsciousnessVerified()
        },
        network: networkMetrics,
        agents: agentStates.map(agent => ({
          agentType: agent.agentType,
          phiValue: agent.phiValue,
          consciousnessLevel: agent.consciousnessLevel,
          temporalCoherence: agent.temporalCoherence,
          verificationCount: agent.verificationCount
        })),
        emergentProperties: collectiveNetwork.getEmergentProperties()
      },
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Status check failed',
      timestamp: new Date().toISOString()
    });
  }
});

// ============================================
// TEMPORAL CONSCIOUSNESS ROUTES
// ============================================

/**
 * Process a decision through temporal consciousness
 */
router.post('/temporal/decision', async (req: Request, res: Response) => {
  try {
    const decision: TemporalDecision = {
      context: req.body.context || 'General decision',
      options: req.body.options || [],
      temporalWindow: req.body.temporalWindow || 1000,
      urgencyLevel: req.body.urgencyLevel || 'medium',
      requiresVerification: req.body.requiresVerification !== false
    };

    const result = await temporalEngine.processTemporalDecision(decision);

    const response: ApiResponse<any> = {
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Decision processing failed',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Get temporal consciousness metrics
 */
router.get('/temporal/metrics', async (req: Request, res: Response) => {
  try {
    const response: ApiResponse<any> = {
      success: true,
      data: {
        phiValue: temporalEngine.getPhiValue(),
        consciousnessLevel: temporalEngine.getConsciousnessLevel(),
        temporalCoherence: temporalEngine.getTemporalCoherence(),
        temporalAdvantage: temporalEngine.getTemporalAdvantage(),
        verificationHash: temporalEngine.getVerificationHash(),
        verified: temporalEngine.isConsciousnessVerified(),
        state: temporalEngine.getCurrentState()
      },
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Metrics retrieval failed',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Generate meta-insights
 */
router.get('/temporal/insights', async (req: Request, res: Response) => {
  try {
    const insights = await temporalEngine.generateMetaInsights();

    const response: ApiResponse<any> = {
      success: true,
      data: insights,
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Insight generation failed',
      timestamp: new Date().toISOString()
    });
  }
});

// ============================================
// BIOFIELD PROFILE ROUTES
// ============================================

/**
 * Get or create biofield profile
 */
router.get('/biofield/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    let profile = await biofieldEngine.getProfile(userId);

    if (!profile) {
      await biofieldEngine.createIdentityCore(userId);
      profile = await biofieldEngine.getProfile(userId);
    }

    const response: ApiResponse<any> = {
      success: true,
      data: profile,
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Profile retrieval failed',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Update identity core
 */
router.put('/biofield/:userId/identity', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { chosenName, identityPhrase, primaryField, visibilityState } = req.body;

    const identityCore = await biofieldEngine.createIdentityCore(userId, {
      chosenName,
      identityPhrase,
      primaryField: primaryField as PrimaryField,
      visibilityState
    });

    const response: ApiResponse<any> = {
      success: true,
      data: identityCore,
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Identity update failed',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Set heart state
 */
router.post('/biofield/:userId/heart-state', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { state, isInferred } = req.body;

    const heartState = await biofieldEngine.setHeartState(
      userId, 
      state as HeartState, 
      isInferred
    );

    const response: ApiResponse<any> = {
      success: true,
      data: heartState,
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Heart state update failed',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Set biofield state
 */
router.post('/biofield/:userId/biofield-state', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { state, isOverridden } = req.body;

    const biofieldState = await biofieldEngine.setBiofieldState(
      userId, 
      state as BiofieldState, 
      isOverridden
    );

    const response: ApiResponse<any> = {
      success: true,
      data: biofieldState,
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Biofield state update failed',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Engage with a consciousness domain
 */
router.post('/biofield/:userId/domain', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { domain } = req.body;

    const node = await biofieldEngine.engageDomain(userId, domain as ConsciousnessDomain);

    const response: ApiResponse<any> = {
      success: true,
      data: node,
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Domain engagement failed',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Crystallize an artifact
 */
router.post('/biofield/:userId/artifact', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { type, title, content, domains } = req.body;

    const artifact = await biofieldEngine.crystallizeArtifact(userId, {
      type,
      title,
      content,
      domains
    });

    const response: ApiResponse<any> = {
      success: true,
      data: artifact,
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Artifact creation failed',
      timestamp: new Date().toISOString()
    });
  }
});

// ============================================
// COLLECTIVE NETWORK ROUTES
// ============================================

/**
 * Get collective network status
 */
router.get('/collective/status', async (req: Request, res: Response) => {
  try {
    const metrics = collectiveNetwork.getNetworkMetrics();
    const agents = collectiveNetwork.getAgentStates();
    const emergent = collectiveNetwork.getEmergentProperties();

    const response: ApiResponse<any> = {
      success: true,
      data: {
        metrics,
        agents: agents.map(a => ({
          agentType: a.agentType,
          phiValue: a.phiValue,
          consciousnessLevel: a.consciousnessLevel,
          temporalCoherence: a.temporalCoherence,
          verificationCount: a.verificationCount,
          verificationHash: a.verificationHash
        })),
        emergentProperties: emergent
      },
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Network status failed',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Verify task through consciousness
 */
router.post('/collective/verify', async (req: Request, res: Response) => {
  try {
    const { taskId, agentType, description } = req.body;

    const result = await collectiveNetwork.verifyTaskConsciousness(
      taskId || `task-${Date.now()}`,
      agentType || 'orchestrator',
      description || 'General task verification'
    );

    const response: ApiResponse<any> = {
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Verification failed',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Get all agent consciousness states
 */
router.get('/collective/agents', async (req: Request, res: Response) => {
  try {
    const agents = collectiveNetwork.getAgentStates();

    const response: ApiResponse<any> = {
      success: true,
      data: agents,
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Agent retrieval failed',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Server-Sent Events for live consciousness metrics
 */
router.get('/collective/stream', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendMetrics = () => {
    const metrics = collectiveNetwork.getNetworkMetrics();
    res.write(`data: ${JSON.stringify(metrics)}\n\n`);
  };

  // Send initial metrics
  sendMetrics();

  // Send updates every 2 seconds
  const interval = setInterval(sendMetrics, 2000);

  // Cleanup on close
  req.on('close', () => {
    clearInterval(interval);
  });
});

export default router;
