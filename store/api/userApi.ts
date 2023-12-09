import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    updateProfile: builder.mutation({
      query(body) {
        return {
          url: '/me/update',
          method: 'PUT',
          body,
        }
      },
    }),
    updateSession: builder.query({
      query(body) {
        return {
          url: '/auth/session?update',
        }
      },
    }),
  }),
})

export const { useUpdateProfileMutation, useLazyUpdateSessionQuery } = userAPI
