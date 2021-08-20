import { User } from 'pages/project-list/search-panel'
import { createSlice } from '@reduxjs/toolkit'
import { AuthForm,bootstrapUser } from '../pages/context/auth-context'
import { AppDispatch,RootState } from 'store'
import * as auth from '../pages/auth-provider'

interface State {
  user: User | null
}


const initialState: State = {
  user: null,
}

export const authSlice = createSlice( {
  name: 'authSlice',
  initialState,
  // @reduxjs/toolkit immmer
  reducers: {
    setUser( state,action ) {
      state.user = action.payload
    },
  },
} )

// react-thunk  全都是异步的 示例
// export default function addTodo(text) {
//   return dispatch=>{
//     console.log('dispatch=',dispatch)
//     setTimeout(
//       ()=>{
//         dispatch({ type: ADD_TODO, text })
//       },2000)
//   }
// }
const { setUser } = authSlice.actions
export const selectUser = ( state: RootState ) => state.auth.user
export const login = ( form: AuthForm ) => ( dispatch: AppDispatch ) => auth.login( form ).then( ( user ) => dispatch( setUser( user ) ) )
export const signup = ( form: AuthForm ) => ( dispatch: AppDispatch ) => auth.register( form ).then( ( user ) => dispatch( setUser( user ) ) )
export const logout = () => ( dispatch: AppDispatch ) => auth.logout().then( () => dispatch( setUser( null ) ) )
export const bootstrap = () => ( dispatch: AppDispatch ) => bootstrapUser().then( ( user ) => dispatch( setUser( user ) ) )
