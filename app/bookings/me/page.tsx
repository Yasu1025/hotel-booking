import Error from '@/app/error'
import MyBookings from '@/components/booking/MyBookings'
import React from 'react'

export const metadata = {
  title: 'My bookings - Hotel Booking',
}

const getBookings = async () => {
  const res = await fetch(`${process.env.API_BASE}/api/booking/me`, {
    cache: 'no-cache',
    headers: {
      Cookie:
        'next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0.._Dv_u2yexRo3CPT5.BVGpBlYeQ_aAPEk1AahOZMib5m2Mandsb-VuQ8dpJWy3tPOVyp_Omi6dmAVWmJVG46lebkLnlTIjaLL7SYoHhFWtZWH95t9EnbvkoeozKRDhuj9cEJgznCoOivZ1jYpk5OTTTghruyrN93DEPGpRE3cEGivaM5Vcqp0kw_HDkrUKQWn1oVklV8A_9tcKmVZUbvLGnG12LRjw8tMNAFyP0fi6vhTtZIofX0XE8uih3HU63NXZFBV8my6X-aHIMUY9xKqN5SH7OMhggzfWgJsiozWjwpz0WIXPOjTUwyurGXBx9LRadFZ21PHW-yV7HawYKffwaruiQzogg0TIWDgAqGEqdmWFkRsU4CmpZ73dwmbVGfRvM8SIYZ6UclbbjskBUSFINsm4YmwNcA_Nrn18toK1KUeyUxjVSi4hSqtGqrxKQtLcZFy1qQJW9jGw0M_fy-PRL9_Jwx5wx7_wNBiGJC-7p2gAd5FlpQ7SwKBEC0QnPEzGeD39JQc1ldFsLlEnsTSAhNVF3RGN1WgS15EQ3gY1chVlraaya6kq1kbEGqKTclUiXb8gfn_ptz529rxQIkXPeukbd3j1EhaHtVVqA1a172JACiKtqhjzIQW0cnn7TiSY2e4Xg5I.ncL1vjbFupP5wNPTXTz14A',
    },
  })

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
