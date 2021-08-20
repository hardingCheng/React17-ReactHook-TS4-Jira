import { configureStore } from '@reduxjs/toolkit'
import { projectListSlice } from './project.slice'
import { authSlice } from './auth.alice'

export const rootReducer = {
  projectList: projectListSlice.reducer,
  auth: authSlice.reducer,
}

export const store = configureStore( {
  reducer: rootReducer,
} )

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
