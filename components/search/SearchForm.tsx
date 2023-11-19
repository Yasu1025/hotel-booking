'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SearchForm = () => {
  const router = useRouter()
  const [location, setLocation] = useState('')
  const [numOfGuests, setNumOfGuests] = useState('')
  const [category, setCategory] = useState('')

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const queryStr = [
      location && `location=${encodeURIComponent(location)}`,
      numOfGuests && `guests=${encodeURIComponent(numOfGuests)}`,
      category && `category=${encodeURIComponent(category)}`,
    ]
      .filter(Boolean)
      .join('&')

    router.push(`/?${queryStr}`)
  }

  return (
    <div className='row wrapper mt-5'>
      <div className='col-10 col-lg-5'>
        <form className='shadow-lg' action='#' onSubmit={onSubmitHandler}>
          <h2 className='mb-3'>Search Rooms</h2>
          <div className='form-group mt-3'>
            <label htmlFor='location_field' className='mb-1'>
              {' '}
              Location{' '}
            </label>
            <input
              type='text'
              className='form-control'
              id='location_field'
              placeholder='new york'
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </div>

          <div className='form-group mt-3'>
            <label htmlFor='guest_field' className='mb-1'>
              {' '}
              No. of Guests{' '}
            </label>
            <select
              className='form-select'
              id='guest_field'
              value={numOfGuests}
              onChange={e => setNumOfGuests(e.target.value)}
            >
              <option></option>
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option value={num} key={`opt-${num}`}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className='form-group mt-3'>
            <label htmlFor='room_type_field' className='mb-1'>
              {' '}
              Room Type{' '}
            </label>
            <select
              className='form-select'
              id='room_type_field'
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option></option>
              {['King', 'Single', 'Twins'].map(cate => (
                <option value={cate} key={`cate-${cate}`}>
                  {cate}
                </option>
              ))}
            </select>
          </div>

          <button type='submit' className='btn form-btn w-100 py-2'>
            Search
          </button>
        </form>
      </div>
    </div>
  )
}

export default SearchForm
