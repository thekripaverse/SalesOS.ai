from reasoning.context_builder import build_acceleration_context
from reasoning.llm_router import run_llm


def deal_acceleration_agent(state):
    """
    Safe Deal Acceleration Agent
    Never assumes fields exist
    """

    lead_state = state.get("lead_state", {})
    time_in_stage = lead_state.get("time_in_stage", 0)

    prompt = build_acceleration_context({
        "time_in_stage": time_in_stage
    })

    llm_response, provider = run_llm(prompt)

    return {
        "agent": "DealAccelerationAgent",
        "decision": llm_response,
        "llm_used": provider
    }
