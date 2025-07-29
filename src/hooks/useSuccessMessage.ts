import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for handling success messages with automatic cleanup
 * @param duration - Duration in milliseconds before hiding the message (default: 3000)
 * @returns [showSuccess, setShowSuccess] - State and setter for success message
 */
export const useSuccessMessage = (duration: number = 3000) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerSuccess = () => {
    setShowSuccess(true);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      setShowSuccess(false);
    }, duration);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return [showSuccess, triggerSuccess] as const;
};
