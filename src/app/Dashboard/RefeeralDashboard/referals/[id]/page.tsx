import ReferralClient from '../referralClient';

interface PageProps {
  params: { id: string };
}

export default function ReferralDetailsPage({ params }: PageProps) {
  return <ReferralClient id={params.id} />;
}
