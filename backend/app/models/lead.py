from sqlalchemy import Column, String, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base
import uuid, datetime

class Lead(Base):
    __tablename__ = "leads"

    lead_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String)
    email = Column(String)
    company = Column(String)
    industry = Column(String)
    role = Column(String)
    budget_range = Column(String)
    source = Column(String, default="web")
    consent = Column(Boolean)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
