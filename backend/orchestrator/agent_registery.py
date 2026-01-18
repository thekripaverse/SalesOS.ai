# agent_registry.py

# ===== REAL AGENTS (your code) =====
from lead_scoring_agent import lead_scoring_agent
from negotiation_agent import negotiation_agent
from deal_acceleration_agent import deal_acceleration_agent
from revenue_optimization_agent import revenue_optimization_agent


# ===== MOCK AGENTS =====
def ethics_agent(state):
    return {
        "agent": "EthicsAgent",
        "decision": "Consent verified",
        "next_event": "ethics.approved"
    }

def engagement_agent(state):
    return {
        "agent": "EngagementAgent",
        "decision": "Engagement message sent",
        "next_event": "engagement.sent"
    }

def conversation_agent(state):
    return {
        "agent": "ConversationAgent",
        "decision": "Price objection detected",
        "next_event": "price.objection"
    }

def followup_agent(state):
    return {
        "agent": "FollowUpAgent",
        "decision": "Follow-up triggered",
        "next_event": "followup.sent"
    }


# ===== AGENT MAP =====
AGENT_MAP = {
    "EthicsAgent": ethics_agent,
    "LeadScoringAgent": lead_scoring_agent,
    "EngagementAgent": engagement_agent,
    "ConversationAgent": conversation_agent,
    "FollowUpAgent": followup_agent,
    "NegotiationAgent": negotiation_agent,
    "DealAccelerationAgent": deal_acceleration_agent,
    "RevenueOptimizationAgent": revenue_optimization_agent
}
