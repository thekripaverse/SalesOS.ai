"use client";
import { useEffect, useState } from "react";
import { 
  DollarSign, TrendingUp, Target, BarChart, ArrowUpRight, Zap 
} from "lucide-react";

export default function RevenuePage() {
  const [analytics, setAnalytics] = useState({
    total_leads: 0,
    hot_leads: 0,
    expected_revenue: 0
  });

  useEffect(() => {
    // Connect to backend dashboard route
    fetch("http://localhost:8000/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setAnalytics({
          total_leads: data.total_leads,
          hot_leads: data.hot_leads,
          expected_revenue: data.expected_revenue
        });
      })
      .catch((err) => console.error("Revenue fetch failed:", err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-10 space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-gray-900 uppercase">Revenue Forecast</h1>
          <p className="text-gray-500 font-medium">Predictive financial analytics driven by lead closing probabilities.</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Intelligence Confidence</p>
          <p className="text-2xl font-black text-blue-600">94.2%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <RevenueCard 
            label="Total Pipeline" 
            value={`₹${analytics.expected_revenue.toLocaleString()}`} 
            icon={<DollarSign />} 
            color="text-blue-600" 
        />
        <RevenueCard 
            label="Hot Leads Count" 
            value={analytics.hot_leads} 
            icon={<Target />} 
            color="text-emerald-600" 
        />
        <RevenueCard 
            label="Active Leads" 
            value={analytics.total_leads} 
            icon={<TrendingUp />} 
            color="text-purple-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card bg-white p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-xl text-gray-900 uppercase">Conversion Velocity</h3>
            <BarChart className="text-gray-300" />
          </div>
          <div className="space-y-6">
            <ConversionRow stage="Discovery to Proposal" rate="68%" drop="32%" />
            <ConversionRow stage="Proposal to Negotiation" rate="42%" drop="58%" color="bg-amber-500" />
            <ConversionRow stage="Negotiation to Closed" rate="89%" drop="11%" />
          </div>
        </div>

        <div className="glass-card bg-gray-900 text-white border-none shadow-2xl p-8 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Zap className="text-amber-400" size={20} /> Best Strategy
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            The AI detects a bottleneck in the <span className="text-white font-bold">Proposal</span> stage. 
          </p>
          <button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2">
            Execute Strategy <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function RevenueCard({ label, value, icon, color }: any) {
  return (
    <div className="glass-card bg-white p-8 group hover:shadow-xl transition-all border border-gray-100">
      <div className={`p-3 w-fit rounded-2xl bg-gray-50 mb-4 ${color} group-hover:bg-white transition-colors shadow-sm`}>{icon}</div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
      <p className="text-3xl font-black text-gray-900 mt-1">{value}</p>
    </div>
  );
}

function ConversionRow({ stage, rate, drop, color = "bg-blue-600" }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-bold">
        <span className="text-gray-500">{stage}</span>
        <span className="text-gray-900 font-mono">Success: {rate}</span>
      </div>
      <div className="w-full bg-gray-50 h-3 rounded-full overflow-hidden flex shadow-inner">
        <div className={`h-full ${color} transition-all duration-1000 shadow-sm`} style={{ width: rate }}></div>
      </div>
      <p className="text-[10px] text-right text-red-400 font-bold uppercase tracking-tighter">Drop-off: {drop}</p>
    </div>
  );
}