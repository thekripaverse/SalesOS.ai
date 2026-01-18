from sqlalchemy import Column, String, Float, Integer, DateTime
from app.database import Base
import datetime

class LeadState(Base):
    __tablename__ = "lead_states"

    lead_id = Column(String, primary_key=True)
    stage = Column(String, default="New")
    priority = Column(String, default="Warm")
    expected_value = Column(Float, default=0)
    score = Column(Integer, default=0)
    probability_to_close = Column(Float, default=0)

    last_action = Column(String)
    last_activity = Column(DateTime, default=datetime.datetime.utcnow)
