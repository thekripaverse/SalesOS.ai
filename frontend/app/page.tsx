import Link from "next/link";

export default function Home() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">Sales Intelligence System</h1>
      <Link href="/leads" className="block text-blue-600 underline">Leads</Link>
      <Link href="/pipeline" className="block text-blue-600 underline">Pipeline</Link>
      <Link href="/revenue" className="block text-blue-600 underline">Revenue</Link>
      <Link href="/negotiation" className="block text-blue-600 underline">Negotiation</Link>
      <Link href="/logs" className="block text-blue-600 underline">Agent Logs</Link>
    </div>
  );
}
