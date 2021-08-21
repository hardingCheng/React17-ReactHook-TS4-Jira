import React from 'react'
import './App.css'
import { useAuth } from './pages/context/auth-context'
// import { AuthenticatedApp } from './pages/authenticated-app/authenticated-app'
// import { UnauthenticatedApp } from './pages/unauthenticated-app'
import { ErrorBoundary } from 'components/error-boundary'
import { FullPageErrorFallback, FullPageLoading } from 'components/lib'

// React
// 代码分割
// React.lazy 函数能让你像渲染常规组件一样处理动态引入（的组件）。
const AuthenticatedApp = React.lazy( () => import('pages/authenticated-app/authenticated-app') )
const UnauthenticatedApp = React.lazy( () => import('pages/unauthenticated-app/index' ) )

/**
 React.lazy 接受一个函数，这个函数需要动态调用 import()。它必须返回一个 Promise，该 Promise 需要 resolve 一个 default export 的 React 组件。
 然后应在 Suspense 组件中渲染 lazy 组件，如此使得我们可以使用在等待加载 lazy 组件时做优雅降级（如 loading 指示器等）。
 */
function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {/*错误边界  fallbackRender遇到错误的时候需要渲染的UI FullPageErrorFallback*/ }
      <ErrorBoundary fallbackRender={ FullPageErrorFallback }>
        <React.Suspense fallback={ <FullPageLoading /> }>
          { user ? <AuthenticatedApp /> : <UnauthenticatedApp /> }
        </React.Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default App
