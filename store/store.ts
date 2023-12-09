import { authAPI } from './api/authApi'
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import userSlice from './feature/userSlice'
import { userAPI } from './api/userApi'

export const store = configureStore({
  reducer: {
    auth: userSlice,
    [authAPI.reducerPath]: authAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([authAPI.middleware, userAPI.middleware]),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
