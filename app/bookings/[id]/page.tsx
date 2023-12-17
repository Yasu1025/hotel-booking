import Error from '@/app/error'
import BookingDetails from '@/components/booking/BookingDetails'
import { getAuthHeader } from '@/helpers/authHelper'

export const metadata = {
  title: 'My Bookings Details',
}

const getBooking = async (id: string) => {
  const authHeader = getAuthHeader()

  const res = await fetch(`${process.env.API_BASE}/api/booking/${id}`, authHeader)
  return res.json()
}

export default async function MyBookingsPage({ params }: { params: { id: string } }) {
  const data = await getBooking(params?.id)
  console.log('data', data)

  if (data?.errMessage) {
    return <Error error={data} />
  }

  return <BookingDetails data={data} />
}
