import { IRoom } from '@/backend/models/room'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCheck, faUser, faTimes } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

type Props = {
  room: IRoom
}

const RoomFeatures = ({ room }: Props) => {
  return (
    <div className='features mt-5'>
      <h3 className='mb-4'>Features:</h3>
      <div className='room-feature'>
        <FontAwesomeIcon icon={faUser} />
        <p>{room.guestCapacity} Guests</p>
      </div>
      <div className='room-feature'>
        <FontAwesomeIcon icon={faBed} />
        <p>{room.numOfBeds} Beds</p>
      </div>
      <div className='room-feature'>
        <FontAwesomeIcon
          icon={room.isBreakfast ? faCheck : faTimes}
          className={room.isBreakfast ? 'text-success' : 'text-danger'}
        />
        <p>Breakfast</p>
      </div>
      <div className='room-feature'>
        <FontAwesomeIcon
          icon={room.isInternet ? faCheck : faTimes}
          className={room.isInternet ? 'text-success' : 'text-danger'}
        />
        <p>Internet</p>
      </div>
      <div className='room-feature'>
        <FontAwesomeIcon
          icon={room.isAirConditioned ? faCheck : faTimes}
          className={room.isAirConditioned ? 'text-success' : 'text-danger'}
        />
        <p>Air Conditioned</p>
      </div>
      <div className='room-feature'>
        <FontAwesomeIcon
          icon={room.isPetsAllowed ? faCheck : faTimes}
          className={room.isPetsAllowed ? 'text-success' : 'text-danger'}
        />
        <p>Pets Allowed</p>
      </div>
      <div className='room-feature'>
        <FontAwesomeIcon
          icon={room.isRoomCleaning ? faCheck : faTimes}
          className={room.isRoomCleaning ? 'text-success' : 'text-danger'}
        />
        <p>Room Cleaning</p>
      </div>
    </div>
  )
}

export default RoomFeatures
