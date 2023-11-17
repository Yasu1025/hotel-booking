import { NextRequest, NextResponse } from 'next/server'
import Room from '../models/room'

export const allRooms = async () => {
  const resPerPage = 8

  const rooms = await Room.find()

  return NextResponse.json({
    success: true,
    resPerPage,
    rooms,
  })
}

export const newRoom = async (req: NextRequest) => {
  const body = await req.json()
  const room = await Room.create(body)

  return NextResponse.json({
    success: true,
    room,
  })
}

export const getRoomDetail = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params
  const room = await Room.findById(id)

  if (!room) {
    return NextResponse.json(
      {
        message: 'Room not found',
      },
      { status: 404 }
    )
  }

  return NextResponse.json({
    success: true,
    room,
  })
}
