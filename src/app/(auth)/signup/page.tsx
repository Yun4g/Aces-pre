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

// Zod Schema
const SignupSchema = z.object({
  email: z.string().nonempty('Email is required').email('Email is invalid'),
  role: z.string().nonempty('Please select a role'),
  password: z
    .string()
    .nonempty('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

type SignupFormData = z.infer<typeof SignupSchema>;

const Signup = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    role: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
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
    

    setErrors({});
    console.log('Form submitted:', formData);
    router.push('/role');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="flex h-screen">
      {/* Left side with the blue background */}
      <div className="w-1/2 hidden md:flex items-center justify-center relative">
        <Image
          src="/assest/signUpacers.png"
          alt="Signup Illustration"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right side with the form */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="bg-white p-8 w-full max-w-md sm:max-w-lg md:max-w-xl lg:w-[510px]">
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
            <p className="text-gray-600 mt-3">Enter your email and password to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
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
                  className={`shadow appearance-none border rounded w-full py-3 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.email ? 'border-red-500' : ''
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

            {/* Role */}
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
                  className={`shadow appearance-none border rounded w-full py-3 pl-10 pr-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.role ? 'border-red-500' : ''
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
                  <FaChevronDown size={18} className="text-gray-400" />
                </div>
              </div>
              {errors.role && (
                <p id="role-error" className="text-red-500 text-xs mt-1">
                  {errors.role}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock size={18} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-3 pl-10 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.password ? 'border-red-500' : ''
                  }`}
                  placeholder="Password"
                  aria-invalid={!!errors.password}
                  aria-describedby="password-error"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} className="text-gray-400" />
                  ) : (
                    <FaEye size={18} className="text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="text-red-500 text-xs mt-1">
                  {errors.password}
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

            <div className="mb-4">
              <button
                type="button"
                className="w-full py-2.5 px-4 border border-[#FF6607] rounded-md font-semibold text-[#FF6607] transition-colors duration-300 hover:bg-red-800 hover:text-white flex items-center justify-center"
                onClick={() => alert('Office 365 auth not implemented')}
              >
                <FaMicrosoft size={18} className="mr-2" />
                Office 365
              </button>
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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
