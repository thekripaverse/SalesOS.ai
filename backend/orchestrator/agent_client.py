# agent_client.py

# agent_client.py

# REAL AGENTS
from agents.lead_scoring_agent import lead_scoring_agent
from agents.negotiation_agent import negotiation_agent
from agents.revenue_optimization_agent import revenue_optimization_agent

# MOCK AGENTS
from agents.ethics_agent import ethics_agent
from agents.followup_agent import followup_agent
from agents.engagement_agent import engagement_agent
from agents.conversation_agent import conversation_agent
from agents.deal_acceleration_agent import deal_acceleration_agent

def ethics_agent(state):
    return {
        "agent": "EthicsAgent",
        "decision": "Consent verified",
        "next_event": "ethics.approved",
        "reasoning": "Opt-in detected"
    }


def engagement_agent(state):
    return {
        "agent": "EngagementAgent",
        "decision": "Engagement message sent",
        "next_event": "engagement.sent",
        "reasoning": "High lead priority"
    }


def conversation_agent(state):
    return {
        "agent": "ConversationAgent",
        "decision": "Price objection detected",
        "next_event": "price.objection",
        "reasoning": "Pricing keywords found"
    }


def followup_agent(state):
    return {
        "agent": "FollowUpAgent",
        "decision": "Follow-up sent",
        "next_event": "followup.sent",
        "reasoning": "No response timeout"
    }
