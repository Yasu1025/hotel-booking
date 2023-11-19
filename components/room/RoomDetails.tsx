'use client'

import { IRoom } from '@/backend/models/room'
import Link from 'next/link'
import React from 'react'
import StarRatings from 'react-star-ratings'
import ListReviews from '../review/ListReviews'
import NewReview from '../review/NewReview'
import BookingDatePicker from './BookingDatePicker'
import RoomFeatures from './RoomFeatures'
import RoomImageSlider from './RoomImageSlider'

interface IProps {
  room: IRoom
}

const RoomDetails = ({ room }: IProps) => {
  return (
    <div className='container container-fluid'>
      <h2 className='mt-5'>{room.name}</h2>
      <p>{room.address}</p>

      <div className='ratings mt-auto mb-3'>
        <div className='star-ratings'>
          <StarRatings
            rating={room.ratings}
            starRatedColor='#e61e4d'
            numberOfStars={5}
            starDimension='22px'
            starSpacing='1px'
            name='rating'
          />
          <span className='no-of-reviews'>({room.numOfReviews} Reviews)</span>
        </div>
      </div>

      <RoomImageSlider images={room.images} />

      <div className='row my-5'>
        <div className='col-12 col-md-6 col-lg-8'>
          <h3>Description</h3>
          <p>{room.description}</p>
          <RoomFeatures room={room} />
        </div>

        <div className='col-12 col-md-6 col-lg-4'>
          <BookingDatePicker room={room} />
          {/* <!-- Room Location Map (if available) goes here --> */}
        </div>
      </div>

      <NewReview />

      <ListReviews />
    </div>
  )
}

export default RoomDetails
