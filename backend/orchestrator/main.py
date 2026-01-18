import json
from datetime import datetime

# Data loader
from agents.data_loader import get_lead_bundle

# Agents
from agents.lead_scoring_agent import lead_scoring_agent
from agents.conversation_intelligence_agent import conversation_intelligence_agent
from agents.negotiation_agent import negotiation_agent
from agents.deal_acceleration_agent import deal_acceleration_agent
from agents.revenue_optimization_agent import revenue_optimization_agent
from agents.ethics_agent import ethical_governance_agent
from agents.followup_strategy_agent import followup_strategy_agent


def normalize(value):
    """Ensures every agent output is JSON-safe"""
    if value is None:
        return {"status": "no_output"}
    if isinstance(value, dict):
        return value
    return {"decision": value}


def main():

    # ---------------------------
    # 1. Load Lead Bundle
    # ---------------------------
    lead_id = 101
    lead, company, events = get_lead_bundle(lead_id)

    agent_outputs = []

    # ---------------------------
    # 2. Lead Scoring Agent
    # ---------------------------
    scoring = lead_scoring_agent(lead, company, events)
    lead.update(scoring.get("updates", {}))

    agent_outputs.append({
        "agent": "LeadScoringAgent",
        "output": normalize(scoring.get("updates")),
        "timestamp": datetime.utcnow().isoformat() + "Z"
    })

    # ---------------------------
    # 3. Conversation Intelligence
    # ---------------------------
    messages = [
        "We are interested but pricing seems high",
        "Can you give us a better offer?"
    ]

    conversation = conversation_intelligence_agent(
        lead_id=lead_id,
        messages=messages,
        lead_state=lead
    )

    lead.update(conversation.get("updates", {}))

    agent_outputs.append({
        "agent": "ConversationIntelligenceAgent",
        "output": normalize(conversation.get("updates")),
        "timestamp": datetime.utcnow().isoformat() + "Z"
    })

    # ---------------------------
    # 4. Negotiation Agent
    # ---------------------------
    negotiation = negotiation_agent({
        "lead_profile": company,
        "lead_state": lead
    })

    agent_outputs.append({
        "agent": "NegotiationAgent",
        "output": normalize(negotiation.get("decision")),
        "timestamp": datetime.utcnow().isoformat() + "Z"
    })

    # ---------------------------
    # 5. Deal Acceleration Agent
    # ---------------------------
    acceleration = deal_acceleration_agent({
        "lead_state": lead
    })

    agent_outputs.append({
        "agent": "DealAccelerationAgent",
        "output": normalize(acceleration.get("decision")),
        "timestamp": datetime.utcnow().isoformat() + "Z"
    })

    # ---------------------------
    # 6. Revenue Optimization Agent
    # ---------------------------
    revenue = revenue_optimization_agent({
        "lead_state": lead
    })

    agent_outputs.append({
        "agent": "RevenueOptimizationAgent",
        "output": normalize(revenue.get("decision")),
        "timestamp": datetime.utcnow().isoformat() + "Z"
    })

    # ---------------------------
    # 7. Ethics Governance Agent
    # ---------------------------
    ethics = ethical_governance_agent(
        lead_id=lead_id,
        action_plan=revenue.get("decision"),
        context={
            "consent_status": "Opted-In",
            "previous_contacts_last_7_days": 1,
            "lead_sentiment": lead.get("sentiment", "Neutral")
        }
    )

    agent_outputs.append({
        "agent": "EthicalGovernanceAgent",
        "output": normalize(ethics),
        "timestamp": datetime.utcnow().isoformat() + "Z"
    })

    # ---------------------------
    # 8. Follow-up Strategy Agent
    # ---------------------------
    followup = followup_strategy_agent(
        lead_id=lead_id,
        lead_profile=lead
    )

    agent_outputs.append({
        "agent": "FollowUpStrategyAgent",
        "output": normalize(followup),
        "timestamp": datetime.utcnow().isoformat() + "Z"
    })

    # ---------------------------
    # 9. Digital Twin Output
    # ---------------------------
    digital_twin_output = {
        "twin_id": f"lead_{lead_id}",
        "twin_type": "sales_lead",

        "current_state": {
            "stage": "Negotiation",
            "lead_score": lead.get("score"),
            "priority": lead.get("priority"),
            "close_probability": lead.get("probability"),
            "sentiment": lead.get("sentiment", "Neutral")
        },

        "agent_outputs": agent_outputs,

        "next_best_action": agent_outputs[-1]["output"],

        "generated_at": datetime.utcnow().isoformat() + "Z"
    }

    # ---------------------------
    # OUTPUT (FINAL)
    # ---------------------------
    print(json.dumps(digital_twin_output, indent=2))


if __name__ == "__main__":
    main()
