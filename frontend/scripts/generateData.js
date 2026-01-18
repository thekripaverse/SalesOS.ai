const fs = require("fs");
const { randomUUID } = require("crypto");

const stages = ["New", "Contacted", "Engaged", "Negotiation", "Won", "Lost"];
const industries = ["SaaS", "EdTech", "FinTech", "Health", "Retail"];
const agents = ["LeadAgent", "NegotiationAgent", "FollowupAgent"];

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const data = [];

for (let i = 1; i <= 500; i++) {
  const stage = random(stages);
  const revenue = stage === "Won" ? Math.floor(Math.random() * 90000 + 10000) : 0;

  data.push({
    event_id: randomUUID(),
    lead_id: "L" + i,
    lead_name: "Lead " + i,
    company: "Company " + i,
    industry: random(industries),
    stage: stage,
    event_type: "lead.created",
    revenue: revenue,
    probability: Number(Math.random().toFixed(2)),
    agent: random(agents),
    timestamp: new Date(
      Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 90)
    ).toISOString(),
  });
}

fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
console.log("Dataset generated successfully!");
console.log("File: data.json");
console.log("Records:", data.length);
