import { EventItem } from "@/lib/types";

interface Props {
  events: EventItem[];
}

export default function EventTimeline({ events }: Props) {
  return (
    <ul>
      {events.map((e: EventItem) => (
        <li key={e.event_id}>
          [{e.timestamp}] {e.type} - {e.source}
        </li>
      ))}
    </ul>
  );
}
