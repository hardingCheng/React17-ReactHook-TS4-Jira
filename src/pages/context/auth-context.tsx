import { User } from 'pages/project-list/search-panel'
import React,{ ReactNode,useCallback } from 'react'
import { http } from 'utils/http'
import * as auth from '../auth-provider'
import { useMount } from '../../utils'
import { useAsync } from '../../utils/use-async'
import { FullPageErrorFallback,FullPageLoading } from 'components/lib'
import { useDispatch } from 'react-redux'
import * as  authStore from '../../store/auth.alice'
import { useSelector } from '../../store/hook'

export interface AuthForm {
  username: string;
  password: string;
}

interface AuthContextProps {
  user: User | null;
  register: ( form: AuthForm ) => Promise<void>;
  login: ( form: AuthForm ) => Promise<void>;
  logout: () => Promise<void>;
}

// 初始化用户，防止刷新又没了，除非登出
export const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if ( token ) {
    // 使用app是因为我们想自己指定token
    const data = await http( 'me',{ token } )
    user = data.user
  }
  return user
}

// const AuthContext = React.createContext<AuthContextProps | undefined>( undefined )
// AuthContext.displayName = 'AuthContext'

export const AuthProvider = ( { children }: { children: ReactNode } ) => {
  // 注意传递的 参数类型
  const {
    run,
    error,
    isLoading,
    isError,
    isIdle,
  } = useAsync<User | null>()
  // const login = ( form: AuthForm ) => auth.login( form ).then( setUser )
  // const register = ( form: AuthForm ) => auth.register( form ).then( setUser )
  // const logout = () => auth.logout().then( () => setUser( null ) )
  const dispatch: ( ...args: unknown[] ) => Promise<User> = useDispatch()


  useMount( () => {
    run( dispatch( authStore.bootstrap() ) )
  } )

  // 只要return了  下面都不返回
  if ( isIdle || isLoading ) {
    return <FullPageLoading />
  }
  if ( isError ) {
    return <FullPageErrorFallback error={ error } />
  }

  // return (
  //   <AuthContext.Provider
  //     children={ children }
  //     value={ { user,login,register,logout } }
  //   />
  // )
  return <div>
    { children }
  </div>
}

//使用函数来取全局的context中的内容
export const useAuth = () => {
  // 用useContext 来使用Context  使用函数来取全局的context中的内容
  // const context = useContext( AuthContext )
  // if ( !context ) {
  //   throw new Error( 'useAuth必须在AuthProvider中使用' )
  // }
  // 触发派发事件 react-thunk  都是异步的
  const dispatch: ( ...args: unknown[] ) => Promise<User> = useDispatch()
  const login = useCallback( ( form: AuthForm ) => dispatch( authStore.login( form ) ),[ dispatch ] )
  const register = useCallback( ( form: AuthForm ) => dispatch( authStore.signup( form ) ),[ dispatch ] )
  const logout = useCallback( () => dispatch( authStore.logout() ),[ dispatch ] )
  // 获取state的值
  const user = useSelector( authStore.selectUser )
  return { user,login,register,logout }
}
