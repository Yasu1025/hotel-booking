import Error from '@/app/error'
import RoomDetails from '@/components/room/RoomDetails'

interface IProos {
  params: { id: string }
}

const getRoom = async (id: string) => {
  const res = await fetch(`${process.env.API_BASE}/api/rooms/${id}`)
  return res.json()
}

export default async function RoomDetailPage({ params }: IProos) {
  const { id } = params
  const data = await getRoom(id)
  if (data?.massage) {
    // Handle error
    return <Error error={data} />
  }

  return <RoomDetails room={data.room} />
}

export async function generateMetadata({ params }: IProos) {
  const { id } = params
  const data = await getRoom(id)
  return {
    title: `${data.room.name} - Hotel Booking`,
  }
}
