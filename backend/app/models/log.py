from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base
import uuid, datetime

class AgentLog(Base):
    __tablename__ = "agent_logs"

    log_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    lead_id = Column(UUID(as_uuid=True))
    agent_name = Column(String)
    input_summary = Column(String)
    reasoning = Column(String)
    action_taken = Column(String)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
