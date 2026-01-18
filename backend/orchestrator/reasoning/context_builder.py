# context_builder.py

def build_negotiation_context(state, policy, pressure, history):
    return f"""
NEGOTIATION CONTEXT
Company Size: {state.get('lead_profile', {}).get('company_size')}
Pressure Level: {pressure}
Discount Policy: {policy}
Past Deals: {history}
"""


def build_revenue_context(state, history):
    return f"""
REVENUE OPTIMIZATION CONTEXT
Lead Probability: {state.get('lead_state', {}).get('probability')}
Past Deals: {history}
"""


def build_acceleration_context(state):
    return f"""
DEAL ACCELERATION CONTEXT
Days in current stage: {state.get('lead_state', {}).get('time_in_stage', 0)}
Suggested Action: Apply urgency and limited-time incentives
"""
