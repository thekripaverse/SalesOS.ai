from fastapi import APIRouter, HTTPException
from app.database import SessionLocal
from app.models.lead_state import LeadState
from app.models.log import AgentLog
import datetime
from orchestrator.agents.data_loader import get_lead_bundle
from orchestrator.agents.deal_acceleration_agent import deal_acceleration_agent

router = APIRouter()

# Fields the agent is allowed to modify in the database
ALLOWED_FIELDS = {"stage", "priority", "expected_value", "score", "probability_to_close", "risk"}

@router.post("/agent/execute")
async def execute_agent_logic(data: dict):
    lead_id = data.get("lead_id")
    agent_type = data.get("agent_type")
    
    try:
        # 1. Fetch real data context
        lead, company, events = get_lead_bundle(lead_id)
        db = SessionLocal()
        lead_state = db.query(LeadState).filter_by(lead_id=lead_id).first()
        
        # 2. Run the agent logic
        state_context = {
            "lead": lead, 
            "company": company, 
            "events": events, 
            "lead_state": {"time_in_stage": 15}
        }
        
        if agent_type == "DealAccelerationAgent":
            result = deal_acceleration_agent(state_context)
        else:
            raise HTTPException(status_code=404, detail="Agent not found")

        # 3. APPLY UPDATES TO DATABASE (This makes metrics move!)
        if lead_state and "updates" in result:
            for key, value in result["updates"].items():
                if key in ALLOWED_FIELDS and hasattr(lead_state, key):
                    setattr(lead_state, key, value)
            lead_state.last_activity = datetime.datetime.utcnow()

        # 4. Save reasoning log
        new_log = AgentLog(
            lead_id=lead_id,
            agent_name=result.get("agent", agent_type),
            reasoning=result.get("decision") or result.get("reasoning"),
            action_taken=str(result.get("action", {}).get("type", "Strategy Applied")),
            timestamp=datetime.datetime.utcnow()
        )
        db.add(new_log)
        db.commit()
        
        return result
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()