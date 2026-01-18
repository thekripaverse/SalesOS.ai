def compute_pressure(lead_state):
    days = lead_state.get("time_in_stage", 0)
    if days > 14:
        return 0.9
    elif days > 7:
        return 0.6
    return 0.3
