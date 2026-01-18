from .agent_logger import log_agent_action

def ethical_governance_agent(lead_id, action_plan, context):
    """
    Enforces ethical communication, consent & frequency rules.
    """

    consent = context.get("consent_status")
    contact_count = context.get("previous_contacts_last_7_days", 0)
    sentiment = context.get("lead_sentiment", "Neutral")

    approved = True
    modifications = None
    audit_flag = False

    # Rule 1: Consent check
    if consent != "Opted-In":
        approved = False
        reason = "Lead has not provided consent"
        audit_flag = True

    # Rule 2: Contact frequency
    elif contact_count > 3:
        approved = False
        reason = "Contact frequency exceeded"
        modifications = "Delay outreach by 3 days"
        audit_flag = True

    # Rule 3: Negative sentiment protection
    elif sentiment == "Negative":
        approved = False
        reason = "Lead sentiment is negative"
        modifications = "Switch to human review"
        audit_flag = True

    else:
        reason = "Consent present, frequency within limits"

    log_agent_action(
        agent="EthicalGovernanceAgent",
        lead_id=lead_id,
        reasoning=f"Consent={consent}, Contacts7d={contact_count}, Sentiment={sentiment}",
        decision=f"Approved={approved} | Reason={reason}"
    )

    return {
        "approved": approved,
        "reason": reason,
        "modifications": modifications,
        "audit_flag": audit_flag
    }