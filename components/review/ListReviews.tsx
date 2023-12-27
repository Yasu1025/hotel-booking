import { IReview } from '@/backend/models/room'
import React from 'react'
import StarRatings from 'react-star-ratings'

interface Props {
  reviews: IReview[]
}

export const ListReviews = ({ reviews }: Props) => {
  return (
    <div className='reviews w-75 mb-5'>
      <h3>{reviews.length} Reviews</h3>
      <hr />
      {reviews.map(review => (
        <div className='review-card my-3' key={`${review.rating}-${review.comment}`}>
          <div className='row'>
            <div className='col-3 col-lg-1'>
              <img
                src={review.user.avatar ? review.user.avatar.url : ''}
                alt={review.user.name}
                width={50}
                height={50}
                className='rounded-circle'
              />
            </div>
            <div className='col-9 col-lg-11'>
              <StarRatings
                rating={review.rating}
                starRatedColor='#e61e4d'
                numberOfStars={5}
                starDimension='18px'
                starSpacing='1px'
                name='rating'
              />
              <p className='review_user mt-1'>by {review.user.name}</p>
              <p className='review_comment'>{review.comment}</p>
            </div>
            <hr />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ListReviews
