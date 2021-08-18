import React from 'react'
import './App.css'
import { useAuth } from './pages/context/auth-context'
import { AuthenticatedApp } from './pages/authenticated-app/authenticated-app'
import { UnauthenticatedApp } from './pages/unauthenticated-app'

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {
        // 根据User来判断  是什么样类型的App
        user ? <AuthenticatedApp /> : <UnauthenticatedApp />
      }
    </div>
  )
}

export default App
