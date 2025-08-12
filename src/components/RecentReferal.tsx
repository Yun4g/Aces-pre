"use client"
 
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
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface RecentReferal {
  id: number;
  priority: string | null;
  referral_info: string | null;
  referral_type: string | null;
  district: string | null;
  status: string;
  additional_notes: string | null;
  reason: string | null;
  special_education_label: string | null;
  created_at: string | null;
  updated_at: string | null;
  draft: boolean;
  iep_document: string | null;
  consent_form: string | null;
  cognitive_assesments: string | null;
  avatar: string | null;
  subject: number;
  ref_manager: number;
  pro_staff: number;
  created_by: string | null;
  email: string;
  name: string;
  type: string;
  assignedBy: string;
  date: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'In progress':
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
  const token = sessionStorage.getItem('token');

  const fetchUserReferal = async (): Promise<RecentReferal[]> => {
    try {
      const res = await axios.get('/api/recent_referrals/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      return res.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const { data } = useQuery<RecentReferal[]>({
    queryKey: ['recentReferrals'],
    queryFn: fetchUserReferal,
    enabled: !!token,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md font-medium">Recent Referrals</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-[#F5F5F5] ">
            <TableRow className=' text-center '>
              <TableHead className="text-center align-middle">Students</TableHead>
              <TableHead className="text-center align-middle">Type</TableHead>
              <TableHead className="text-center align-middle">Status</TableHead>
              <TableHead className="text-center align-middle">Assigned By</TableHead>
              <TableHead className="text-center align-middle">Date</TableHead>
              <TableHead className="text-center align-middle">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((referral) => (
                <TableRow key={referral.id} className="text-center ">
                  <TableCell>
                    <div className="flex items-center justify-center text-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden relative">
                        <Image
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            referral.name,
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
                  <TableCell className="text-center align-middle">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getTypeColor(
                        referral.type,
                      )}`}
                    >
                      {referral.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-center align-middle">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        referral.status,
                      )}`}
                    >
                      {referral.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-center align-middle">{referral.assignedBy}</TableCell>
                  <TableCell className="text-center align-middle">{referral.date}</TableCell>
                  <TableCell className="text-center align-middle">
                    <div className="text-center align-middle flex justify-center space-x-2">
                      <Button  size="sm" className="h-7 px-3  text-center align-middle ">
                        View
                      </Button>
                      <Button  size="sm" className="h-7 px-3">
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No recent referrals found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
