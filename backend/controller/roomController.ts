import { catchAsyncErrors } from './../middlewares/catchAsyncError'
import { NextRequest, NextResponse } from 'next/server'
import Room from '../models/room'
import ErrorHandler from '../utils/errorHandler'

// GET /api/rooms
export const getAllRooms = catchAsyncErrors(async () => {
  const resPerPage = 8

  const rooms = await Room.find()

  return NextResponse.json({
    success: true,
    resPerPage,
    rooms,
  })
})

// POST /api/rooms
export const createNewRoom = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json()
  const room = await Room.create(body)

  return NextResponse.json({
    success: true,
    room,
  })
})

// GET /api/rooms/:id
export const getRoomDetail = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params
    const room = await Room.findById(id)

    if (!room) {
      throw new ErrorHandler('Room not found', 404)
    }

    return NextResponse.json({
      success: true,
      room,
    })
  }
)

// PUT /api/admin/rooms/:id
export const updateRoomDetail = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params
    const body = await req.json()
    let room = await Room.findById(id)

    if (!room) {
      throw new ErrorHandler('Room not found', 404)
    }

    room = await Room.findByIdAndUpdate(id, body, {
      new: true,
    })

    return NextResponse.json({
      success: true,
      room,
    })
  }
)

// DELETE /api/admin/rooms/:id
export const deleteRoom = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params
    const room = await Room.findById(id)

    if (!room) {
      throw new ErrorHandler('Room not found', 404)
    }

    await Room.findOneAndDelete()

    return NextResponse.json({
      success: true,
      room,
    })
  }
)
