import { User } from 'pages/project-list/search-panel'
import React, { ReactNode, useContext, useState } from 'react'
import { http } from 'utils/http'
import * as auth from '../auth-provider'
import { useMount } from '../../utils'

interface AuthForm {
  username: string;
  password: string;
}

interface AuthContextProps {
  user: User | null;
  register: (form: AuthForm) => Promise<void>;
  login: (form: AuthForm) => Promise<void>;
  logout: () => Promise<void>;
}

// 初始化用户，防止刷新又没了，除非登出
const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    // 使用app是因为我们想自己指定token
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

const AuthContext = React.createContext<AuthContextProps | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [ user, setUser ] = useState<User | null>(null)
  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))

  useMount(() => {
    bootstrapUser().then(setUser)
  })

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  )
}

//使用函数来取全局的context中的内容
export const useAuth = () => {
  // 用useContext 来使用Context  使用函数来取全局的context中的内容
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}
