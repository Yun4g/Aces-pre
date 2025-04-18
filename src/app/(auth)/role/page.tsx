'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface RoleOption {
  id: string;
  title: string;
  description: string;
  selected: boolean;
  src: string;
}



// Districts = District Admins
// Referral Managers = Building Administrators (to be renamed)
// Program Staff = Social workers, school staff (can view, not edit statuses)
// System Administrators = Pupil Services Admins


const JoinAs = () => {
  const router = useRouter();

  const [roleOptions, setRoleOptions] = useState<RoleOption[]>([
    {
      id: 'districts',
      title: 'Districts Admin',
      description: 'Personal account to manage all your activities.',
      selected: false,
      src: '/assest/JoinUs1.png',
    },
    {
      id: 'referral-managers',
      title: 'Building Administrators',
      description: 'Own or belong to a company, this is for you.',
      selected: false,
      src: '/assest/JoinUs2.png',
    },
    {
      id: 'program-staff',
      title: 'Social workers, school staff',
      description: 'Own or belong to a company, this is for you.',
      selected: false,
      src: '/assest/joinUs3.png',
    },
    {
      id: 'system-administrators',
      title: 'Pupil Services Admins',
      description: 'Own or belong to a company, this is for you.',
      selected: false,
      src: '/assest/joinUs4.png',
    },
  ]);

  const handleRoleSelect = (id: string) => {
    setRoleOptions((prev) =>
      prev.map((option) => ({
        ...option,
        selected: option.id === id,
      }))
    );
  };

  const handleContinue = () => {
    const selectedRole = roleOptions.find((option) => option.selected);
    if (!selectedRole) return;

    switch (selectedRole.id) {
      case 'districts':
        router.push('/register/districts');
        break;
      case 'referral-managers':
        router.push('/register/referral-managers');
        break;
      case 'program-staff':
        router.push('/register/program-staff');
        break;
      case 'system-administrators':
        router.push('/register/system-administrators');
        break;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Panel */}
      <div className="bg-blue-600 text-white pt-8 md:w-1/2 justify-start relative hidden md:block">
        <Image
          src="/assest/createNewPassimg.png"
          alt="Illustration"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Panel */}
      <div className="bg-white p-6 md:p-10 md:w-1/2 flex flex-col overflow-auto">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-4">
            <Image
              src="/assest/logo.png"
              alt="Logo"
              width={112}
              height={40}
              className="mx-auto w-24 sm:w-28"
              priority
            />
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-2">Join Us!</h2>
          <p className="text-gray-600 text-lg mb-6">
            To begin your journey, let us know which option below best describes your role.
          </p>

          <div className="space-y-4">
            {roleOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleRoleSelect(option.id)}
                className={`flex items-center border rounded-lg p-4 cursor-pointer transition-all ${
                  option.selected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full mr-4 ${
                    option.selected ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-500'
                  }`}
                >
                  <Image
                    src={option.src}
                    alt={option.title}
                    width={36}
                    height={36}
                    className="w-9 h-9"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{option.title}</h3>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
              disabled={!roleOptions.some((option) => option.selected)}
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinAs;
