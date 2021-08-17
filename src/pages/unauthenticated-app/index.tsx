import React, { useState } from 'react'
import { Login } from './login'
import { Signup } from './signup'

export const UnauthenticatedApp = () => {
  // 用来切换登录注册状态的
  const [isRegister, setIsRegister] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  return (
    <div>
      {isRegister ? <Login /> : <Signup />}
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? '切换到注册' : '切换到登录'}
      </button>
    </div>
  )
}
