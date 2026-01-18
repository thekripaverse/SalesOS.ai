from rules.pressure_calculator import compute_pressure
from rules.discount_policy import discount_policy
from .retriever import retrieve_similar_deals
from reasoning.context_builder import build_negotiation_context
from reasoning.llm_router import run_llm


def negotiation_agent(state):
    policy = discount_policy(
        state.get("lead_profile", {}).get("company_size", 0)
    )

    pressure = compute_pressure(
        state.get("lead_state", {})
    )

    history = retrieve_similar_deals(state)

    prompt = build_negotiation_context(
        state, policy, pressure, history
    )

    llm_response, provider = run_llm(prompt)

    return {
        "agent": "NegotiationAgent",
        "decision": llm_response,
        "llm_used": provider
    }
