import { useEffect, useState } from 'react';

/**
 * Custom hook to handle hydration mismatch issues
 * Returns true only after the component has mounted on the client
 */
export const useHydration = (): boolean => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
};
