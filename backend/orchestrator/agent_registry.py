# agent_registery.py

from agent_client import (
    ethics_agent,
    engagement_agent,
    conversation_agent,
    followup_agent,
    lead_scoring_agent,
    negotiation_agent,
    deal_acceleration_agent,
    revenue_optimization_agent
)

AGENT_REGISTRY = {
    "EthicsAgent": ethics_agent,
    "LeadScoringAgent": lead_scoring_agent,
    "EngagementAgent": engagement_agent,
    "ConversationAgent": conversation_agent,
    "FollowUpAgent": followup_agent,
    "NegotiationAgent": negotiation_agent,
    "DealAccelerationAgent": deal_acceleration_agent,
    "RevenueOptimizationAgent": revenue_optimization_agent
}
