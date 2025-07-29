'use client';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/components/providers/auth-provider';
import {
  DefaultError,
  isServer,
  Mutation,
  MutationCache,
  Query,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const onGlobalQueryError = (
  error: DefaultError,
  query: Query<unknown, unknown, unknown>
) => {
  if (error instanceof Error) {
    console.error(
      'Global: Query failed:',
      '\nName:',
      error.name,
      '\nCause:',
      error.cause,
      '\nMessage:',
      error.message,
      '\nQuery:',
      query
    );
  } else {
    console.error('Global: Unknown query error', error);
  }
};

const onGlobalMutationError = (
  error: DefaultError,
  mutation: Mutation<unknown, unknown, unknown>,
  variables: unknown
) => {
  if (error instanceof Error) {
    console.error(
      'Global: Mutation failed:',
      '\nName:',
      error.name,
      '\nCause:',
      error.cause,
      '\nMessage:',
      error.message,
      '\nMutation:',
      mutation,
      '\nVariables:',
      variables
    );
  } else {
    console.error('Global: Unknown mutation error', error);
  }
};

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
    queryCache: new QueryCache({ onError: onGlobalQueryError }),
    mutationCache: new MutationCache({
      onError: (error, variables, _, mutation) =>
        onGlobalMutationError(error, mutation, variables),
    }),
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
    </QueryClientProvider>
  );
}
