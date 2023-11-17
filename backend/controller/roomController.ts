import { IRoom } from './../models/room'
import { catchAsyncErrors } from './../middlewares/catchAsyncError'
import { NextRequest, NextResponse } from 'next/server'
import Room from '../models/room'
import ErrorHandler from '../utils/errorHandler'
import APIFilter from '../utils/APIFilter'

// GET /api/rooms
export const getAllRooms = catchAsyncErrors(async (req: NextRequest) => {
  const resPerPage = 8

  // For filtering with URL params
  const { searchParams } = new URL(req.url)
  const queryStr: any = {}
  searchParams.forEach((val, key) => {
    queryStr[key] = val
  })
  const apiFilter = new APIFilter(Room, queryStr).search().filter()

  let rooms: IRoom[] = await apiFilter.query
  // room Total
  const roomsTotal: number = await Room.countDocuments()
  const filteredRoomsTotal: number = rooms.length

  // For Pagination. Get rooms per resPerPage
  apiFilter.pagination(resPerPage)
  rooms = await apiFilter.query

  return NextResponse.json({
    success: true,
    roomsTotal,
    filteredRoomsTotal,
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
