import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const bookingAPI = createApi({
  reducerPath: 'bookingAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    newBooking: builder.mutation({
      query(body) {
        return {
          url: '/booking',
          method: 'POST',
          body,
        }
      },
    }),
  }),
})

export const { useNewBookingMutation } = bookingAPI
