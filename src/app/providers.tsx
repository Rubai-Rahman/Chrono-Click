import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { HydrateAuth } from '@/components/providers/hydrate-auth';
import { QueryProvider } from '@/components/providers/query-provider';

export default async function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <HydrateAuth>
          {children}
          <Toaster />
        </HydrateAuth>
      </ThemeProvider>
    </QueryProvider>
  );
}
