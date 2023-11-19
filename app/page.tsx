import Home from '@/components/Home'
import Error from './error'

export const metadata = {
  title: 'Home - Hotel Booking',
}

export const dynamic = 'force-dynamic'
const getRooms = async (searchParams: string) => {
  const urlParams = new URLSearchParams(searchParams)
  const queryStr = urlParams.toString()
  const res = await fetch(`${process.env.API_BASE}/api/rooms?${queryStr}`)
  return res.json()
}

export default async function HomePage({ searchParams }: { searchParams: string }) {
  const data = await getRooms(searchParams)
  if (data?.massage) {
    // Handle error
    return <Error error={data} />
  }

  return <Home data={data} />
}
