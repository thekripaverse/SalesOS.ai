from datetime import datetime

def log_agent_action(agent, lead_id, reasoning, decision):
    log = {
        "agent": agent,
        "lead_id": lead_id,
        "reasoning": reasoning,
        "decision": decision,
        "timestamp": datetime.utcnow().isoformat()
    }

    print("\nAGENT LOG:")
    for k, v in log.items():
        print(f"{k}: {v}")
