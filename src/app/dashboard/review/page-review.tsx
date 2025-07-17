"use client"; // This component uses client-side hooks

import React, { useState } from "react";
import { useAuth } from "@/Contexts/AuthProvider/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReview } from "@/api-lib/testimonials";

const ReviewPageContent = () => {
  const {
    user,
  } = useAuth();
  const [reviewText, setReviewText] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const addReviewMutation = useMutation({
    mutationFn: addReview,
    onSuccess: () => {
      setSuccess(true);
      setReviewText(""); // Clear review text
      queryClient.invalidateQueries({ queryKey: ["testimonials"] }); // Invalidate testimonials cache
      setTimeout(() => setSuccess(false), 3000); // Hide success message after 3 seconds
    },
    onError: (error) => {
      console.error("Error adding review:", error);
      // Handle error state, e.g., show an error message to the user
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const reviewData = {
      review: reviewText,
      name: user?.displayName || "Anonymous", // Use optional chaining and fallback
    };

    addReviewMutation.mutate(reviewData);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Add A Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Review is Added Successfully</span>
          </div>
        )}
        <div>
          <label htmlFor="reviewText" className="block text-gray-700 text-sm font-bold mb-2">
            Your Review
          </label>
          <textarea
            id="reviewText"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-48"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Review
        </button>
      </form>
    </div>
  );
};

export default ReviewPageContent;