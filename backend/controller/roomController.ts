import { NextRequest, NextResponse } from 'next/server'
import Room from '../models/room'

// GET /api/rooms
export const allRooms = async () => {
  const resPerPage = 8

  const rooms = await Room.find()

  return NextResponse.json({
    success: true,
    resPerPage,
    rooms,
  })
}

// POST /api/rooms
export const newRoom = async (req: NextRequest) => {
  const body = await req.json()
  const room = await Room.create(body)

  return NextResponse.json({
    success: true,
    room,
  })
}

// GET /api/rooms/:id
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

// PUT /api/admin/rooms/:id
export const updateRoomDetail = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params
  const body = await req.json()
  let room = await Room.findById(id)

  if (!room) {
    return NextResponse.json(
      {
        message: 'Room not found..',
      },
      { status: 404 }
    )
  }

  room = await Room.findByIdAndUpdate(id, body, {
    new: true,
  })

  return NextResponse.json({
    success: true,
    room,
  })
}

// DELETE /api/admin/rooms/:id
export const deleteRoom = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params
  const room = await Room.findById(id)

  if (!room) {
    return NextResponse.json(
      {
        message: 'Room not found..',
      },
      { status: 404 }
    )
  }

  await Room.findOneAndDelete()

  return NextResponse.json({
    success: true,
    room,
  })
}
