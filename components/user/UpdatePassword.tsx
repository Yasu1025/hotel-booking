'use client'

import { useUpdatePasswordMutation } from '@/store/api/userApi'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const UpdatePassword = () => {
  const router = useRouter()
  const [newPsw, setNewPsw] = useState('')
  const [oldPsw, setOldPsw] = useState('')

  const [updatePassword, { isLoading, isSuccess, error }] = useUpdatePasswordMutation()

  useEffect(() => {
    if (error && 'data' in error) {
      toast.error(error?.data?.errMessage)
    }

    if (isSuccess) {
      toast.success('Password has been updated!!!')
      router.refresh()
      setNewPsw('')
      setOldPsw('')
    }
  }, [error, isSuccess, router])
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const passwords = { password: newPsw, oldPassword: oldPsw }
    updatePassword(passwords)
  }

  return (
    <div className='row wrapper'>
      <div className='col-10 col-lg-8'>
        <form className='shadow rounded bg-body' onSubmit={submitHandler}>
          <h2 className='mb-4'>Change Password</h2>

          <div className='mb-3'>
            <label className='form-label' htmlFor='old_password_field'>
              Old Password
            </label>
            <input
              type='password'
              id='old_password_field'
              className='form-control'
              name='oldPassword'
              value={oldPsw}
              onChange={e => setOldPsw(e.target.value)}
            />
          </div>

          <div className='mb-3'>
            <label className='form-label' htmlFor='new_password_field'>
              New Password
            </label>
            <input
              type='password'
              id='new_password_field'
              className='form-control'
              name='password'
              value={newPsw}
              onChange={e => setNewPsw(e.target.value)}
            />
          </div>

          <button type='submit' className='btn form-btn w-100 py-2'>
            Set Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdatePassword
