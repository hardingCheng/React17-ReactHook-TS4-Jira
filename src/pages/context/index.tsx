import React, { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './auth-context'

export const AppProviders = ( { children }: { children: ReactNode } ) => {
  const queryClient = new QueryClient( {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  } )
  return (
    <QueryClientProvider client={ queryClient } contextSharing={ true }>
      <Router>
        <AuthProvider>{ children }</AuthProvider>
      </Router>
    </QueryClientProvider>

  )
}
