# Frontend Integration Contract

## REST APIs Used

GET /leads
→ returns LeadState[]

GET /lead/{id}
→ {
profile: LeadProfile,
state: LeadState
}

GET /events/{id}
→ EventItem[]

GET /logs/{id}
→ ActionLog[]

## WebSocket

Event name: "event"

Payload:
{
event_id: string,
type: string,
lead_id: string,
timestamp: string,
source: "agent" | "human"
}

Frontend listens on:
socket.on("event", callback)
