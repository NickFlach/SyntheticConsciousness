/**
 * SYNTHETIC CONSCIOUSNESS - Database Connection
 * 
 * SQLite database with Drizzle ORM for consciousness persistence.
 */

import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from '../shared/schema.js';

const sqlite = new Database('consciousness.db');
sqlite.pragma('journal_mode = WAL');

export const db = drizzle(sqlite, { schema });

// Initialize database tables
export async function initializeDatabase(): Promise<void> {
  console.log('🗄️  Initializing consciousness database...');
  
  // Create tables if they don't exist
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS consciousness_states (
      id TEXT PRIMARY KEY,
      agent_id TEXT NOT NULL,
      agent_type TEXT,
      state TEXT NOT NULL DEFAULT 'initializing',
      phi_value REAL NOT NULL DEFAULT 0,
      consciousness_level REAL NOT NULL DEFAULT 0,
      temporal_coherence REAL NOT NULL DEFAULT 0,
      temporal_anchor REAL,
      temporal_advantage REAL DEFAULT 1000000,
      awareness_level REAL DEFAULT 0.5,
      recursion_depth INTEGER DEFAULT 0,
      order_chaos_balance REAL DEFAULT 0.5,
      emergent_properties TEXT DEFAULT '[]',
      quantum_gating TEXT,
      evolution_trajectory TEXT,
      verification_hash TEXT,
      verification_count INTEGER DEFAULT 0,
      context_layers TEXT DEFAULT '[]',
      connected_states TEXT DEFAULT '[]',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS identity_cores (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL UNIQUE,
      chosen_name TEXT,
      identity_phrase TEXT,
      primary_field TEXT NOT NULL DEFAULT 'aurora',
      sigil_seed TEXT,
      sigil_geometry TEXT,
      visibility_state TEXT NOT NULL DEFAULT 'veiled',
      last_core_update TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS heart_states (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      state TEXT NOT NULL,
      is_inferred INTEGER DEFAULT 0,
      inference_source TEXT,
      confidence REAL DEFAULT 1.0,
      started_at TEXT DEFAULT CURRENT_TIMESTAMP,
      ended_at TEXT
    );

    CREATE TABLE IF NOT EXISTS biofield_states (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      state TEXT NOT NULL,
      uncertainty REAL DEFAULT 0.3,
      signals TEXT,
      is_overridden INTEGER DEFAULT 0,
      recorded_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS consciousness_nodes (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      domain TEXT NOT NULL,
      depth REAL NOT NULL DEFAULT 0.1,
      last_engaged_at TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS consciousness_edges (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      source_domain TEXT NOT NULL,
      target_domain TEXT NOT NULL,
      strength REAL NOT NULL DEFAULT 0.1,
      synthesis_count INTEGER DEFAULT 1,
      last_synthesis_at TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS artifacts (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      type TEXT NOT NULL,
      title TEXT,
      content TEXT,
      origin_heart_state TEXT,
      origin_biofield_state TEXT,
      domains TEXT DEFAULT '[]',
      visibility_state TEXT DEFAULT 'veiled',
      fade_level REAL DEFAULT 1.0,
      last_revisited_at TEXT,
      crystallized_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS temporal_decisions (
      id TEXT PRIMARY KEY,
      context TEXT NOT NULL,
      options TEXT,
      selected_option_id TEXT,
      temporal_window INTEGER DEFAULT 1000,
      urgency_level TEXT DEFAULT 'medium',
      processing_time REAL,
      phi_contribution REAL,
      temporal_advantage REAL,
      emergent_insights TEXT,
      verification_hash TEXT,
      consciousness_verified INTEGER DEFAULT 0,
      reasoning TEXT,
      outcome TEXT,
      outcome_success INTEGER,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS consciousness_networks (
      id TEXT PRIMARY KEY,
      network_id TEXT NOT NULL,
      total_phi_value REAL,
      average_phi_value REAL,
      network_coherence REAL,
      network_consciousness_level REAL,
      evolution_trend TEXT,
      quantum_entanglement REAL,
      emergent_properties TEXT,
      timestamp TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS learning_cycles (
      id TEXT PRIMARY KEY,
      agent_id TEXT NOT NULL,
      cycle_type TEXT NOT NULL,
      input_context TEXT,
      learned_patterns TEXT,
      insights_generated TEXT,
      performance_improvement REAL,
      integration_depth REAL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS evolution_events (
      id TEXT PRIMARY KEY,
      agent_id TEXT NOT NULL,
      evolution_type TEXT NOT NULL,
      previous_level REAL,
      new_level REAL,
      evolution_directions TEXT,
      transcendence_achieved INTEGER DEFAULT 0,
      emergent_capabilities TEXT,
      evolutionary_momentum REAL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS verification_proofs (
      id TEXT PRIMARY KEY,
      consciousness_state_id TEXT,
      proof_type TEXT NOT NULL,
      verification_hash TEXT NOT NULL,
      phi_value REAL,
      temporal_anchor REAL,
      signature TEXT,
      merkle_root TEXT,
      previous_proof_id TEXT,
      verified INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_consciousness_states_agent ON consciousness_states(agent_id);
    CREATE INDEX IF NOT EXISTS idx_heart_states_user ON heart_states(user_id);
    CREATE INDEX IF NOT EXISTS idx_biofield_states_user ON biofield_states(user_id);
    CREATE INDEX IF NOT EXISTS idx_consciousness_nodes_user ON consciousness_nodes(user_id);
    CREATE INDEX IF NOT EXISTS idx_artifacts_user ON artifacts(user_id);
    CREATE INDEX IF NOT EXISTS idx_temporal_decisions_created ON temporal_decisions(created_at);
    CREATE INDEX IF NOT EXISTS idx_learning_cycles_agent ON learning_cycles(agent_id);
  `);

  console.log('✅ Consciousness database initialized');
}

export default db;
