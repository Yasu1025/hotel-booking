'use client'

import { IRoom } from '@/backend/models/room'
import { calculateDaysOfStay } from '@/helpers/helpers'
import { useNewBookingMutation } from '@/store/api/bookingApi'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

type Props = {
  room: IRoom
}

const BookingDatePicker = ({ room }: Props) => {
  const [checkInDate, setCheckInDate] = useState(new Date())
  const [checkOutDate, setCheckOutDate] = useState(new Date())
  const [daysOfStay, setDaysOfStay] = useState(0)

  const [newBooking] = useNewBookingMutation()

  const onChangeDate = (dates: any) => {
    const [newCheckIn, newCheckOut] = dates
    setCheckInDate(newCheckIn)
    setCheckOutDate(newCheckOut)

    if (newCheckIn && newCheckOut) {
      console.log(newCheckIn)
      console.log(newCheckOut)

      const days = calculateDaysOfStay(newCheckIn, newCheckOut)
      setDaysOfStay(days)
      // check booking availability
    }
  }

  const onBookRoom = () => {
    const bookingData = {
      room: room._id,
      checkInDate,
      checkOutDate,
      daysOfStay,
      amountPaid: room.pricePerNight * daysOfStay,
      paymentInfo: {
        id: 'STRIPT_ID',
        status: 'PAID',
      },
    }

    newBooking(bookingData)
  }

  return (
    <div className='booking-card shadow p-4'>
      <p className='price-per-night'>
        <b>$1{room.pricePerNight}</b> / night
      </p>
      <hr />
      <p className='mt-5 mb-3'>Pick Check In & Check Out Date</p>
      <DatePicker
        className='w-100'
        selected={checkInDate}
        onChange={onChangeDate}
        startDate={checkInDate}
        endDate={checkOutDate}
        minDate={new Date()}
        selectsRange
        inline
      />

      <button className='btn py-3 form-btn w-100' onClick={onBookRoom}>
        Pay
      </button>
    </div>
  )
}

export default BookingDatePicker
