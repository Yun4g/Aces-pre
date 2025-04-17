'use client';

import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CreateNewPassword = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const passwordsMatch = password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return;
    }

    setError('');
    setSubmitting(true);

    // Example: POST to your API route for password reset
    try {
     
      setTimeout(() => {
        setSubmitting(false);
        router.push('/login'); // Redirect to login after success
      }, 1200);
    } catch (err) {
      setError('Failed to reset password. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Panel */}
      <div className="md:w-1/2 flex flex-col justify-start relative">
        <Image
          src="/assest/createNewPassimg.png"
          alt="Illustration"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Panel */}
      <div className="bg-white p-6 md:p-10 md:w-1/2 flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
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

          <h2 className="text-4xl font-bold text-start mb-6">Create New Password</h2>

          {error && (
            <div className="text-red-600 text-sm mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm text-gray-600">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  autoComplete="new-password"
                  disabled={submitting}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword(prev => !prev);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm text-gray-600">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full p-2 border ${
                    confirmPassword && !passwordsMatch ? 'border-red-500' : 'border-gray-300'
                  } rounded focus:outline-none focus:ring-2 ${
                    confirmPassword && !passwordsMatch ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                  } pr-10`}
                  autoComplete="new-password"
                  disabled={submitting}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowConfirmPassword(prev => !prev);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              {confirmPassword && !passwordsMatch && (
                <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={submitting}
            >
              {submitting ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPassword;
