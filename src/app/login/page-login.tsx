"use client"; // This component uses client-side hooks

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/Contexts/AuthProvider/AuthProvider"; // Updated import path
import { Spinner } from "@/components/ui/spinner"; // Placeholder for Shadcn UI Spinner

const LoginPageContent = () => {
  const {
    login, googleLogin, isLoading
  } = useAuth();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name;
    const value = e.target.value;
    setLoginData({ ...loginData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(loginData.email, loginData.password, router); // Updated call
  };

  const handleGoogleSignIn = (e: React.MouseEvent) => {
    e.preventDefault();
    googleLogin(router); // Updated call
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-center text-2xl font-bold mb-6">Log In</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            name="email"
            type="email"
            id="defaultLoginFormEmail"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="E-mail"
            onBlur={handleOnChange}
            required
          />

          <input
            name="password"
            type="password"
            id="defaultLoginFormPassword"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            onBlur={handleOnChange}
            required
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {isLoading ? <Spinner size="sm" /> : "Log In"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          New Member?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>

        <button
          className="w-full mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 flex items-center justify-center space-x-2"
          type="button" // Changed to button type
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        >
          {/* Placeholder for Google Icon */}
          <span>G</span> <span>Google SignIn</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPageContent;