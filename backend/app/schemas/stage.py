from pydantic import BaseModel

class StageUpdate(BaseModel):
    lead_id: str
    stage: str
