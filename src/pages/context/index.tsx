import React, { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider } from './auth-context'

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()} contextSharing={true}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>

  )
}
