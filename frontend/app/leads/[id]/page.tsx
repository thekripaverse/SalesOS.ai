"use client";

import { useEffect, useState, use } from "react";
import { getLead, getEvents, getLogs } from "@/lib/api";
import { 
  Cpu, LayoutDashboard, MessageSquare, History, 
  TrendingUp, ShieldAlert, DollarSign, Brain, ChevronRight, Zap
} from "lucide-react";
import { EventItem, ActionLog, LeadState } from "@/lib/types";
import { runAgentOrchestration } from "@/lib/api";
// Helper for local telemetry dispatch (matches your Persistent Sidebar logic)
const dispatchTelemetry = (log: ActionLog) => {
  window.dispatchEvent(new CustomEvent("new-log", { detail: log }));
};

export default function DigitalTwinPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [data, setData] = useState<{profile: any, state: LeadState} | null>(null);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [logs, setLogs] = useState<ActionLog[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const [l, e, lo] = await Promise.all([
          getLead(id), 
          getEvents(id), 
          getLogs(id)
        ]);
        setData(l); 
        setEvents(e); 
        setLogs(lo);
      } catch (error) {
        console.error("Failed to sync Digital Twin:", error);
      }
    }
    init();
  }, [id]);

  /**
   * Triggers the Strategic AI Agent to analyze and act on the lead
   */
const handleExecuteStrategy = async () => {
  setIsExecuting(true);
  try {
    const result = await runAgentOrchestration(id, "DealAccelerationAgent");
    
    // The result contains the real reasoning from the LLM
    const agentLog = {
      log_id: crypto.randomUUID(),
      agent: result.agent,
      input_summary: "Analyzing deal stage duration...",
      reasoning: result.reasoning, 
      action: result.action.type,
      timestamp: new Date().toISOString()
    };

    dispatchTelemetry(agentLog);
    setLogs(prev => [agentLog, ...prev]);
  } finally {
    setIsExecuting(false);
  }
};
  if (!data) return (
    <div className="p-20 text-center animate-pulse font-bold text-gray-400">
      Synchronizing Neural Profile...
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="glass-card bg-linear-to-r from-white to-blue-50/30 border-l-4 border-l-blue-600">
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200">
              <Brain size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900">{data.profile.name}</h2>
              <p className="text-gray-500 font-medium">{data.profile.company} • {data.profile.industry}</p>
              <div className="flex gap-2 mt-2">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 rounded uppercase font-mono">ID: {id}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-green-100 text-green-700 rounded uppercase font-mono">Verified Lead</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-gray-400 uppercase">Expected Value</p>
            <p className="text-3xl font-black text-gray-900">₹{data.state.expected_value.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Metrics & Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card space-y-6">
            <h3 className="font-bold flex items-center gap-2 text-gray-900">
              <Cpu size={18} className="text-blue-500" /> AI Core Metrics
            </h3>
            
            <Metric label="Closing Probability" value={`${Math.round(data.state.probability_to_close * 100)}%`} progress={data.state.probability_to_close * 100} color="bg-blue-600" />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Risk Level</p>
                <div className="flex items-center gap-2">
                  <ShieldAlert size={14} className={data.state.risk === "High" ? "text-red-500" : "text-emerald-500"} />
                  <span className="font-bold text-gray-900">{data.state.risk}</span>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Lead Score</p>
                <div className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-blue-500" />
                  <span className="font-bold text-gray-900">{data.state.score}/100</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <p className="text-[10px] font-black text-blue-500 uppercase mb-2">Autonomous Next Step</p>
              <div className="p-3 bg-blue-50 rounded-xl text-sm font-bold text-blue-700 italic border border-blue-100">
                "{data.state.next_action}"
              </div>
            </div>
          </div>

          <div className="glass-card">
             <h3 className="font-bold flex items-center gap-2 mb-4"><LayoutDashboard size={18} /> Operations</h3>
             <div className="space-y-2">
                <button 
                  onClick={handleExecuteStrategy}
                  disabled={isExecuting}
                  className={`w-full text-left p-3 rounded-xl text-sm font-bold flex justify-between items-center transition-all group ${
                    isExecuting ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "hover:bg-blue-600 hover:text-white bg-blue-50 text-blue-700"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Zap size={14} /> {isExecuting ? "Executing..." : "Execute AI Strategy"}
                  </span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-xl text-sm font-bold flex justify-between items-center transition-colors">
                  Add Intelligence Note <MessageSquare size={14} />
                </button>
             </div>
          </div>
        </div>

        {/* Middle Column: Negotiation & Timeline */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card h-[400px] flex flex-col">
            <h3 className="font-bold flex items-center gap-2 mb-4 text-emerald-600">
              <DollarSign size={18} /> Negotiation Panel
            </h3>
            <div className="space-y-4 flex-grow overflow-auto custom-scroll pr-2">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <p className="text-[10px] font-black text-emerald-600 uppercase mb-1 text-gray-900">Active Offer</p>
                <p className="text-lg font-bold text-gray-900">Annual Pro Plan @ 12% Discount</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                <p className="text-[10px] font-black text-orange-600 uppercase mb-1 text-gray-900">Detected Objection</p>
                <p className="text-sm font-medium text-gray-900">Concern regarding seat-based pricing scalability.</p>
              </div>
            </div>
          </div>

          <div className="glass-card flex-grow h-[340px]">
            <h3 className="font-bold flex items-center gap-2 mb-4 text-gray-900">
              <History size={18} className="text-purple-500" /> Live Signals
            </h3>
            <div className="space-y-4 overflow-y-auto h-[260px] custom-scroll pr-2">
              {events.map((e: any) => (
                <div key={e.event_id} className="flex gap-3 relative pb-4 border-l border-gray-100 last:border-0 pl-4 ml-2">
                  <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-purple-500 border-2 border-white" />
                  <div>
                    <p className="text-xs font-black text-gray-900">{e.type}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{e.source} • {new Date(e.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Reasoning Logs (Chain of Thought) */}
        <div className="lg:col-span-4 h-full">
          <div className="glass-card h-[765px] flex flex-col">
            <h3 className="font-bold flex items-center gap-2 mb-4 text-blue-600">
              <Brain size={18} /> Chain of Thought
            </h3>
            <div className="space-y-6 overflow-y-auto custom-scroll pr-2 flex-grow">
              {logs.map((l: any) => (
                <div key={l.log_id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 relative">
                  <div className="absolute top-4 right-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                    AGENT: {l.agent_name || l.agent}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Input Analyzed</p>
                    <p className="text-sm text-slate-800 font-medium leading-relaxed">{l.input_summary}</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black text-blue-500 uppercase mb-1 underline underline-offset-4">Reasoning Process</p>
                    <p className="text-sm text-slate-600 italic">"{l.reasoning}"</p>
                  </div>
                  <div className="pt-2">
                    <p className="text-[10px] font-black text-emerald-600 uppercase">Final Action</p>
                    <p className="text-sm font-black text-slate-900">{l.action_taken || l.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, progress, color }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-black uppercase tracking-tight">
        <span className="text-gray-400">{label}</span>
        <span className="text-gray-900">{value}</span>
      </div>
      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
        {/* Fixed: Use template literal for class instead of inline style */}
        <div 
          className={`${color} h-full transition-all duration-1000`} 
          style={{ width: `${progress}%` }} // If you must use inline style, ensure it's allowed in your config, otherwise use:
          // className={`${color} h-full transition-all duration-1000 w-[${progress}%]`} 
        />
      </div>
    </div>
  );
}