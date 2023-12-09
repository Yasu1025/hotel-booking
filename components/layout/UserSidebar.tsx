'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { faUser, faUserCircle, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const UserSidebar = () => {
  const pathname = usePathname()

  const menuItem = [
    {
      name: 'Update Profile',
      url: '/me/update',
      icon: faUser,
    },
    {
      name: 'Upload Avatar',
      url: '/me/upload_avatar',
      icon: faUserCircle,
    },
    {
      name: 'Update Password',
      url: '/me/update_password',
      icon: faLock,
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
            activeMenuItem === menuItem.url ? 'active' : ''
          }`}
          onClick={() => handleMenuItemClick(menuItem.url)}
          aria-current={activeMenuItem === menuItem.url ? 'true' : 'false'}
        >
          <FontAwesomeIcon icon={menuItem.icon} className='fa fa-fw pe-2' />
          {menuItem.name}
        </Link>
      ))}
    </div>
  )
}

export default UserSidebar
