from fastapi import APIRouter
from app.database import SessionLocal
from app.models.lead import Lead
from app.models.lead_state import LeadState
from sqlalchemy import func

router = APIRouter()

@router.get("/dashboard")
def dashboard():
    db = SessionLocal()
    total = db.query(Lead).count()
    hot = db.query(LeadState).filter_by(priority="Hot").count()
    
    # Correctly calculating sum of expected revenue
    revenue = db.query(func.sum(LeadState.expected_value)).scalar() or 0
    avg_score = db.query(func.avg(LeadState.score)).scalar() or 0
    
    all_leads = db.query(LeadState).all() 

    return {
        "total_leads": total,
        "hot_leads": hot,
        "expected_revenue": float(revenue),
        "avg_score": round(float(avg_score), 1),
        "leads": all_leads 
    }