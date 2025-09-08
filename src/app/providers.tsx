import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { HydrateAuth } from '@/components/providers/hydrate-auth';
import { QueryProvider } from '@/components/providers/query-provider';
import { GoogleOAuthProvider } from '@react-oauth/google';

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
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <HydrateAuth>
            {children}
            <Toaster />
          </HydrateAuth>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
