import { ActionLog } from "@/lib/types";

interface Props {
  logs: ActionLog[];
}

export default function ExplainableLogTable({ logs }: Props) {
  return (
    <table className="border">
      <thead>
        <tr>
          <th>Agent</th>
          <th>Input</th>
          <th>Reason</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((l: ActionLog) => (
          <tr key={l.log_id}>
            <td>{l.agent}</td>
            <td>{l.input_summary}</td>
            <td>{l.reasoning}</td>
            <td>{l.action}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
