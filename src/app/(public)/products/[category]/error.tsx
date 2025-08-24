'use client';

import { useEffect } from 'react';
import Container from '@/components/layout/container';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Products page error:', error);
  }, [error]);

  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <h2 className="text-2xl font-bold text-destructive mb-4">
          Something went wrong!
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          We encountered an error while loading the products. Please try again
          or contact support if the problem persists.
        </p>
        <div className="flex space-x-4">
          <Button onClick={reset} variant="default">
            Try again
          </Button>
          <Button onClick={() => window.history.back()} variant="outline">
            Go back
          </Button>
        </div>
      </div>
    </Container>
  );
}
