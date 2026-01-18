from fastapi import APIRouter
from app.schemas.lead import LeadCreate
from app.database import SessionLocal
from app.models.lead import Lead
from app.models.lead_state import LeadState
from app.services.redis_service import publish_event

router = APIRouter()

@router.post("/lead")
def create_lead(data: LeadCreate):
    db = SessionLocal()
    lead = Lead(**data.dict())
    db.add(lead)
    db.commit()
    db.refresh(lead)

    state = LeadState(lead_id=lead.lead_id)
    db.add(state)
    db.commit()

    publish_event("lead.created", lead.lead_id, {})
    return {"lead_id": lead.lead_id}
@router.get("/lead/{lead_id}")
def get_lead_detail(lead_id: str):
    db = SessionLocal()
    # Fetch both profile and state
    lead = db.query(Lead).filter(Lead.lead_id == lead_id).first()
    state = db.query(LeadState).filter(LeadState.lead_id == lead_id).first()
    
    if not lead:
        return {"error": "Lead not found"}
        
    return {
        "profile": {
            "name": lead.name,
            "company": lead.company,
            "industry": lead.industry,
            "role": lead.role
        },
        "state": state
    }