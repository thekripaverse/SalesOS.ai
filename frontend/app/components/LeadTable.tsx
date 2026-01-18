import { LeadState } from "@/lib/types";

interface Props {
  leads: LeadState[];
}

export default function LeadTable({ leads }: Props) {
  const badge = (p: string) => {
    if (p === "Hot") return "bg-red-500 text-white";
    if (p === "Warm") return "bg-orange-500 text-white";
    return "bg-blue-500 text-white";
  };

  return (
    <table className="w-full border border-gray-300 mt-4">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2">ID</th>
          <th className="p-2">Score</th>
          <th className="p-2">Priority</th>
          <th className="p-2">Stage</th>
          <th className="p-2">Risk</th>
        </tr>
      </thead>
      <tbody>
        {leads.map(l => (
          <tr key={l.lead_id} className="text-center border-t">
            <td className="p-2">{l.lead_id}</td>
            <td className="p-2">{l.score}</td>
            <td className="p-2">
              <span className={`px-2 py-1 rounded ${badge(l.priority)}`}>
                {l.priority}
              </span>
            </td>
            <td className="p-2">{l.stage}</td>
            <td className="p-2">{l.risk}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
