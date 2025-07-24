'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
});

type SignupFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const useResetPassword = () => {
    return useMutation({
      mutationFn: async (data: SignupFormData) => {
        const response = await axios.post('/api/auth/password/reset/', {
          email: data.email,
        });
        return response.data;
      },
    });
  };

  const resetMutation = useResetPassword();

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const result = forgotPasswordSchema.safeParse({ email });
  if (!result.success) {
    const fieldError = result.error.flatten().fieldErrors.email?.[0] || 'Invalid input';
    setError(fieldError);
    return;
  }

  setError('');
  setLoading(true);

  try {
  
     const data =  await resetMutation.mutateAsync({ email });
     console.log(data)
     setSuccessMessage(data.detail)

     if (data.detail) {
      setTimeout(() => {
         router.push('/confirm-email');
      }, 2000);
     }
 
  } catch (error: any) {
    if (error?.response?.data?.email) {
      setError(error.response.data.email[0]);
    } else if (error?.response?.data?.detail) {
      setError(error.response.data.detail);
    } else {
      setError('Something went wrong. Please try again.');
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex flex-col lg:flex-row justify-center h-screen">
      {/* Left side with image */}
      <div className="w-full lg:w-1/2 h-64 hidden md:block lg:h-auto relative">
        <Image
          src="/assest/forgetPassword.png"
          alt="Forgot Password"
          fill
          className="h-full w-full object-cover"
          priority
        />
      </div>

      {/* Right side with form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:w-[510px] p-6 sm:p-8">
          <div className="text-start mb-4">
            <Image
              src="/assest/logo.png"
              alt="Logo"
              width={112}
              height={40}
              className=" w-28 sm:w-28"
              priority
            />
          </div>

          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-4">
            Forgot password
          </h2>

          <p className="text-gray-600 text-base mb-6">
            We will send password reset instructions to your email.
          </p>

          <form onSubmit={handleSubmit}>

        {successMessage && (
               <p className="text-green-600 text-center mt-4 font-semibold">            
                  {successMessage}
                 </p>
         )}

            <div className="mb-4 mt-6">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" appearance-none border rounded w-full h-[44px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
