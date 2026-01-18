from .llm_router import generate
from .agent_logger import log_agent_action
import json

SYSTEM_PROMPT = """
You are a sales conversation intelligence system.

Your task:
Extract the following fields from the user's messages.

Return STRICT JSON with:
- intent: Interested | Neutral | Not Interested
- objection: Price | Timing | Trust | Authority | None
- urgency: High | Medium | Low
- decision_authority: Self | Manager | Committee
- risk: Low | Medium | High

Do not include explanations.
"""

def conversation_intelligence_agent(lead_id, messages, lead_state):
    conversation_text = "\n".join(messages)

    prompt = f"""
Messages:
{conversation_text}

Respond only with JSON.
"""

    response = generate(
        prompt,
        system=SYSTEM_PROMPT
    )

    try:
        insights = json.loads(response)
    except Exception:
        raise ValueError("LLM did not return valid JSON")

    # Decide next agent
    if insights["objection"] == "Price":
        next_agent = "NegotiationAgent"
    elif insights["risk"] == "High":
        next_agent = "DealAccelerationAgent"
    else:
        next_agent = "FollowUpAgent"

    log_agent_action(
        agent="ConversationIntelligenceAgent",
        lead_id=lead_id,
        reasoning=f"Extracted insights: {insights}",
        decision=f"Routed to {next_agent}"
    )

    return {
        "updates": insights,
        "action": {
            "type": "trigger_agent",
            "payload": {"next_agent": next_agent}
        },
        "reasoning": "Conversation analyzed using LLM"
    }