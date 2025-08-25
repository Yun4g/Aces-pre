'use client';

import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const passwordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

const CreateNewPassword = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<PasswordFormData>({
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PasswordFormData, string>>>({});
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordChangeMutation = useMutation({
    mutationFn: async (data: { new_password1: string; new_password2: string }) => {
      const response = await axios.post('https://api.aces-tdx.com/api/auth/password/change/', data);
      return response.data;
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = passwordSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: Partial<Record<keyof PasswordFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof PasswordFormData;
        newErrors[field] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setGeneralError('');
    setLoading(true);

    try {
      const response = await passwordChangeMutation.mutateAsync({
        new_password1: formData.password,
        new_password2: formData.confirmPassword,
      });
          setSuccessMessage('Password successfully updated!');
            setFormData({ password: '', confirmPassword: '' });
      console.log(response);
      router.push('/login');
    } catch (error: any) {
      console.error(error);
      const message =
        error?.response?.data?.new_password1?.[0] ||
        error?.response?.data?.new_password2?.[0] ||
        error?.response?.data?.detail ||
        'Failed to reset password. Please try again.';
      setGeneralError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center  md:flex-row h-screen">
      <div className="md:w-1/2 relative hidden md:block">
        <Image
          src="/assest/createNewPassimg.png"
          alt="Illustration"
          fill
          className="h-full w-full object-cover"
          priority
        />
      </div>

      <div className="bg-white p-6 md:p-10 md:w-1/2 flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
          <div className="text-start mb-4">
            <Image
              src="/assest/logo.png"
              alt="Logo"
              width={112}
              height={40}
              className=" w-24 sm:w-28"
              priority
            />
          </div>

           <div className='text-start mb-6'>
            <h2 className="text-4xl font-bold text-start mb-6">Create New Password</h2>
          <p className="text-gray-600 text-base ">We have sent a password recover instructions  to your email</p>
           </div>

          {generalError && (
            <div className="text-red-600 text-sm mb-4 text-center">
              {generalError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {successMessage && (
               <div className="text-green-600 text-sm mb-4 text-center">
                {successMessage}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm text-gray-600">New Password</label>
              <div className="relative">
                <input
                  type='password'
                  id="password"
                  value={formData.password}
                  placeholder="*********"
                  onChange={handleChange}
                  className={`w-full p-2 border rounded focus:outline-none focus:ring-2 pr-10 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                  autoComplete="new-password"
                  disabled={loading}
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                >
                   <Image src={'/assest/LockPassword.png'} alt=' icon' height={40} width={20}/>
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm text-gray-600">Confirm Password</label>
              <div className="relative">
                <input
                  type='password'
                  id="confirmPassword"
                  value={formData.confirmPassword}
                   placeholder="*********"
                  onChange={handleChange}
                  className={`w-full p-2 border rounded focus:outline-none focus:ring-2 pr-10 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                  autoComplete="new-password"
                  disabled={loading}
                />
                <button type="button"  
                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600">
                  <Image src={'/assest/LockPassword.png'} alt=' icon' height={40} width={20}/>
                </button>
                
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPassword;
