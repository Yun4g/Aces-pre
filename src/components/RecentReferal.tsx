"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface RecentReferral {
  id: number;
  priority: string | null;
  referral_info: string | null;
  referral_type: string | null;
  username : string | null;
  district: string | null;
  status: string;
  additional_notes: string | null;
  reason: string | null;
  special_education_label: string | null;
  created_at: string | null;
  created_by: string | null; 
  updated_at: string | number | Date;
  draft: boolean;
  iep_document: string | null;
  consent_form: string | null;
  cognitive_assesments: string | null;
  avatar: string | null;
  subject: number;
  ref_manager: number;
  pro_staff: number;
  email: string;
  name: string;
  type: string;
  assignedBy: string;
  date: string;
}

interface User {
  id: number;
  password: string | null;
  last_login: string | null;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  avatar: string | null;
  is_district: boolean;
  is_ref_manager: boolean;
  is_pro_staff: boolean;
  is_reviewer: boolean;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'In progress':
      return 'bg-green-100 text-green-600';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-600';
    case 'Rejected':
      return 'bg-red-100 text-red-600';
    case 'Success':
      return 'bg-green-100 text-green-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

const getTypeColor = (type: string | null) => {
  switch (type) {
    case 'Academic Intervention':
      return 'bg-blue-100 text-blue-600';
    case 'Special feat.':
      return 'bg-green-100 text-green-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export function RecentReferrals() {
  const [token, setToken] = useState<string | null>(null);
  const [userMap, setUserMap] = useState<Record<string, User>>({});
  
  useEffect(() => {
    setToken(sessionStorage.getItem('token'));
  }, []);
   console.log(token, 'login token')
  const fetchUserData = async (userId: string) => {
    if (userMap[userId]) return userMap[userId];

    const res = await axios.get<User>(`https://api.aces-tdx.com/api/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setUserMap((prev) => ({ ...prev, [userId]: res.data }));
    return res.data;
  };

  const fetchUserReferral = async (): Promise<RecentReferral[]> => {
    const res = await axios.get<RecentReferral[]>('https://api.aces-tdx.com/api/recent_referrals/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    await Promise.all(
      res.data.map((r) => r.created_by && fetchUserData(r.created_by))
    );
    return res.data;
  };

  const { data, isLoading } = useQuery<RecentReferral[]>({
     queryKey: ['recentReferrals', token],
     queryFn: fetchUserReferral,
     enabled: !!token, 
     refetchInterval: 4000,
  });

  console.log(data, 'recent data')

  if (isLoading) {
    return (
      <Card className="border-none bg-white dark:bg-gray-800 mx-3">
        <CardContent className="p-4 text-center text-gray-500">Loading recent referrals...</CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none bg-white dark:bg-gray-800 mx-3">
      <CardContent className="p-4">
        <h2 className="text-sm sm:text-base text-gray-600 mb-4">Recent Referrals</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm sm:text-base border-collapse">
            <thead className="bg-[#F5F5F5] h-[60px] dark:bg-gray-700">
              <tr className="border-b text-center">
                <th className="pb-2 px-2">Students</th>
                <th className="pb-2 px-2">Type</th>
                <th className="pb-2 px-2">Status</th>
                <th className="pb-2 px-2">Assigned By</th>
                <th className="pb-2 px-2">Date</th>
                <th className="pb-2 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((r) => {
                  const user = r.created_by ? userMap[r.created_by] : null;
                  console.log(user, 'created user')
                  return (
                    <tr
                      key={r.id}
                      className="border-b hover:bg-gray-50 text-center dark:hover:bg-gray-800 transition-colors"
                    >
                      <td className="py-3 px-2 max-w-[150px] whitespace-normal">
                        <div className="flex items-center justify-center space-x-2">
                          <Image
                            src={r.avatar || "data:image/jpeg;base64,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"}
                            alt={r.name || 'Student Avatar'}
                            width={32}
                            height={32}
                            className="rounded-full"
                            unoptimized
                          />
                          <div className="text-left">
                          
                            <div className="text-xs text-gray-500 truncate">{r.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded text-xs whitespace-nowrap ${getTypeColor(r.referral_type)}`}>
                          {r.referral_type}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded text-xs whitespace-nowrap ${getStatusColor(r.status)}`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="py-3 px-2"> { user && `${user.username} ` }</td>
                      <td className="py-3 px-2">
                        {new Date(r.updated_at).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-3 px-2 whitespace-nowrap">
                        <a href="#" className="text-blue-600 mr-2 hover:underline">View</a>
                        <a href="#" className="text-gray-500 hover:underline">Edit</a>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-4 text-center text-gray-500">
                    No recent referrals found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
