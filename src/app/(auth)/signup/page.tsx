'use client';

import React, { useState } from 'react';
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaChevronDown,
  FaMicrosoft,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';


const SignupSchema = z.object({
  email: z.string().nonempty('Email is required').email('Email is invalid'),
  username: z.string().nonempty('Please select a role'),
  role: z.string().nonempty('Please select a role'),
  password1: z.string().min(6, 'Password must be at least 6 characters'),
  password2: z.string().min(6, 'Password must be at least 6 characters'),
}).refine(data => data.password1 === data.password2, {
  path: ['password2'],
  message: "Passwords do not match",
});

type SignupFormData = z.infer<typeof SignupSchema>;

const Signup = () => {
  const router = useRouter();


 const useRegister = () => {
  return useMutation({
    mutationFn: async (data: SignupFormData) => {
 
      const roleFlags = {
        is_ref_manager: data.role === 'Referral Manager',
        is_district: data.role === 'District Admin',
        is_pro_staff: data.role === 'Program Staff',
        is_reviewer: data.role === 'System Administrator',
      };

      const response = await axios.post('/api/auth/registration/', {
        email: data.email,
        username: data.username,
        password1: data.password1,
        password2: data.password2,
        ...roleFlags, 
      });

      return response.data;
    },
  });
};




  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = React.useState(false)
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    username: '',
    password1: '',
    password2: '',
    role: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  console.log('success', successMessage)


const togglePassword1Visibility = () => {
  setShowPassword1(prev => !prev);
};

const togglePassword2Visibility = () => {
  setShowPassword2(prev => !prev);
};

  const registerMutation = useRegister();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = SignupSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof SignupFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof SignupFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      setErrors({});
      setLoading(true);
      setGeneralError(null);
      const data = await registerMutation.mutateAsync(formData);
      setSuccessMessage(data.detail);
      setTimeout(() => {
         router.push('/login');
      }, 500);

    } catch (error: any) {
      console.error("Registration error:", error.response?.data || error);
      alert("Registration failed: " + (
        error?.response?.data?.non_field_errors?.[0] ||
        JSON.stringify(error?.response?.data) ||
        "Unknown error"
      ));
      setGeneralError(
        error?.response?.data?.non_field_errors?.[0] ||
        "Registration failed. Please try again."
      );
    } finally{
       setGeneralError(null);
      setLoading(false);
      setFormData({
        email: '',
        username: '',
        password1: '',
        password2: '',
        role: '',
      });
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="flex  ">
      <div className="w-1/2 h-full min-h-screen  hidden md:flex items-center justify-center relative">
        <Image
          src="/assest/signUpacers.png"
          alt="Signup Illustration"
          fill
          className="object-cover h-full w-full"
          priority
        />
      </div>
      <div className="w-full md:w-1/2 h-full  flex items-center justify-center p-4">
        <div className="bg-white md:p-8 w-full md:max-w-xl lg:w-[510px]">
          {/* Logo */}
          <div className="text-start mb-4">
            <Image
              src="/assest/logo.png"
              alt="Logo"
              width={112}
              height={40}
              className=" w-24 sm:w-28"
              priority
            />
            <p className="text-gray-600 mt-3">Enter your email and password to continue</p>
          </div>

   
          <form onSubmit={handleSubmit} noValidate>
            {generalError && (
              <p className="text-red-600 text-center mt-4 font-semibold">
                {generalError}
              </p>
            )}

            {successMessage && (
              <p className="text-green-600 text-center mt-4 font-semibold">

                {successMessage}
              </p>
            )}
            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none border rounded-[6px]  w-full h-[44px] pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
                    }`}
                  placeholder="convey@gmail.com"
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error"
                />
              </div>
              {errors.email && (
                <p id="email-error" className="text-red-500 text-xs mt-1">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={` appearance-none border rounded-[6px]  w-full py-3 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.username ? 'border-red-500' : ''
                    }`}
                  placeholder="Enter your username"
                  aria-invalid={!!errors.username}
                  aria-describedby="username-error"
                />
              </div>
              {errors.username && (
                <p id="username-error" className="text-red-500 text-xs mt-1">
                  {errors.username}
                </p>
              )}
            </div>



            <div className="mb-4">
              <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
                Select Role
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser size={18} className="text-gray-400" />
                </div>
                <select
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`appearance-none border rounded w-full h-[44px] pl-10 pr-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.role ? 'border-red-500' : ''
                    }`}
                  aria-invalid={!!errors.role}
                  aria-describedby="role-error"
                >
                  <option value="">Select your role</option>
                  <option value="Referral Manager">Building Administrators</option>
                  <option value="District Admin">District Admin</option>
                  <option value="Program Staff">Social workers, school staff</option>
                  <option value="System Administrator">Pupil Services Admins</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FaChevronDown size={9} className="text-gray-400" />
                </div>
              </div>
              {errors.role && (
                <p id="role-error" className="text-red-500 text-xs mt-1">
                  {errors.role}
                </p>
              )}
            </div>

            {/* Password1 */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock size={18} className="text-gray-400" />
                </div>
                <input
                  type={showPassword1 ? 'text' : 'password'} 
                  id="password1"
                  value={formData.password1}
                  onChange={handleChange}
                  className={` appearance-none border rounded-[6px]  w-full h-[44px]  pl-10 pr-10 text-gray-700 text-base leading-tight focus:outline-none focus:shadow-outline ${errors.password1 ? 'border-red-500' : '' }`}
                  placeholder="Password"
                  aria-invalid={!!errors.password2}
                  aria-describedby="password-error"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePassword1Visibility}
                  aria-label={showPassword1 ? 'Hide password' : 'Show password'}
                >
                  {showPassword1 ? (
                    <FaEye size={18} className="text-gray-400" />
                  ) : (
                    <FaEyeSlash size={18} className="text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password1 && (
                <p id="password1-error" className="text-red-500 text-xs mt-1">
                  {errors.password1}
                </p>
              )}

            </div>

            {/* Password2 */}
            <div className="mb-4">
              <label htmlFor="password2" className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock size={18} className="text-gray-400" />
                </div>
                <input
                  type={showPassword2 ? 'text' : 'password'}
                  id="password2"
                  value={formData.password2}
                  onChange={handleChange}
                  className={` appearance-none border rounded-[6px]  w-full h-[44px]  pl-10 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password2 ? 'border-red-500' : ''
                    }`}
                  placeholder="Password"
                  aria-invalid={!errors.password2}
                  aria-describedby="password-error"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                   onClick={togglePassword2Visibility}
                  aria-label={showPassword2 ? 'Hide password' : 'Show password'}
                >
                  {showPassword2 ? (
                    <FaEye size={18} className="text-gray-400" />
                  ) : (
                    <FaEyeSlash size={18} className="text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password2 && (
                <p id="password2-error" className="text-red-500 text-xs mt-1">
                  {errors.password2}
                </p>
              )}

            </div>

            <div className="flex items-center justify-center mb-4">
              <Link
                href="/login"
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Already have an account? Login
              </Link>
            </div>


            <div className="text-center mb-4">
              <div className="flex items-center justify-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500 text-sm">Or with</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[6px]  focus:outline-none focus:shadow-outline w-full"
              >
               {loading ? 'Signing up...' : 'Sign Up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
