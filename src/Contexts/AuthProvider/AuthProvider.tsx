"use client";

import React, { createContext, useState, ReactNode } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  loginUser,
  registerUser,
  googleSignIn,
  logoutUser,
  User,
  AuthResponse,
} from "@/api-lib/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => void;
  register: (email: string, password: string, name: string) => void;
  googleLogin: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const loginMutation = useMutation<AuthResponse, Error, { email: string; password: string }>({
    mutationFn: ({ email, password }) => loginUser(email, password),
    onSuccess: (data) => {
      if (data.user) {
        setUser(data.user);
        setError(null);
        router.push("/dashboard");
      } else if (data.error) {
        setError(data.error);
      }
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const registerMutation = useMutation<AuthResponse, Error, { email: string; password: string; name: string }>({
    mutationFn: ({ email, password, name }) => registerUser(email, password, name),
    onSuccess: (data) => {
      if (data.user) {
        setUser(data.user);
        setError(null);
        router.push("/dashboard");
      } else if (data.error) {
        setError(data.error);
      }
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const googleSignInMutation = useMutation<AuthResponse, Error, void>({
    mutationFn: googleSignIn,
    onSuccess: (data) => {
      if (data.user) {
        setUser(data.user);
        setError(null);
        router.push("/dashboard");
      } else if (data.error) {
        setError(data.error);
      }
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const logoutMutation = useMutation<void, Error, void>({
    mutationFn: logoutUser,
    onSuccess: () => {
      setUser(null);
      setError(null);
      router.push("/login");
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const value = {
    user,
    isLoading: loginMutation.isPending || registerMutation.isPending || googleSignInMutation.isPending || logoutMutation.isPending,
    error,
    login: (email, password) => {
      loginMutation.mutate({ email, password });
    },
    register: (email, password, name) => {
      registerMutation.mutate({ email, password, name });
    },
    googleLogin: () => {
      googleSignInMutation.mutate();
    },
    logout: () => {
      logoutMutation.mutate();
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};