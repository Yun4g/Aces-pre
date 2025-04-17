'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

// Define the form field structure
interface FormData {
  email: string;
  password: string;
}

const SectionSix: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
    // Add actual submission logic here (e.g., API call)
  };

  return (
    <section className="flex flex-col lg:flex-row items-center justify-between bg-[#061F31] text-white px-6 sm:px-10 lg:px-24 py-16 gap-10">
      {/* Left Side Content */}
      <div className="text-start w-full lg:w-1/2">
        <h2 className="text-sm font-bold uppercase mb-3 tracking-wide text-blue-400">
          Why Choose Us
        </h2>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
          Track your crypto portfolio in the best way possible
        </h1>
        <p className="text-base sm:text-lg mb-6 text-gray-300">
          Mean if he they been no hold mr. Is at much do made. Latter person am secure of estate genius at.
        </p>
      </div>

      {/* Right Side Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full lg:w-1/2 p-6 sm:p-8 rounded-xl space-y-5 shadow-lg bg-[#0A2A42]"
      >
        {/* Email Field */}
        <div>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="w-full px-4 py-3 border border-gray-600 bg-[#0A2A42] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email Address"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            className="w-full px-4 py-3 border border-gray-600 bg-[#0A2A42] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition duration-200"
        >
          GET STARTED
        </button>
      </form>
    </section>
  );
};

export default SectionSix;
