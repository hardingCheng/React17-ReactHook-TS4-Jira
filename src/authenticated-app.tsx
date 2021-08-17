import { ProjectListScreen } from 'pages/project-list'
import React from 'react'
import { useAuth } from './pages/context/auth-context'

export const AuthenticatedApp = () => {
  const { logout } = useAuth()
  return (
    <div>
      <button onClick={logout}>登出</button>
      <ProjectListScreen />
    </div>
  )
}
