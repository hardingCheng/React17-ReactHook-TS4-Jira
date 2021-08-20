import React from 'react'
import './App.css'
import { useAuth } from './pages/context/auth-context'
import { AuthenticatedApp } from './pages/authenticated-app/authenticated-app'
import { UnauthenticatedApp } from './pages/unauthenticated-app'
import { ErrorBoundary } from 'components/error-boundary'
import { FullPageErrorFallback } from 'components/lib'

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {/*错误边界  fallbackRender遇到错误的时候需要渲染的UI FullPageErrorFallback*/ }
      <ErrorBoundary fallbackRender={ FullPageErrorFallback }>
        { user ? <AuthenticatedApp /> : <UnauthenticatedApp /> }
      </ErrorBoundary>
    </div>
  )
}

export default App
