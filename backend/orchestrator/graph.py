from langgraph.graph import StateGraph
from agents.negotiation_agent import negotiation_agent
from agents.deal_acceleration_agent import deal_acceleration_agent
from agents.revenue_optimization_agent import revenue_optimization_agent

def build_graph():
    graph = StateGraph(dict)

    graph.add_node("negotiation", negotiation_agent)
    graph.add_node("acceleration", deal_acceleration_agent)
    graph.add_node("revenue", revenue_optimization_agent)

    graph.set_entry_point("negotiation")

    graph.add_edge("negotiation", "acceleration")
    graph.add_edge("acceleration", "revenue")

    return graph.compile()
