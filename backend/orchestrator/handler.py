# handler.py

from graph import build_graph

graph = build_graph()

def handle_event(event):
    state = {
        "lead_id": event["lead_id"],
        "event_type": event["event_type"],
        "lead_profile": event.get("lead_profile", {}),
        "lead_state": event.get("lead_state", {}),
        "company": event.get("company", {}),
        "events": event.get("events", [])
    }

    return graph.invoke(state)
