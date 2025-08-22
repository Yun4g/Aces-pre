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
  district: string | null;
  status: string;
  additional_notes: string | null;
  reason: string | null;
  special_education_label: string | null;
  created_at: string | null;
  created_by: string | null
  updated_at: string | null;
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
  const [token, setToken] = useState<string | null>(null);
  const fetchUserReferral = async (): Promise<RecentReferral[]> => {
    try {
      const res = await axios.get('/api/recent_referrals/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      console.error('Error fetching recent referrals:', error);
      return [];
    }
  };   



 

  const { data, isLoading, } = useQuery<RecentReferral[]>({
    queryKey: ['recentReferrals'],
    queryFn: fetchUserReferral,
    enabled: !!token,
  });



    const  fetchUserData = async () => {
      try {    
        const response = await axios.get(`/api/user/${data}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        return response?.data;
      } catch (error) {
        console.log(error);
        throw error; 
      }
    };
  

  useEffect(() => {
      fetchUserData()
   },[data])

    useEffect(() => {
    setToken(sessionStorage.getItem('token'));
    }, []);
  
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
                data.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b hover:bg-gray-50 text-center dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="py-3 px-2 max-w-[150px] whitespace-normal">
                      <div className="flex items-center justify-center space-x-2">
                        <Image
                          src={r.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}&background=random`}
                          alt={r.name || 'Student Avatar'}
                          width={32}
                          height={32}
                          className="rounded-full"
                          unoptimized
                        />
                        <div className="text-left">
                          <div className="font-medium">{r.name}</div>
                          <div className="text-xs text-gray-500 truncate">{r.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded text-xs whitespace-nowrap ${getTypeColor(r.type)}`}>
                        {r.type}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded text-xs whitespace-nowrap ${getStatusColor(r.status)}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3 px-2">{r.assignedBy}</td>
                    <td className="py-3 px-2">{r.date}</td>
                    <td className="py-3 px-2 whitespace-nowrap">
                      <a href="#" className="text-blue-600 mr-2 hover:underline">
                        View
                      </a>
                      <a href="#" className="text-gray-500 hover:underline">
                        Edit
                      </a>
                    </td>
                  </tr>
                ))
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
