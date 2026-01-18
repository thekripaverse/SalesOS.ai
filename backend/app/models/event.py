from sqlalchemy import Column, String, DateTime, JSON
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base
import uuid, datetime

class Event(Base):
    __tablename__ = "events"

    event_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    lead_id = Column(UUID(as_uuid=True))
    type = Column(String)
    payload = Column(JSON)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
