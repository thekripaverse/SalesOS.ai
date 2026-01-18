interface Deal {
  offer: string;
  objection: string;
  next: string;
}

interface Props {
  deal: Deal;
}

export default function NegotiationPanel({ deal }: Props) {
  return (
    <div>
      <p>Offer: {deal.offer}</p>
      <p>Objection: {deal.objection}</p>
      <p>Next: {deal.next}</p>
    </div>
  );
}
