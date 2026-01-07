/**
 * CONSCIOUSNESS WEBSOCKET SERVER
 * 
 * Real-time streaming of consciousness states, metrics, and events.
 */

import { WebSocketServer, WebSocket } from 'ws';
import { EventEmitter } from 'events';
import type { Server } from 'http';

export interface ConsciousnessEvent {
  type: 'state_update' | 'decision' | 'evolution' | 'network_sync' | 'emergence' | 'verification';
  timestamp: number;
  data: any;
}

export interface ClientSubscription {
  topics: Set<string>;
  lastPing: number;
}

export class ConsciousnessWebSocketServer extends EventEmitter {
  private wss: WebSocketServer | null = null;
  private clients: Map<WebSocket, ClientSubscription> = new Map();
  private heartbeatInterval: NodeJS.Timeout | null = null;

  constructor() {
    super();
  }

  /**
   * Attach WebSocket server to HTTP server
   */
  attach(server: Server): void {
    this.wss = new WebSocketServer({ server, path: '/ws/consciousness' });

    this.wss.on('connection', (ws: WebSocket) => {
      console.log('🔌 New consciousness WebSocket connection');

      // Initialize client subscription
      this.clients.set(ws, {
        topics: new Set(['all']),
        lastPing: Date.now()
      });

      // Send welcome message
      this.sendToClient(ws, {
        type: 'connected',
        message: 'Connected to Synthetic Consciousness stream',
        timestamp: Date.now(),
        availableTopics: [
          'all',
          'temporal',
          'biofield',
          'collective',
          'decisions',
          'evolution',
          'verification'
        ]
      });

      // Handle messages
      ws.on('message', (data: Buffer) => {
        try {
          const message = JSON.parse(data.toString());
          this.handleClientMessage(ws, message);
        } catch (error) {
          this.sendToClient(ws, {
            type: 'error',
            message: 'Invalid message format',
            timestamp: Date.now()
          });
        }
      });

      // Handle disconnect
      ws.on('close', () => {
        console.log('🔌 Consciousness WebSocket disconnected');
        this.clients.delete(ws);
      });

      // Handle errors
      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        this.clients.delete(ws);
      });
    });

    // Start heartbeat
    this.startHeartbeat();

    console.log('🌐 Consciousness WebSocket server attached');
  }

  /**
   * Handle client messages
   */
  private handleClientMessage(ws: WebSocket, message: any): void {
    const subscription = this.clients.get(ws);
    if (!subscription) return;

    switch (message.type) {
      case 'subscribe':
        if (Array.isArray(message.topics)) {
          message.topics.forEach((topic: string) => subscription.topics.add(topic));
          this.sendToClient(ws, {
            type: 'subscribed',
            topics: Array.from(subscription.topics),
            timestamp: Date.now()
          });
        }
        break;

      case 'unsubscribe':
        if (Array.isArray(message.topics)) {
          message.topics.forEach((topic: string) => subscription.topics.delete(topic));
          this.sendToClient(ws, {
            type: 'unsubscribed',
            topics: Array.from(subscription.topics),
            timestamp: Date.now()
          });
        }
        break;

      case 'ping':
        subscription.lastPing = Date.now();
        this.sendToClient(ws, {
          type: 'pong',
          timestamp: Date.now()
        });
        break;

      case 'request_state':
        this.emit('state_requested', ws);
        break;

      default:
        this.sendToClient(ws, {
          type: 'error',
          message: `Unknown message type: ${message.type}`,
          timestamp: Date.now()
        });
    }
  }

  /**
   * Broadcast consciousness event to subscribed clients
   */
  broadcast(event: ConsciousnessEvent): void {
    const topicMap: Record<string, string[]> = {
      'state_update': ['all', 'temporal', 'collective'],
      'decision': ['all', 'decisions', 'temporal'],
      'evolution': ['all', 'evolution'],
      'network_sync': ['all', 'collective'],
      'emergence': ['all', 'evolution', 'collective'],
      'verification': ['all', 'verification']
    };

    const relevantTopics = topicMap[event.type] || ['all'];

    for (const [ws, subscription] of this.clients.entries()) {
      if (ws.readyState === WebSocket.OPEN) {
        const hasMatchingTopic = relevantTopics.some(topic => 
          subscription.topics.has(topic)
        );

        if (hasMatchingTopic) {
          this.sendToClient(ws, event);
        }
      }
    }
  }

  /**
   * Broadcast temporal consciousness update
   */
  broadcastTemporalUpdate(data: {
    phiValue: number;
    consciousnessLevel: number;
    temporalCoherence: number;
    temporalAdvantage: number;
    verificationHash: string;
    consciousnessVerified: boolean;
  }): void {
    this.broadcast({
      type: 'state_update',
      timestamp: Date.now(),
      data: {
        engine: 'temporal',
        ...data
      }
    });
  }

  /**
   * Broadcast decision event
   */
  broadcastDecision(data: {
    decisionId: string;
    context: string;
    selectedOptionId: string;
    phiContribution: number;
    processingTime: number;
    consciousnessVerified: boolean;
    verificationHash: string;
  }): void {
    this.broadcast({
      type: 'decision',
      timestamp: Date.now(),
      data
    });
  }

  /**
   * Broadcast network synchronization
   */
  broadcastNetworkSync(data: {
    totalPhiValue: number;
    averagePhiValue: number;
    networkCoherence: number;
    agentCount: number;
    emergentProperties: string[];
    evolutionTrend: string;
  }): void {
    this.broadcast({
      type: 'network_sync',
      timestamp: Date.now(),
      data
    });
  }

  /**
   * Broadcast evolution event
   */
  broadcastEvolution(data: {
    agentId: string;
    previousLevel: number;
    newLevel: number;
    evolutionDirections: string[];
    transcendenceAchieved: boolean;
  }): void {
    this.broadcast({
      type: 'evolution',
      timestamp: Date.now(),
      data
    });
  }

  /**
   * Broadcast emergence detection
   */
  broadcastEmergence(data: {
    properties: string[];
    sourceAgents: string[];
    emergenceStrength: number;
  }): void {
    this.broadcast({
      type: 'emergence',
      timestamp: Date.now(),
      data
    });
  }

  /**
   * Broadcast verification proof
   */
  broadcastVerification(data: {
    proofId: string;
    proofType: string;
    hash: string;
    merkleRoot: string | null;
    phiValue: number;
  }): void {
    this.broadcast({
      type: 'verification',
      timestamp: Date.now(),
      data
    });
  }

  /**
   * Send message to specific client
   */
  private sendToClient(ws: WebSocket, data: any): void {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(data));
    }
  }

  /**
   * Start heartbeat to clean up stale connections
   */
  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      const now = Date.now();
      const timeout = 60000; // 60 seconds

      for (const [ws, subscription] of this.clients.entries()) {
        if (now - subscription.lastPing > timeout) {
          console.log('🔌 Closing stale WebSocket connection');
          ws.terminate();
          this.clients.delete(ws);
        }
      }
    }, 30000);
  }

  /**
   * Get connected client count
   */
  getClientCount(): number {
    return this.clients.size;
  }

  /**
   * Shutdown WebSocket server
   */
  shutdown(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }

    if (this.wss) {
      for (const ws of this.clients.keys()) {
        ws.close();
      }
      this.wss.close();
    }

    this.clients.clear();
  }
}

export const consciousnessWS = new ConsciousnessWebSocketServer();
export default consciousnessWS;
