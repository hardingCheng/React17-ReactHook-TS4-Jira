import React, { useState } from 'react'
import { Login } from './login'
import { Signup } from './signup'
import { Card } from 'antd'

export const UnauthenticatedApp = () => {
  // 用来切换登录注册状态的
  const [ isRegister, setIsRegister ] = useState(true)
  const [ error, setError ] = useState<Error | null>(null)

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card>
        {isRegister ? <Login /> : <Signup />}
        <button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? '切换到注册' : '切换到登录'}
        </button>
      </Card>
    </div>
  )
}
