"use client";
import { useEffect, useState } from "react";
import { getLeads, generateRandomLead, createSystemLog } from "@/lib/api";
import { LeadState } from "@/lib/types";
import Link from "next/link";
import { Users, Target, Zap, AlertCircle, ChevronRight, UserPlus } from "lucide-react";

export default function LeadsPage() {
  const [leads, setLeads] = useState<LeadState[]>([]);
  // State for metrics that you want to be "randomized" but non-zero
  const [randomMetrics, setRandomMetrics] = useState({ score: 84, conversion: 12 });

  const refreshData = async () => {
    const data = await getLeads();
    setLeads(data);
    
    // Generate new non-zero random numbers whenever data refreshes
    setRandomMetrics({
      score: Math.floor(Math.random() * 20) + 75, // Random score between 75-95
      conversion: Math.floor(Math.random() * 10) + 5  // Random conversion between 5-15%
    });
  };

  useEffect(() => {
    const initApp = async () => {
      await createSystemLog("SystemKernel", "Database Connection Established", "Initializing lead intelligence environment");
      await refreshData();
    };
    initApp();
  }, []);

  const handleAddLead = async () => {
    try {
      await generateRandomLead();
      await refreshData(); 
    } catch (error) {
      console.error("Failed to sync new lead:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Lead Intelligence</h2>
          <p className="text-gray-500 font-medium">Manage and track high-intent sales opportunities.</p>
        </div>
        <button 
          onClick={handleAddLead}
          className="bg-black text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-800 transition-all shadow-xl shadow-gray-200"
        >
          <UserPlus size={18} /> Generate Hot Lead
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* These two use real database counts */}
        <StatCard 
            icon={<Target className="text-red-500" />} 
            label="Hot Leads" 
            value={leads.filter(l => l.priority === "Hot").length} 
        />
        <StatCard 
            icon={<Users className="text-blue-500" />} 
            label="Total Pipeline" 
            value={leads.length} 
        />
        
        {/* These two use the non-zero random state */}
        <StatCard 
            icon={<Zap className="text-amber-500" />} 
            label="Avg. Score" 
            value={randomMetrics.score} 
        />
        <StatCard 
            icon={<AlertCircle className="text-emerald-500" />} 
            label="Conversion" 
            value={`${randomMetrics.conversion}%`} 
        />
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["Lead Entity", "AI Score", "Priority", "Stage", "Risk", "Action"].map((h) => (
                <th key={h} className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {leads.map((l) => (
              <tr key={l.lead_id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-gray-900">Lead #{l.lead_id.slice(0, 8)}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-black">{l.score}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${
                    l.priority === "Hot" ? "bg-red-50 text-red-600 border border-red-100" : "bg-orange-50 text-orange-600 border border-orange-100"
                  }`}>{l.priority}</span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-700">{l.stage}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">{l.risk}</td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/leads/${l.lead_id}`} className="text-blue-600 hover:text-blue-800 font-bold text-sm inline-flex items-center gap-1">
                    View Twin <ChevronRight size={16} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: any, label: string, value: any }) {
  return (
    <div className="glass-card group hover:border-blue-200">
      <div className="flex justify-between items-start">
        <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-blue-50 transition-colors">{icon}</div>
        <span className="text-2xl font-black text-gray-900">{value}</span>
      </div>
      <p className="mt-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
    </div>
  );
}