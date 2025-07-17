"use client"; // This component uses client-side hooks

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeAdmin } from "@/api-lib/users";

const MakeAdminPageContent = () => {
  const [email, setEmail] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const makeAdminMutation = useMutation({
    mutationFn: makeAdmin,
    onSuccess: () => {
      setSuccess(true);
      setEmail(""); // Clear email field
      queryClient.invalidateQueries({ queryKey: ["users"] }); // Invalidate users cache if needed
      setTimeout(() => setSuccess(false), 3000); // Hide success message after 3 seconds
    },
    onError: (error) => {
      console.error("Error making admin:", error);
      // Handle error state, e.g., show an error message to the user
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    makeAdminMutation.mutate(email);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Make Admin</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="adminEmail" className="block text-gray-700 text-sm font-bold mb-2">
            Admin Email
          </label>
          <input
            type="email"
            id="adminEmail"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Add Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Make Admin
        </button>
      </form>
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Made Admin Successfully</span>
        </div>
      )}
    </div>
  );
};

export default MakeAdminPageContent;
