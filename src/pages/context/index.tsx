import React, { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider } from './auth-context'

export const AppProviders = ( { children }: { children: ReactNode } ) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={ queryClient } contextSharing={ true }>
      <AuthProvider>{ children }</AuthProvider>
    </QueryClientProvider>

  )
}
