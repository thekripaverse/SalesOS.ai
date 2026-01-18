// app/layout.tsx
import "./globals.css";
import PersistentLogSidebar from "@/app/components/PersistentLogSidebar";
import Link from "next/link"; // Use Link for persistent navigation

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-[#fcfcfd] overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-20 border-b bg-white/80 backdrop-blur-md flex items-center justify-between px-10 sticky top-0 z-20">
  {/* Modernized & Enlarged Title */}
  <div className="flex items-center gap-2 group cursor-default">
    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
      <span className="text-white font-black text-xl italic">S</span>
    </div>
    <h1 className="text-4xl font-black tracking-tighter">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
        SalesOS
      </span>
      <span className="text-gray-900">.ai</span>
    </h1>
  </div>

  <nav className="flex gap-8">
    <Link href="/leads" className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-blue-600 transition-colors">Leads</Link>
    <Link href="/pipeline" className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-blue-600 transition-colors">Pipeline</Link>
    <Link href="/revenue" className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-blue-600 transition-colors">Revenue</Link>
  </nav>
</header>
          
          <main className="flex-1 overflow-y-auto p-8 custom-scroll">
            {children}
          </main>
        </div>

        {/* Persistent Terminal Sidebar (Fixed Right) */}
        <aside className="w-[400px] h-screen shrink-0 relative z-30">
          <PersistentLogSidebar />
        </aside>
      </body>
    </html>
  );
}