import React, { FormEvent } from 'react'
import { useAuth } from '../context/auth-context'

export const Signup = () => {
  const { register, user } = useAuth()
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const username = (document.getElementById('username') as HTMLInputElement)
      .value
    const password = (document.getElementById('password') as HTMLInputElement)
      .value
    register({ username, password })
  }
  return (
    <form onSubmit={handleSubmit}>
      注册界面
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" placeholder="" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" placeholder="" />
      </div>
      <button type="submit">注册</button>
    </form>
  )
}
