'use client'

import { IRoom } from '@/backend/models/room'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import CustomPagination from './layout/CustomPagination'
import RoomItem from './room/RoomItem'

interface IProps {
  data: {
    success: boolean
    resPerPage: number
    filteredRoomsTotal: number
    rooms: IRoom[]
  }
}

const Home = ({ data }: IProps) => {
  const searchParams = useSearchParams()
  const locationParams = searchParams.get('location')
  const { resPerPage, filteredRoomsTotal, rooms } = data
  return (
    <div>
      <section id='rooms' className='container mt-5'>
        <h2 className='mb-3 ml-2 stays-heading'>
          {locationParams
            ? `${filteredRoomsTotal} found in "${locationParams}"`
            : `All rooms`}
        </h2>
        <Link href='/search' className='ml-2 back-to-search'>
          <i className='fa fa-arrow-left'></i> Back to Search
        </Link>
        <div className='row mt-4'>
          {!rooms.length ? (
            <div className='alert alert-danger mt-5 w-100'>
              <b>No Rooms...</b>
            </div>
          ) : (
            rooms.map(room => <RoomItem key={room._id} room={room} />)
          )}
        </div>
      </section>

      <CustomPagination resPerPage={resPerPage} filteredRoomsTotal={filteredRoomsTotal} />
    </div>
  )
}

export default Home
