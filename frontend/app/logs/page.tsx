// app/logs/page.tsx
import { getLogs } from "@/lib/api";
import { Brain, Terminal, ShieldCheck, Zap } from "lucide-react";

export default async function LogsPage() {
  const logs = await getLogs("Global");

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-8">
      <header>
        <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
          <Terminal className="text-blue-600" /> Agent Decision Logs
        </h1>
        <p className="text-gray-500 mt-2 font-medium">Audit trail for autonomous agentic reasoning and executed actions.</p>
      </header>

      <div className="space-y-4">
        {logs.map((log) => (
          <div key={log.log_id} className="glass-card bg-white hover:border-blue-200 transition-all border-l-4 border-l-blue-600 group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Brain size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{log.agent}</h3>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{new Date(log.timestamp).toLocaleString()}</p>
                </div>
              </div>
              <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded">ID: {log.log_id}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-gray-400 uppercase">Input Context</p>
                <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">{log.input_summary}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black text-blue-500 uppercase">Neural Reasoning</p>
                <p className="text-sm text-gray-600 italic bg-blue-50/30 p-3 rounded-xl border border-blue-100/50">"{log.reasoning}"</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                <ShieldCheck size={16} /> Verified Executed Action
              </div>
              <div className="bg-gray-900 text-white px-4 py-1.5 rounded-lg text-xs font-mono">
                {log.action}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}