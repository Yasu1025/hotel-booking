import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const roomAPI = createApi({
  reducerPath: 'roomAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    postReview: builder.mutation({
      query(body) {
        return {
          url: '/reviews',
          method: 'PUT',
          body,
        }
      },
    }),
    canUserReview: builder.query({
      query(id) {
        return {
          url: '/reviews/can_review',
          method: 'GET',
        }
      },
    }),
  }),
})

export const { usePostReviewMutation, useCanUserReviewQuery } = roomAPI
