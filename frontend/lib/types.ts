export interface LeadProfile {
  lead_id: string;
  name: string;
  email: string;
  company: string;
  industry: string;
  company_size: number;
  role: string;
  budget_range: string;
  source: string;
  consent: boolean;
  created_at: string;
}

export interface LeadState {
  lead_id: string;
  stage: string;
  score: number;
  priority: "Hot" | "Warm" | "Cold";
  probability_to_close: number;
  expected_value: number;
  risk: string;
  last_action: string;
  next_action: string;
  last_activity: string;
}

export interface EventItem {
  event_id: string;
  type: string;
  lead_id: string;
  timestamp: string;
  source: "agent" | "human";
}

export interface ActionLog {
  log_id: string;
  lead_id: string;
  agent: string;
  input_summary: string;
  reasoning: string;
  action: string;
  timestamp: string;
}

export interface AnalyticsEvent {
  event_id: string;
  lead_id: string;
  lead_name: string;
  company: string;
  stage: string;
  event_type: string;
  revenue: number;
  probability: number;
  agent: string;
  timestamp: string;
}
