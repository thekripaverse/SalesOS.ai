from fastapi import APIRouter
from app.database import SessionLocal
from app.models.log import AgentLog

router = APIRouter()

# backend/app/routes/log_routes.py
@router.get("/logs/all")
def get_all_logs():
    db = SessionLocal()
    return db.query(AgentLog).order_by(AgentLog.timestamp.desc()).limit(20).all()

@router.get("/logs/{lead_id}")
def get_logs(lead_id: str):
    db = SessionLocal()
    return db.query(AgentLog).filter_by(lead_id=lead_id).all()