from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine

from app.routes import (
    lead_routes,
    stage_routes,
    dashboard_routes,
    log_routes,
    agent_routes,
    salesforce_routes
)

# ⚠️ Run once only, then comment
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sales Intelligence Backend")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def root():
    return {"status": "Sales Intelligence Backend is running"}

# Core APIs
app.include_router(lead_routes.router)
app.include_router(stage_routes.router)
app.include_router(dashboard_routes.router)
app.include_router(log_routes.router)

# Agent orchestration
app.include_router(agent_routes.router)

# Salesforce integration
app.include_router(salesforce_routes.router)
