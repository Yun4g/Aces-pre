// src/components/RecentReferrals.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const referrals = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    type: 'Behavioural',
    status: 'Inprogress',
    assignedBy: 'Mr Adelaide',
    date: '12-January-2025',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    type: 'Special feat.',
    status: 'Pending',
    assignedBy: 'Mr Adelaide',
    date: '12-January-2025',
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    type: 'Special feat.',
    status: 'Rejected',
    assignedBy: 'Mr Adelaide',
    date: '12-January-2025',
  },
  {
    id: 4,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    type: 'Special feat.',
    status: 'Pending',
    assignedBy: 'Mr Adelaide',
    date: '12-January-2025',
  },
  {
    id: 5,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    type: 'Special feat.',
    status: 'Pending',
    assignedBy: 'Mr Adelaide',
    date: '12-January-2025',
  },
  {
    id: 6,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    type: 'Special feat.',
    status: 'Rejected',
    assignedBy: 'Mr Adelaide',
    date: '12-January-2025',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Inprogress':
      return 'bg-green-100 text-green-600';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-600';
    case 'Rejected':
      return 'bg-red-100 text-red-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Behavioural':
      return 'bg-blue-100 text-blue-600';
    case 'Special feat.':
      return 'bg-green-100 text-green-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export function RecentReferrals() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md font-medium">Recent Referrals</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Students</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned By</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {referrals.map((referral) => (
              <TableRow key={referral.id}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden relative">
                      <Image
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                          referral.name
                        )}&background=random`}
                        alt={referral.name}
                        width={32}
                        height={32}
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{referral.name}</p>
                      <p className="text-xs text-gray-500">{referral.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getTypeColor(referral.type)}`}
                  >
                    {referral.type}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getStatusColor(referral.status)}`}
                  >
                    {referral.status}
                  </span>
                </TableCell>
                <TableCell>{referral.assignedBy}</TableCell>
                <TableCell>{referral.date}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="h-7 px-3">
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 px-3">
                      Edit
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
