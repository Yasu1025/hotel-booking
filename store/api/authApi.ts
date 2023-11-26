import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    register: builder.mutation({
      query(body) {
        return {
          url: '/auth/register',
          method: 'POST',
          body,
        }
      },
    }),
  }),
})

export const { useRegisterMutation } = authAPI
