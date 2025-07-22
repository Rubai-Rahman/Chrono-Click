'use client';

import { useEffect } from 'react';

const ScrollRestoration = () => {
  useEffect(() => {
    // Restore scroll position to top on page load/refresh
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
};

export default ScrollRestoration;
