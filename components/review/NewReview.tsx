import { usePostReviewMutation } from '@/store/api/roomApi'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import StarRatings from 'react-star-ratings'

type Props = {
  roomId: string
}

const NewReview = ({ roomId }: Props) => {
  const router = useRouter()
  const [yourRating, setYourRating] = useState(0)
  const [yourComment, setYourComment] = useState('')

  const [postReview, { error, isSuccess }] = usePostReviewMutation()

  useEffect(() => {
    if (error && 'data' in error) {
      toast.error(error.data.errMessage)
      router.refresh()
    }

    if (isSuccess) {
      toast.success('Review posted!!')
    }
  }, [error, isSuccess, router])

  const submitHandler = () => {
    const reviewData = {
      rating: yourRating,
      comment: yourComment,
      roomId,
    }

    postReview(reviewData)
  }
  return (
    <>
      <button
        type='button'
        className='btn form-btn mt-4 mb-5'
        data-bs-toggle='modal'
        data-bs-target='#ratingModal'
      >
        Submit Your Review
      </button>
      <div
        className='modal fade'
        id='ratingModal'
        tabIndex={-1}
        role='dialog'
        aria-labelledby='ratingModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            {/* <!-- Review Modal content goes here --> */}
            <div className='modal-header'>
              <h5 className='modal-title' id='ratingModalLabel'>
                Submit Review
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <StarRatings
                rating={yourRating}
                starRatedColor='#e61e4d'
                numberOfStars={5}
                starDimension='22px'
                starSpacing='1px'
                name='rating'
                changeRating={(e: any) => setYourRating(e)}
              />
              <div className='form-floating'>
                <textarea
                  id='review_field'
                  className='form-controle mt-4'
                  placeholder='Leave your review'
                  style={{ height: '100px' }}
                  value={yourComment}
                  onChange={e => setYourComment(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn my-3 form-btn w-100'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={submitHandler}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewReview
