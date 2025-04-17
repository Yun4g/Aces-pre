'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const ForgotPassword = () => {
  const router = useRouter();
   const [email, setEmail] = useState('');
   const [error, setError] = useState('');

//   // Optionally, you can add a loading state
   const [loading, setLoading] = useState(false);

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();

     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

     if (!email) {
       setError('Email is required');
       return;
     } else if (!emailRegex.test(email)) {
       setError('Please enter a valid email address');
       return;
     }

//     setError('');
    setLoading(true);
    router.push('/confirm-email');

    // Example: Call your API route to trigger reset email
    // try {
    //   // Replace with your actual API endpoint
    //   const res = await fetch('/api/auth/forgot-password', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email }),
    //   });

    //   if (!res.ok) {
    //     const data = await res.json();
    //     setError(data.error || 'Something went wrong');
    //     setLoading(false);
    //     return;
    //   }

    //   // Success: Navigate to confirmation page
    //   router.push('/confirm-email');
    // } catch (error) {
    //   setError( error);
    //   setLoading(false);
    // }
     }

  return (
    <div className="flex flex-col lg:flex-row  justify-center h-screen">
      {/* Left side with image */}
      <div className="w-full lg:w-1/2 h-64 hidden md:block lg:h-auto relative">
        <Image
          src="/assest/forgetPassword.png"
          alt="Forgot Password"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right side with form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:w-[510px] p-6 sm:p-8">
          {/* Logo */}
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

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-4">
            Forgot password
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 text-base mb-6">
            We will send password reset instructions to your email.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4 mt-6">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="comey@gmail.com"
                disabled={loading}
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <div className="flex items-center justify-center">
              <button
                className="bg-[#005A9C] text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Reset Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
