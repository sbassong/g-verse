/* eslint-disable */
import React from 'react'
import {DeleteReview } from '../services/ReviewServices'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


const ReviewCard = ({review, user}) => {

  const handleDeleteReview = async () => {
    await DeleteReview(review.id)
    MySwal.fire({text: "Review successfully deleted!"})
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