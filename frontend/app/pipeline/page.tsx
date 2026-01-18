// app/pipeline/page.tsx
"use client";
import { useEffect, useState } from "react";
import { getLeads } from "@/lib/api";
import { TrendingUp, BarChart3, PieChart, ArrowUpRight } from "lucide-react";
import { LeadState } from "@/lib/types";

export default function PipelineDashboard() {
  const [leads, setLeads] = useState<LeadState[]>([]);

  useEffect(() => {
    getLeads().then(setLeads);
  }, []);

  const totalValue = leads.reduce((acc, curr) => acc + curr.expected_value, 0);
  const avgScore = Math.round(leads.reduce((acc, curr) => acc + curr.score, 0) / (leads.length || 1));

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-10">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900">Revenue & Pipeline</h1>
          <p className="text-gray-500 font-medium text-lg">Global performance and forecasting intelligence.</p>
        </div>
        <div className="bg-emerald-50 text-emerald-700 px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 border border-emerald-100 shadow-sm">
          <ArrowUpRight size={18} /> Forecast: ₹{(totalValue * 0.45).toLocaleString()}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <KPIItem icon={<BarChart3 className="text-blue-500" />} label="Pipeline Value" value={`₹${totalValue.toLocaleString()}`} />
        <KPIItem icon={<PieChart className="text-purple-500" />} label="Avg. AI Score" value={avgScore} />
        <KPIItem icon={<TrendingUp className="text-emerald-500" />} label="Active Leads" value={leads.length} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card bg-white p-8">
          <h3 className="text-xl font-bold mb-8">Stage Distribution</h3>
          <div className="space-y-8">
            <StageBar label="Discovery" count={leads.filter(l => l.stage === "Discovery").length} total={leads.length} color="bg-blue-500" />
            <StageBar label="Proposal" count={leads.filter(l => l.stage === "Proposal").length} total={leads.length} color="bg-purple-500" />
            <StageBar label="Negotiation" count={leads.filter(l => l.stage === "Negotiation").length} total={leads.length} color="bg-emerald-500" />
          </div>
        </div>

        <div className="glass-card bg-gradient-to-br from-indigo-600 to-blue-700 text-white border-none p-8 shadow-xl">
          <h3 className="text-2xl font-bold mb-4">AI Strategy Insight</h3>
          <p className="text-blue-100 mb-8 leading-relaxed">Intelligence analysis of stall points and conversion velocity.</p>
          <div className="p-6 bg-white/10 rounded-3xl border border-white/20 backdrop-blur-md">
            <p className="text-xl font-bold">Focus: Negotiation Stage</p>
            <p className="text-blue-50/80 mt-2">High-value leads are lingering in 'Proposal'. Deploying the Strategic Negotiation agent could accelerate closing by 14%.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPIItem({ icon, label, value }: any) {
  return (
    <div className="glass-card flex items-center gap-6 p-6 group hover:border-blue-300">
      <div className="p-5 bg-gray-50 rounded-2xl group-hover:bg-white transition-all shadow-sm">{icon}</div>
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-3xl font-black text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function StageBar({ label, count, total, color }: any) {
  const percentage = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm font-bold">
        <span className="text-gray-700">{label}</span>
        <span className="text-gray-400">{count} Leads</span>
      </div>
      <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">
        <div className={`${color} h-full transition-all duration-1000 shadow-sm`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}