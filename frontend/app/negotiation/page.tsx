import NegotiationPanel from "@/app/components/NegotiationPanel";

export default function NegotiationPage() {
  return (
    <NegotiationPanel
      deal={{ offer: "Pro Plan", objection: "Too costly", next: "Offer 8% off" }}
    />
  );
}
