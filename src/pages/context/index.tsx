import React, { ReactNode } from 'react'
import { AuthProvider } from './auth-context'

export const AuthProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>
}
