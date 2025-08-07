import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { HydrateAuth } from '@/components/providers/hydrate-auth';
import { QueryProvider } from '@/components/providers/query-provider';
import { getSession } from '@/lib/session';

export default async function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <HydrateAuth session={session}>
          {children}
          <Toaster />
        </HydrateAuth>
      </ThemeProvider>
    </QueryProvider>
  );
}
