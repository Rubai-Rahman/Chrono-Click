"use client"; // This component uses client-side hooks

import React from "react";
import { useRouter, usePathname } from "next/navigation"; // Import usePathname
import { useAuth } from "@/Contexts/AuthProvider/AuthProvider";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname(); // Get current path
  const {
    allContexts: { user, isLoading }, // Assuming isLoading is part of allContexts
  } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or a more sophisticated loading spinner
  }

  if (user?.email) {
    return <>{children}</>;
  }

  // Redirect to login if not authenticated
  router.push(`/login?from=${pathname}`); // Pass current path as query parameter
  return null; // Render nothing while redirecting
};

export default PrivateRoute;
