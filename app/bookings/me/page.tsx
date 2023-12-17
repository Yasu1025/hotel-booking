import Error from '@/app/error'
import MyBookings from '@/components/booking/MyBookings'
import { getAuthHeader } from '@/helpers/authHelper'
import React from 'react'

export const metadata = {
  title: 'My bookings - Hotel Booking',
}

const getBookings = async () => {
  const authHeader = getAuthHeader()
  const res = await fetch(`${process.env.API_BASE}/api/booking/me`, authHeader)

  return res.json()
}

export default async function MyBookingsPage() {
  const data = await getBookings()
  if (data?.errMessage) {
    // Handle error
    return <Error error={data} />
  }

  return <MyBookings data={data} />
}
