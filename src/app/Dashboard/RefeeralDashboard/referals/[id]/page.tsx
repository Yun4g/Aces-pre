import ReferralClient from "../referralClient";


export default function ReferralDetailsPage({ params }: { params: { id: string } }) {
  return <ReferralClient id={params.id} />;
}