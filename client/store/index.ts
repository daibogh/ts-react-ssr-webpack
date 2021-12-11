import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './slices/counter'
export function createStore(initialState?: any) {
  return configureStore({
    reducer: counterSlice.reducer,
    preloadedState: initialState,
  })
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ReturnType<typeof createStore>['dispatch']
