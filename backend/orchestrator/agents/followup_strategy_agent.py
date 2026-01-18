from .agent_logger import log_agent_action

def followup_strategy_agent(lead_id, lead_profile):
    """
    Decide follow-up strategy based on lead state & history
    """

    stage = lead_profile.get("lead_stage")
    objection = lead_profile.get("objection")
    urgency = lead_profile.get("urgency")
    last_contact_days = lead_profile.get("last_contact_days", 0)
    followups = lead_profile.get("previous_followups", 0)

    escalation = False

    # Timing logic
    if urgency == "High":
        timing = "Immediately"
        channel = "Call"
    elif last_contact_days >= 5:
        timing = "Within 24 hours"
        channel = "Email"
    else:
        timing = "In 2-3 days"
        channel = "Email"

    # Strategy logic
    if objection == "Price":
        strategy = "Send ROI-focused pricing justification"
    elif objection == "Timing":
        strategy = "Offer flexible scheduling or deferred start"
    else:
        strategy = "Friendly reminder with value summary"

    # Escalation logic
    if followups >= 3 and urgency != "Low":
        escalation = True
        strategy = "Escalate to sales manager with custom proposal"

    log_agent_action(
        agent="FollowUpStrategyAgent",
        lead_id=lead_id,
        reasoning=f"Stage={stage}, Objection={objection}, Urgency={urgency}",
        decision=f"{channel} | {timing} | Escalation={escalation}"
    )

    return {
        "next_action": "Follow-up",
        "channel": channel,
        "timing": timing,
        "strategy": strategy,
        "escalation": escalation
    }