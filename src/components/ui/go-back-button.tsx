'use client';

import { ArrowLeft } from 'lucide-react';

const GoBackButton = () => {
  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <button
      onClick={handleGoBack}
      className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
    >
      <ArrowLeft className="h-4 w-4" />
      Go Back
    </button>
  );
};

export default GoBackButton;
