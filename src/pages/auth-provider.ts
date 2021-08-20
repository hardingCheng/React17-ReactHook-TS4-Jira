// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发
// 模拟第三方服务的 auth-provider
import { User } from './project-list/search-panel'

const apiUrl = process.env.REACT_APP_API_URL

const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem( localStorageKey )

export const handleUserResponse = ( { user }: { user: User } ) => {
  window.localStorage.setItem( localStorageKey,user.token || '' )
  return user
}

// 处理登录
export const login = ( data: { username: string;password: string } ) => {
  return fetch( `${ apiUrl }/login`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify( data ),
  } ).then( async response => {
    // 正确不正确都要处理
    if ( response.ok ) {
      return handleUserResponse( await response.json() )
    } else {
      return Promise.reject( await response.json() )
    }
  } )
}

// 处理注册
export const register = ( data: { username: string;password: string } ) => {
  return fetch( `${ apiUrl }/register`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify( data ),
  } ).then( async response => {
    // 正确不正确都要处理
    if ( response.ok ) {
      return handleUserResponse( await response.json() )
    } else {
      return Promise.reject( await response.json() )
    }
  } )
}

// 处理登出
export const logout = async () =>
  window.localStorage.removeItem( localStorageKey )
