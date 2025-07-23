'use client';

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useMutation } from '@tanstack/react-query';

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  username: z.string().min(3, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof loginSchema>;

// ✅ Mutation hook moved outside the component
const useLogin = () => {
  return useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await axios.post('/api/auth/login/', {
        email: data.email,
        username: data.username,
        password: data.password,
      });
      return response.data;
    },
  });
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [generalError, setGeneralError] = React.useState<string | null>(null);
  const router = useRouter();
  const loginMutation = useLogin();

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setGeneralError(null);

    try {
      const result = await loginMutation.mutateAsync(data);
      console.log(result);

      // Redirect to dashboard on success
      router.push("/Dashboard/RefeeralDashboard/mainDashBoard");
    } catch (error: any) {
      console.error(error);
      const message =
        error?.response?.data?.detail ||
        error?.response?.data?.non_field_errors?.[0] ||
        "Login failed. Please try again.";
      setGeneralError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center h-screen">
      {/* Left Section */}
      <div className="hidden md:block relative md:w-1/2">
        <Image
          src="/assest/signinimage.png"
          alt="signin"
          fill
          style={{ objectFit: "cover" }}
          className="z-0"
        />
        <div className="absolute bottom-0 left-52 z-10">
          <Image
            src="/assest/signinHuman.png"
            width={320}
            height={320}
            className="w-80"
            alt="signin human"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 p-6 md:px-16 md:py-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Image src="/assest/logo.png" width={120} height={40} alt="ACES Logo" />
          </div>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-1">Welcome to ACES</h1>
            <p className="text-gray-500 text-base">Enter your email and password to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="user@example.com"
                className="w-full p-2.5 border border-gray-300 bg-white outline-none rounded-md focus:ring-blue-500 focus:border-blue-500"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="yourusername"
                className="w-full p-2.5 border border-gray-300 bg-white outline-none rounded-md focus:ring-blue-500 focus:border-blue-500"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full p-2.5 border bg-white outline-none border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 pr-10"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400"
                  tabIndex={-1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7
                      -1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 outline-none border-gray-300 rounded"
                  {...register("rememberMe")}
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm text-[#20b2aa] hover:text-teal-600">
                Forgot password?
              </Link>
            </div>

            {/* General Error */}
            {generalError && (
              <p className="text-center text-red-600 font-medium">{generalError}</p>
            )}

            <button
              type="button"
              className="w-full py-2.5 px-4 border border-[#FF6607] rounded-md font-semibold text-[#FF6607] transition-colors duration-300 hover:bg-red-800 hover:text-white"
            >
              Office 365
            </button>

            <p className="my-7 text-center">or with</p>

            <button
              type="submit"
              className="w-full bg-[#0a5596] hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
