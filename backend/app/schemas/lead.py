from pydantic import BaseModel

class LeadCreate(BaseModel):
    name: str
    email: str
    company: str
    industry: str
    role: str
    budget_range: str
    consent: bool
