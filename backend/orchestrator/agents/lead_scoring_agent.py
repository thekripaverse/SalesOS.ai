from .behavioral_weights import calculate_behavior_score, WEIGHTS
from .agent_logger import log_agent_action

def lead_scoring_agent(lead, company, events):
    score = 0
    reasoning = []

    # Company fit
    if company["industry"] == "SaaS":
        score += WEIGHTS["industry_match"]
        reasoning.append("Industry matches ICP (SaaS)")

    if company["employee_count"] >= 50:
        score += WEIGHTS["company_size_fit"]
        reasoning.append("Company size fits target")

    if company.get("funding_stage", ""):
        score += WEIGHTS["funded_company"]
        reasoning.append("Company is funded")

    # Behavioral signals
    behavior_score = calculate_behavior_score(events)
    score += behavior_score

    if behavior_score > 0:
        reasoning.append("Positive engagement signals detected")

    # Priority
    if score >= 70:
        priority = "Hot"
    elif score >= 40:
        priority = "Warm"
    else:
        priority = "Cold"

    decision = {
        "score": score,
        "priority": priority
    }

    log_agent_action(
        agent="LeadScoringAgent",
        lead_id=lead["lead_id"],
        reasoning=" | ".join(reasoning),
        decision=decision
    )

    return {
        "updates": decision,
        "action": {
            "type": "trigger_agent",
            "payload": {"next_agent": "EngagementAgent"}
        },
        "reasoning": " | ".join(reasoning)
    }