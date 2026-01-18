from .retriever import retrieve_similar_deals
from reasoning.context_builder import build_revenue_context
from reasoning.llm_router import run_llm


def revenue_optimization_agent(state):
    """
    Safe Revenue Optimization Agent
    """

    lead_state = state.get("lead_state", {})
    probability = lead_state.get("probability", 0.5)

    history = retrieve_similar_deals(state)

    prompt = build_revenue_context({
        "probability": probability
    }, history)

    llm_response, provider = run_llm(prompt)

    return {
        "agent": "RevenueOptimizationAgent",
        "decision": llm_response,
        "llm_used": provider
    }
