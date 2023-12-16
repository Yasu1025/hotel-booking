import { NextRequest, NextResponse } from 'next/server'
import Booking from '../models/booking'
import { catchAsyncErrors } from './../middlewares/catchAsyncError'

// Create new Booking   =>  /api/bookings
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
