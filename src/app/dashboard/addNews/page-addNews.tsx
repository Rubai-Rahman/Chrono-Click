"use client"; // This component uses client-side hooks

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNews } from "@/api-lib/news";

const AddNewsPageContent = () => {
  const [name, setName] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const addNewsMutation = useMutation({
    mutationFn: addNews,
    onSuccess: () => {
      setSuccess(true);
      setName(""); // Clear form fields
      setDetails("");
      queryClient.invalidateQueries({ queryKey: ["news"] }); // Invalidate news cache
      setTimeout(() => setSuccess(false), 3000); // Hide success message after 3 seconds
    },
    onError: (error) => {
      console.error("Error adding news:", error);
      // Handle error state, e.g., show an error message to the user
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNewsMutation.mutate({ name, details });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Add A News</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> News is Added Successfully</span>
          </div>
        )}
        <div>
          <label htmlFor="newsTitle" className="block text-gray-700 text-sm font-bold mb-2">
            News Title
          </label>
          <input
            type="text"
            id="newsTitle"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Add Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="newsDetails" className="block text-gray-700 text-sm font-bold mb-2">
            News Details
          </label>
          <textarea
            id="newsDetails"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            placeholder="Add Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add News
        </button>
      </form>
    </div>
  );
};

export default AddNewsPageContent;