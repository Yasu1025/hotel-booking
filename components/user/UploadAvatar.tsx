'use client'
import { useLazyUpdateSessionQuery, useUploadAvatarMutation } from '@/store/api/userApi'
import { setUser } from '@/store/feature/userSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import ButtonLoader from '../layout/ButtonLoader'

const UploadAvatar = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [uploadAvatar, { isLoading, isSuccess, error }] = useUploadAvatarMutation()
  const [avatar, setAvatar] = useState('')
  const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')

  const { user } = useAppSelector(state => state.auth)
  // User session
  const [updateSession, { data }] = useLazyUpdateSessionQuery()
  if (data) dispatch(setUser(data?.user))

  useEffect(() => {
    if (user?.avatar) {
      setAvatarPreview(user?.avatar.url)
    }

    if (error && 'data' in error) {
      toast.error(error?.data?.errMessage)
    }

    if (isSuccess) {
      // @ts-ignore
      updateSession()
      router.refresh()
    }
  }, [error, isSuccess, router, updateSession, user])

  const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const files = Array.from(e.target.files || [])

    const reader = new FileReader()

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result as string)
        setAvatarPreview(reader.result as string)
      }
    }

    reader.readAsDataURL(files[0])
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const userData = { avatar }

    uploadAvatar(userData)
  }

  return (
    <div className='row wrapper'>
      <div className='col-10 col-lg-8'>
        <form className='shadow rounded bg-body' onSubmit={submitHandler}>
          <h2 className='mb-4'>Upload Avatar</h2>

          <div className='form-group'>
            <div className='d-flex align-items-center'>
              <div className='me-3'>
                <figure className='avatar item-rtl'>
                  <img src={avatarPreview} className='rounded-circle' alt='image' />
                </figure>
              </div>
              <div className='input-foam'>
                <label className='form-label' htmlFor='customFile'>
                  Choose Avatar
                </label>
                <input
                  type='file'
                  name='avatar'
                  className='form-control'
                  id='customFile'
                  accept='images/*'
                  onChange={onChange}
                />
              </div>
            </div>
          </div>

          <button type='submit' className='btn form-btn w-100 py-2'>
            {isLoading ? <ButtonLoader /> : 'Upload'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default UploadAvatar
