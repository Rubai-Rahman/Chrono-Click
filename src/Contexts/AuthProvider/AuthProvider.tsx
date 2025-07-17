"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { useMutation } from "@tanstack/react-query";
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
  login: (email: string, password: string, router: any) => void;
  register: (email: string, password: string, name: string, router: any) => void;
  googleLogin: (router: any) => void;
  logout: (router: any) => void;
  state: { cart: any[] }; // Placeholder for cart state
  dispatch: (action: any) => void; // Placeholder for cart dispatch
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  // Placeholder for cart state and dispatch
  const [cart, setCart] = useState<any[]>([]);
  const dispatch = (action: any) => {
    switch (action.type) {
      case "ADD_TO_CART":
        setCart((prevCart) => [...prevCart, action.payload]);
        break;
      case "REMOVE_FROM_CART":
        setCart((prevCart) =>
          prevCart.filter((item) => item._id !== action.payload._id)
        );
        break;
      case "INCREASE_CART_QTY":
        setCart((prevCart) =>
          prevCart.map((item) =>
            item._id === action.payload._id
              ? { ...item, qty: item.qty + 1 }
              : item
          )
        );
        break;
      case "DECREASE_CART_QTY":
        setCart((prevCart) =>
          prevCart.map((item) =>
            item._id === action.payload._id
              ? { ...item, qty: item.qty - 1 }
              : item
          )
        );
        break;
      case "CLEAR_CART":
        setCart([]);
        break;
      default:
        break;
    }
  };

  const loginMutation = useMutation<AuthResponse, Error, { email: string; password: string }>(
    {mutationFn: ({ email, password }) => loginUser(email, password),
    onSuccess: (data) => {
      if (data.user) {
        setUser(data.user);
        setError(null);
        router.push("/dashboard"); // Redirect on successful login
      } else if (data.error) {
        setError(data.error);
      }
    },
    onError: (err) => {
      setError(err.message);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const registerMutation = useMutation<AuthResponse, Error, { email: string; password: string; name: string }>(
    {mutationFn: ({ email, password, name }) => registerUser(email, password, name),
    onSuccess: (data) => {
      if (data.user) {
        setUser(data.user);
        setError(null);
        router.push("/dashboard"); // Redirect on successful registration
      } else if (data.error) {
        setError(data.error);
      }
    },
    onError: (err) => {
      setError(err.message);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const googleSignInMutation = useMutation<AuthResponse, Error, void>(
    {mutationFn: googleSignIn,
    onSuccess: (data) => {
      if (data.user) {
        setUser(data.user);
        setError(null);
        router.push("/dashboard"); // Redirect on successful Google sign-in
      } else if (data.error) {
        setError(data.error);
      }
    },
    onError: (err) => {
      setError(err.message);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const logoutMutation = useMutation<void, Error, void>(
    {mutationFn: logoutUser,
    onSuccess: () => {
      setUser(null);
      setError(null);
      router.push("/login"); // Redirect to login after logout
    },
    onError: (err) => {
      setError(err.message);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const value = {
    user,
    isLoading: loginMutation.isPending || registerMutation.isPending || googleSignInMutation.isPending || logoutMutation.isPending,
    error,
    login: (email, password) => {
      setIsLoading(true);
      loginMutation.mutate({ email, password });
    },
    register: (email, password, name) => {
      setIsLoading(true);
      registerMutation.mutate({ email, password, name });
    },
    googleLogin: () => {
      setIsLoading(true);
      googleSignInMutation.mutate();
    },
    logout: () => {
      setIsLoading(true);
      logoutMutation.mutate();
    },
    state: { cart },
    dispatch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
