'use client'

import { faStar, faUser } from '@fortawesome/free-regular-svg-icons'
import { faHotel, faReceipt, faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

const AdminSidebar = () => {
  const pathname = usePathname()

  const menuItem = [
    {
      name: 'Dashboard',
      url: '/admin/dashboard',
      icon: faTachometerAlt,
    },
    {
      name: 'Rooms',
      url: '/admin/rooms',
      icon: faHotel,
    },
    {
      name: 'Bookings',
      url: '/admin/bookings',
      icon: faReceipt,
    },
    {
      name: 'Users',
      url: '/admin/users',
      icon: faUser,
    },
    {
      name: 'Reviews',
      url: '/admin/reviews',
      icon: faStar,
    },
  ]

  const [activeMenuItem, setActiveMenuItem] = useState(pathname)

  const handleMenuItemClick = (menuItem: string) => {
    setActiveMenuItem(menuItem)
  }

  return (
    <div className='list-group mt-5 pl-4'>
      {menuItem.map((menuItem, index) => (
        <Link
          key={index}
          href={menuItem.url}
          className={`fw-bold list-group-item list-group-item-action ${
            activeMenuItem.includes(menuItem.url) ? 'active' : ''
          }`}
          onClick={() => handleMenuItemClick(menuItem.url)}
          aria-current={activeMenuItem.includes(menuItem.url) ? 'true' : 'false'}
        >
          <FontAwesomeIcon icon={menuItem.icon} className='fa fa-fw pe-2' />
          {menuItem.name}
        </Link>
      ))}
    </div>
  )
}

export default AdminSidebar
