from fastapi import APIRouter
from app.database import SessionLocal
from app.models.lead import Lead
from app.models.lead_state import LeadState

router = APIRouter()

@router.post("/salesforce/webhook")
def salesforce_webhook(payload: dict):
    """
    Salesforce Lead Created → Our System
    """
    db = SessionLocal()

    lead = Lead(
        name=payload.get("Name"),
        company=payload.get("Company"),
        industry=payload.get("Industry"),
        source="Salesforce",
        consent=True
    )

    db.add(lead)
    db.commit()

    state = LeadState(
        lead_id=lead.lead_id,
        stage="New"
    )
    db.add(state)
    db.commit()

    return {"status": "lead_ingested_from_salesforce"}
