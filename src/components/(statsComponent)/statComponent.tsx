// src/components/StatCards.tsx
import { TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Referrals */}
      <Card className="overflow-hidden">
        <CardContent className="p-4 ">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">248</h2>
              <p className="text-sm text-gray-500 font-bold">Total referrals</p>
            </div>
            <div className="bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center">
              <Image 
                src="/assest/icon.png" 
                alt="Total referrals icon" 
                width={20} 
                height={20} 
              />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <TrendingUp className="text-green-500 h-3 w-3 mr-1" />
            <span className="text-green-500">10.2%</span>
            <span className="ml-1">vs Last month</span>
          </div>
        </CardContent>
      </Card>

      {/* Pending Referrals */}
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">248</h2>
              <p className="text-sm text-gray-500 font-bold">Pending Referrals</p>
            </div>
            <div className="bg-[#FAF0CA] h-8 w-8 rounded-full flex items-center justify-center">
              <Image 
                src="/assest/icon (1).png" 
                alt="Pending referrals icon" 
                width={20} 
                height={20} 
              />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <TrendingUp className="text-green-500 h-3 w-3 mr-1" />
            <span className="text-green-500">10.2%</span>
            <span className="ml-1">vs Last month</span>
          </div>
        </CardContent>
      </Card>

      {/* Processed Referrals */}
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">248</h2>
              <p className="text-sm text-gray-500 font-bold">Processed Referrals</p>
            </div>
            <div className="bg-[#BAF3D54D] h-8 w-8 rounded-full flex items-center justify-center">
              <Image 
                src="/assest/icon (2).png" 
                alt="Processed referrals icon" 
                width={20} 
                height={20} 
              />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <TrendingUp className="text-green-500 h-3 w-3 mr-1" />
            <span className="text-green-500">10.2%</span>
            <span className="ml-1">vs Last month</span>
          </div>
        </CardContent>
      </Card>

      {/* Flagged Referrals */}
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">248</h2>
              <p className="text-sm text-gray-500 font-bold">Flagged Referrals</p>
            </div>
            <div className="bg-[#FFE4E7] h-8 w-8 rounded-full flex items-center justify-center">
              <Image 
                src="/assest/icon (3).png" 
                alt="Flagged referrals icon" 
                width={20} 
                height={20} 
              />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <TrendingUp className="text-green-500 h-3 w-3 mr-1" />
            <span className="text-green-500">10.2%</span>
            <span className="ml-1">vs Last month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
