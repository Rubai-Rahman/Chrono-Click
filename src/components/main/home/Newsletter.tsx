'use client';
import React, { useState } from 'react';

const Newsletter = () => {
  const [alert, setAlert] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(true);

    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };

  return (
    <div className="bg-gray-900 text-white py-16 px-4 text-center">
      {alert && (
        <div className="bg-blue-500 text-white p-3 rounded-md mb-4">
          Thank You For Subscribe
        </div>
      )}

      <div classNameName="container mx-auto">
        <div className="text-center mb-8">
          <h6 className="text-sm uppercase tracking-wider text-gray-400">
            SUBSCRIBE TO THE MAILING LIST
          </h6>
          <h3 className="text-3xl font-bold">Newsletter</h3>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4"
        >
          <input
            type="email"
            placeholder="Your email address"
            className="p-3 rounded-md w-full md:w-1/3 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
