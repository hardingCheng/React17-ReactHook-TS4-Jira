import React, { FormEvent } from 'react'
import { useAuth } from '../context/auth-context'

export const Login = () => {
  const { login, user } = useAuth()
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const username = (document.getElementById('username') as HTMLInputElement)
      .value
    const password = (document.getElementById('password') as HTMLInputElement)
      .value
    login({ username, password })
  }
  return (
    <form onSubmit={handleSubmit}>
      登录界面
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" placeholder="" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" placeholder="" />
      </div>
      <button type="submit">登录</button>
    </form>
  )
}
