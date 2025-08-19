import ReferralClient from '../referralClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ReferralDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <ReferralClient id={resolvedParams.id} />;
}
