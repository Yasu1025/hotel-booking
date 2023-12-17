import Error from '@/app/error'
import Invoice from '@/components/invoice/Invoice'
import { getAuthHeader } from '@/helpers/authHelper'
import React from 'react'

export const metadata = {
  title: 'My bookings - Hotel Booking',
}

const getBooking = async (id: string) => {
  const authHeader = getAuthHeader()

  const res = await fetch(`${process.env.API_BASE}/api/booking/${id}`, authHeader)
  return res.json()
}

export default async function InvoicePage({ params }: { params: { id: string } }) {
  const data = await getBooking(params.id)
  if (data?.errMessage) {
    // Handle error
    return <Error error={data} />
  }

  return <Invoice data={data} />
}
