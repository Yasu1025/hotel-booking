'use client'

import { IRoom } from '@/backend/models/room'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

type Props = {
  room: IRoom
}

const BookingDatePicker = ({ room }: Props) => {
  const [checkInDate, setCheckInDate] = useState(new Date())
  const [checkOutDate, setCheckOutDate] = useState(new Date())

  const onChangeDate = (dates: any) => {
    const [newCheckIn, newCheckOut] = dates
    setCheckInDate(newCheckIn)
    setCheckOutDate(newCheckOut)

    if (newCheckIn && newCheckOut) {
      // check booking availability
      console.log(newCheckIn)
      console.log(newCheckOut)
    }
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
    </div>
  )
}

export default BookingDatePicker
