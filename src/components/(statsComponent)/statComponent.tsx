import { TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export function StatCards() {
  return (
    <div className=" flex flex-wrap w-full  gap-2">
      {/* Total Referrals */}
      <Card className="overflow-hidden flex-1  bg-white dark:bg-gray-900">
        <CardContent className="px-[49px] py-[30px]">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl text-gray-400 font-bold">248</h2>
              <p className="text-sm text-gray-400 font-bold">Total referrals</p>
            </div>
            <div className="flex items-center justify-center">
              <Image 
                src="/assest/icon.png" 
                alt="Total referrals icon" 
                width={150} 
                height={80} 
                className='h-[50px] w-[45px] '
              />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <TrendingUp className=" h-3 w-3 mr-1" />
            <span className="">10.2%</span>
            <span className="ml-1">vs Last month</span>
          </div>
        </CardContent>
      </Card>

      {/* Pending Referrals */}
      <Card className="overflow-hidden flex-1 bg-white dark:bg-gray-900">
        <CardContent className="px-[49px] py-[30px]">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl text-gray-400 font-bold">248</h2>
              <p className="text-sm text-gray-400 font-bold">Pending Referrals</p>
            </div>
            <div className=" flex items-center justify-center">
              <Image 
                src="/assest/icon (1).png" 
                alt="Pending referrals icon" 
                width={20} 
                height={20} 
                className='h-[50px] w-[48px]'
              />
            </div>
          </div>
          <div className="mt-2 flex items-center text-green-500 text-xs ">
            <TrendingUp className="text-green-500 h-3 w-3 mr-1" />
            <span className="text-green-500">10.2%</span>
            <span className="ml-1">vs Last month</span>
          </div>
        </CardContent>
      </Card>

      {/* Processed Referrals */}
      <Card className="overflow-hidden flex-1 bg-white dark:bg-gray-900">
        <CardContent className=" px-[49px] py-[30px]">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl text-gray-400 font-bold">248</h2>
              <p className="text-sm text-gray-400 font-bold">Processed Referrals</p>
            </div>
            <div className=" flex items-center justify-center">
              <Image 
                src="/assest/icon (2).png" 
                alt="Processed referrals icon" 
                width={20} 
                height={20} 
                className='h-[50px] w-[48px]'
              />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs text-red-500">
            <TrendingUp className=" h-3 w-3 mr-1" />
            <span className="">10.2%</span>
            <span className="ml-1">vs Last month</span>
          </div>
        </CardContent>
      </Card>


      <Card className="overflow-hidden flex-1 bg-white shadow-lg dark:bg-gray-900">
        <CardContent className="px-[49px] py-[30px]">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl text-gray-400 font-bold">248</h2>
              <p className="text-sm text-gray-400 font-bold">Flagged Referrals</p>
            </div>
            <div className=" flex items-center justify-center">
              <Image 
                src="/assest/icon (3).png" 
                alt="Flagged referrals icon" 
                width={20} 
                height={20} 
                className='h-[50px] w-[48px]'
              />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs text-green-500">
            <TrendingUp className="text-green-500 h-3 w-3 mr-1" />
            <span className="text-green-500">10.2%</span>
            <span className="ml-1">vs Last month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
