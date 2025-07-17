"use client"; // This component uses client-side hooks

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Contexts/AuthProvider/AuthProvider";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const router = useRouter();
  const {
    allContexts: { user, admin, isLoading }, // Assuming isLoading is part of allContexts
  } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or a more sophisticated loading spinner
  }

  if (user?.email && admin) {
    return <>{children}</>;
  }

  // Redirect to login if not authenticated or not an admin
  router.push("/login");
  return null; // Render nothing while redirecting
};

export default AdminRoute;
