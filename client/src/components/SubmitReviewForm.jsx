import React, { useState } from 'react'
import { CreateReview } from '../services/ReviewServices'
import {Form, Button} from 'react-bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


const SubmitReviewForm = ({user, game}) => {
  const [formValues, setFormValues] = useState({user_id: user.id, game_id: game.id, content: ''})

  const handleSubmit = async (e) => {
    e.preventDefault()
    await CreateReview(formValues)
    MySwal.fire({
      text: "Thank you for review!"
    })
      .then(() => { window.location.reload() })
  }

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  return (
    <div className='review-cont'>
      <Form className='review-form' onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="text" value={formValues.content} onChange={handleChange} name="content" placeholder='Please write review here'/>
        </Form.Group>
        <Button variant="primary" type="submit" className='post-review'>Post Review</Button>
      </Form>
    </div>
  )
}

export default SubmitReviewForm