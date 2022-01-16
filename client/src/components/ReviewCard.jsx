import React from 'react'
import swal from '@sweetalert/with-react'
import {DeleteReview } from '../services/ReviewServices'

const ReviewCard = ({review, user}) => {

  const handleDeleteReview = async () => {
    await DeleteReview(review.id)
    swal("Review successfully deleted!")
      .then(() => { window.location.reload() })
  }

  return (
    <div className='review-card'>
      <h4>{review.User.name}:</h4>
      <p>  {review.content}</p>

      {(review.User.id === review.user_id) && 
        <button className='delete-review' onClick={handleDeleteReview}>Delete Review</button>
      }
    </div>
  )
}

export default ReviewCard