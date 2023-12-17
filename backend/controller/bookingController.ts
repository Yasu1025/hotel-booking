import Moment from 'moment'
import { extendMoment } from 'moment-range'
import { NextRequest, NextResponse } from 'next/server'
import Booking, { IBooking } from '../models/booking'
import ErrorHandler from '../utils/errorHandler'
import { catchAsyncErrors } from './../middlewares/catchAsyncError'

const moment = extendMoment(Moment)

// Create new Booking   =>  /api/booking
export const newBooking = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json()

  const { room, checkInDate, checkOutDate, daysOfStay, amountPaid, paymentInfo } = body

  const booking = await Booking.create({
    room,
    user: req.user._id,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
    paidAt: Date.now(),
  })

  return NextResponse.json({
    booking,
  })
})

// check room Booking availability   =>  /api/booking/check
export const checkRoomBookingAvailability = catchAsyncErrors(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const roomId = searchParams.get('roomId')

  const checkInDate: Date = new Date(searchParams.get('checkInDate') as string)
  const checkOutDate: Date = new Date(searchParams.get('checkOutDate') as string)

  const bookings: IBooking[] = await Booking.find({
    room: roomId,
    $and: [
      { checkInDate: { $lte: checkOutDate } },
      { checkOutDate: { $gte: checkInDate } },
    ],
  })

  const isAvailable: boolean = bookings.length === 0

  return NextResponse.json({
    isAvailable,
  })
})

// check room Booked Date   =>  /api/booking/get_booked_dates
export const getBookedDates = catchAsyncErrors(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const roomId = searchParams.get('roomId')

  const bookings = await Booking.find({ room: roomId })

  const bookedDates = bookings.flatMap(booking =>
    Array.from(
      moment.range(moment(booking.checkInDate), moment(booking.checkOutDate)).by('day')
    )
  )

  return NextResponse.json({
    bookedDates,
  })
})

// get my booking   =>  /api/booking/me
export const getMyBooking = catchAsyncErrors(async (req: NextRequest) => {
  const bookings = await Booking.find({ user: req.user._id })
  return NextResponse.json({
    bookings,
  })
})

// get Booking details   =>  /api/booking/:id
export const getBookingDetails = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const bookings = await Booking.findById(params.id)
    if (bookings.user !== req.user._id) {
      throw new ErrorHandler('You can not view this booking', 403)
    }

    return NextResponse.json({
      bookings,
    })
  }
)
