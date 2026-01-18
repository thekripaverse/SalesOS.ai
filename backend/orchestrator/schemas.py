# schemas.py
from pydantic import BaseModel
from typing import Dict

class Event(BaseModel):
    event_type: str
    lead_id: str

class AgentResponse(BaseModel):
    next_event: str
    reasoning: str
