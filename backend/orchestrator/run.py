# run.py
from handler import handle_event

if __name__ == "__main__":
    print("\n🚀 Running Revenue Agent Orchestration (Manual Run)\n")

    # Sample input state
    event = {
    "event_type": "lead.created",
    "lead_id": "101",

    "lead_profile": {
        "company_size": 120
    },

    "lead_state": {
        "time_in_stage": 10,
        "probability": 0.82
    },

    "company": {
        "industry": "SaaS",
        "employee_count": 200
    },

    "events": [
        {"type": "email_open"},
        {"type": "email_reply"}
    ]
}

    result = handle_event(event)

    print("\n🧠 FINAL OUTPUT")
    print("-" * 40)
    for k, v in result.items():
        print(f"{k}: {v}")
