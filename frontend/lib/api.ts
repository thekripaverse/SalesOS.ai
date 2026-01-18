// lib/api.ts
import { LeadState, EventItem, ActionLog } from "./types";

const API_BASE = "http://localhost:8000";

/**
 * Fetch all leads
 * Note: Your current backend /dashboard returns stats. 
 * You may need to add a GET /leads route to your backend later.
 */
export async function getLeads(): Promise<LeadState[]> {
  const res = await fetch(`${API_BASE}/dashboard`); 
  if (!res.ok) return [];
  const data = await res.json();
  return data.leads || []; 
}

/**
 * Fetch single lead detail for the Digital Twin page
 * Backend Route: GET /lead/{id} (You should ensure this exists in lead_routes.py)
 */
export async function getLead(id: string): Promise<{ profile: any; state: LeadState }> {
  const res = await fetch(`${API_BASE}/lead/${id}`);
  if (!res.ok) throw new Error("Failed to fetch lead details");
  return res.json();
}

/**
 * Fetch events/signals for a specific lead
 * Backend Route: GET /events/{id} (Ensure this exists in your backend)
 */
export async function getEvents(id: string): Promise<EventItem[]> {
  const res = await fetch(`${API_BASE}/events/${id}`);
  if (!res.ok) return [];
  return res.json();
}

/**
 * Fetch agent logs for a specific lead
 * Backend Route: GET /logs/{lead_id}
 */
// lib/api.ts
export async function getLogs(leadId: string): Promise<ActionLog[]> {
  const url = leadId === "all" ? `${API_BASE}/logs/all` : `${API_BASE}/logs/${leadId}`;
  const res = await fetch(url); 
  if (!res.ok) return [];
  const data = await res.json();
  
  return data.map((l: any) => ({
    log_id: l.log_id,
    lead_id: l.lead_id,
    agent: l.agent_name,    // Mapping backend 'agent_name' to frontend 'agent'
    input_summary: l.input_summary,
    reasoning: l.reasoning,
    action: l.action_taken, // Mapping backend 'action_taken' to frontend 'action'
    timestamp: l.timestamp
  }));
}
/**
 * Create a new lead
 * Backend Route: POST /lead
 */
let memoryLeads: LeadState[] = [];

export async function generateRandomLead(): Promise<LeadState> {
  const newId = crypto.randomUUID();
  const newLead: LeadState = {
    lead_id: newId,
    stage: "New",
    score: Math.floor(Math.random() * 100),
    priority: "Warm",
    probability_to_close: 0.1,
    expected_value: 15000,
    risk: "Low",
    last_action: "Lead Ingested",
    next_action: "AI Analysis",
    last_activity: new Date().toISOString()
  };

  try {
    const res = await fetch(`${API_BASE}/lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLead),
    });
    // Trigger log for the sidebar
    await createSystemLog("IngestionAgent", `Database Connected. Created Lead #${newId.substring(0,8)}`, "Ingested new lead from web source");
    return await res.json();
  } catch (e) {
    // Fallback for demo
    memoryLeads = [newLead, ...memoryLeads];
    await createSystemLog("IngestionAgent", "Local Memory Active", `Generated Lead #${newId.substring(0,8)} (Backend Offline)`);
    return newLead;
  }
}
// lib/api.ts
export async function runAgentOrchestration(leadId: string, agentType: string) {
  const API_BASE = "http://localhost:8000";
  const res = await fetch(`${API_BASE}/agent/execute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lead_id: leadId, agent_type: agentType }),
  });
  if (!res.ok) throw new Error("Agent execution failed");
  return res.json();
}

// Helper to create logs that appear in the sidebar
export async function createSystemLog(agent: string, action: string, reason: string) {
  const log: ActionLog = {
    log_id: crypto.randomUUID(),
    lead_id: "global",
    agent: agent,
    input_summary: "System Event",
    reasoning: reason,
    action: action,
    timestamp: new Date().toISOString()
  };
  
  // Dispatch a custom event that the Sidebar component listens to
  window.dispatchEvent(new CustomEvent("new-log", { detail: log }));
  
  try {
    await fetch(`${API_BASE}/logs/global`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(log),
    });
  } catch (e) { /* silent fail */ }
}