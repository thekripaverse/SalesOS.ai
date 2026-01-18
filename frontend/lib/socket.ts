import { io } from "socket.io-client";

export const socket = io("http://localhost:8000", {
  transports: ["websocket"],
  autoConnect: true,
});

// DEMO MODE – remove when backend is real
setInterval(() => {
  socket.emit("event", {
    event_id: crypto.randomUUID(),
    type: "deal.stalled",
    lead_id: "1",
    timestamp: new Date().toISOString(),
    source: "agent",
  });
}, 5000);
