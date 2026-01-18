from fastapi import APIRouter
from app.schemas.stage import StageUpdate
from app.database import SessionLocal
from app.models.lead_state import LeadState
from app.services.redis_service import publish_event

router = APIRouter()

@router.post("/stage/update")
def update_stage(data: StageUpdate):
    db = SessionLocal()

    state = db.query(LeadState).filter_by(lead_id=data.lead_id).first()

    # ✅ AUTO-CREATE LeadState if missing
    if not state:
        state = LeadState(
            lead_id=data.lead_id,
            stage=data.stage
        )
        db.add(state)
    else:
        state.stage = data.stage

    db.commit()

    try:
        publish_event("stage.updated", data.lead_id, {"stage": data.stage})
    except Exception as e:
        print("Redis skipped:", e)

    return {"status": "updated", "stage": data.stage}
