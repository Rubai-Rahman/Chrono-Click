"use client"; // This component uses client-side hooks

import React from "react";
import Link from "next/link";
import { useAuth } from "@/Contexts/AuthProvider/AuthProvider";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const {
    allContexts: { logOut, admin },
  } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="flex flex-col space-y-2">
          <Link href={`/dashboard/payment`} className="py-2 px-4 rounded hover:bg-gray-700">
            Pay
          </Link>
          <Link href={`/dashboard/myOrders`} className="py-2 px-4 rounded hover:bg-gray-700">
            My Order
          </Link>
          <Link href={`/dashboard/review`} className="py-2 px-4 rounded hover:bg-gray-700">
            Review
          </Link>
          {admin && (
            <>
              <Link href={`/dashboard/manageOrders`} className="py-2 px-4 rounded hover:bg-gray-700">
                Manage All Order
              </Link>
              <Link href={`/dashboard/makeAdmin`} className="py-2 px-4 rounded hover:bg-gray-700">
                Make Admin
              </Link>
              <Link href={`/dashboard/addProduct`} className="py-2 px-4 rounded hover:bg-gray-700">
                Add a Product
              </Link>
              <Link href={`/dashboard/manageProduct`} className="py-2 px-4 rounded hover:bg-gray-700">
                Manage Product
              </Link>
              <Link href={`/dashboard/addNews`} className="py-2 px-4 rounded hover:bg-gray-700">
                Add News
              </Link>
            </>
          )}
          <button onClick={logOut} className="py-2 px-4 rounded hover:bg-gray-700 text-left">
            Log out
          </button>
        </nav>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
