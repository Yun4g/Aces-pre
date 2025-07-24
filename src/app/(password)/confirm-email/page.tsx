'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ConfirmEmail = () => {
 const handleOpenEmailApp = () => {
  const isAndroid = /android/i.test(navigator.userAgent);
  const isiOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

  if (isAndroid) {
    window.location.href = 'googlegmail://';
    setTimeout(() => {
      window.open('https://mail.google.com', '_blank');
    }, 1000);
  } else if (isiOS) {
    window.open('https://mail.google.com', '_blank');
  } else {
    window.open('https://mail.google.com', '_blank');
  }
};


  return (
    <div className="flex flex-col lg:flex-row justify-center h-screen">
  
      <div className="w-full lg:w-1/2 h-64 lg:h-auto relative hidden lg:block">
        <Image
          src="/assest/confirmEmail.png"
          alt="Confirm Email"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:w-[510px] p-6 sm:p-8">
          {/* Logo */}
          <div className="text-start w-full  mb-4">
            <Image
              src="/assest/logo.png"
              alt="Logo"
              width={112}
              height={40}
              className=" w-24 sm:w-28"
              priority
            />
          </div>

        
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-4">
            Check your mail
          </h2>

          
          <p className="text-gray-600 text-base mb-6">
            We have sent password recovery instructions to your email.
          </p>

       
          <button
            onClick={handleOpenEmailApp}
            className="bg-[#005A9C] text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Open Email
          </button>

          <Link
            href="/login"
            className="block text-start text-base font-medium mt-5  hover:underline"
          >
            Skip, I will confirm later
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
