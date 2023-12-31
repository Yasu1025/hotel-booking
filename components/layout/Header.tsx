'use client'

import { setIsAuthenticated, setUser } from '@/store/feature/userSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'

const Header = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.auth)

  const { data } = useSession()

  useEffect(() => {
    if (data) {
      dispatch(setUser(data?.user))
      dispatch(setIsAuthenticated(true))
    }
  }, [data])

  const logoutHandler = () => {
    signOut()
  }

  return (
    <nav className='navbar sticky-top py-2'>
      <div className='container'>
        <div className='col-6 col-lg-3 p-0'>
          <div className='navbar-brand'>
            <a href='/'>
              <Image
                style={{ cursor: 'pointer' }}
                src={'/images/hotel-booking_logo.png'}
                width={120}
                height={40}
                alt='HotelBooking'
              />
            </a>
          </div>
        </div>

        <div className='col-6 col-lg-3 mt-3 mt-md-0 text-end'>
          {data?.user ? (
            <div className='ml-4 dropdown d-line'>
              <button
                className='btn dropdown-toggle'
                type='button'
                id='dropdownMenuButton1'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                <figure className='avatar avatar-nav'>
                  <Image
                    src={
                      user?.avatar ? user.avatar.url : '/images/hotel-booking_logo.png'
                    }
                    alt='John Doe'
                    className='rounded-circle placeholder-glow'
                    height='50'
                    width='50'
                  />
                </figure>
                <span className='placeholder-glow ps-1'>{user ? user.name : ''}</span>
              </button>

              <div className='dropdown-menu w-100' aria-labelledby='dropdownMenuButton1'>
                {user?.role === 'admin' && (
                  <Link href='/admin/dashboard' className='dropdown-item'>
                    Dashboard
                  </Link>
                )}

                <Link href='/bookings/me' className='dropdown-item'>
                  My Bookings
                </Link>
                <Link href='/me/update' className='dropdown-item'>
                  Profile
                </Link>
                <Link
                  href='/'
                  className='dropdown-item text-danger'
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            <>
              {data === undefined && (
                <div className='placeholder-glow'>
                  <figure className='avatar avatar-nv placeholder bg-secondary'></figure>
                  <span className='placeholder w-25 bg-secondary ms-2'></span>
                </div>
              )}
              {data === null && (
                <Link href='/login' className='btn btn-danger px-4 text-white'>
                  LOGIN
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Header
