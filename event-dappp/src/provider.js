'use client';
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Prevents immediate refetching on client after SSR
        staleTime: 60 * 1000, // 1 minute
      },
    },
  })
}

let browserQueryClient = undefined

function getQueryClient() {
  if (isServer) {
    // Server: always create a new client for each request
    return makeQueryClient()
  } else {
    // Browser: reuse the same client to avoid React Suspense issues
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export default function GraphProviders({ children }) {
  const queryClient = getQueryClient()
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}