from pydantic import BaseModel
from typing import Dict

class AgentResponse(BaseModel):
    lead_id: str
    agent: str
    updates: Dict
    action: Dict
    reasoning: str
