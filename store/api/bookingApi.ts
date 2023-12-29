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
    checkAvailability: builder.query({
      query({ id, checkInDate, checkOutDate }) {
        return {
          url: `/booking/check_availability?roomId=${id}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`,
        }
      },
    }),
    getBookedDates: builder.query({
      query(id) {
        return {
          url: `/booking/booked_dates?roomId=${id}`,
        }
      },
    }),
    getSalesStats: builder.query({
      query({ startDate, endDate }) {
        return {
          url: `/admin/sales_stats?startDate=${startDate}&endDate=${endDate}`,
        }
      },
    }),
  }),
})

export const {
  useNewBookingMutation,
  useLazyCheckAvailabilityQuery,
  useGetBookedDatesQuery,
  useLazyGetSalesStatsQuery,
} = bookingAPI
