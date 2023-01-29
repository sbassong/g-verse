import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UpdatePassword } from '../services/UserServices'
// import swal from '@sweetalert/with-react'
import { Form, Button } from 'react-bootstrap'

const iState = { oldPassword: '', newPassword: '', c_newPassword: '' }


const UpdatePasswordForm = ({user}) => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState(iState)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await UpdatePassword(user.id, formValues)
    // swal("Password successfully updated! Please sign in.")
      .then(() => { navigate('/signin') })
  }

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label htmlFor="oldPassword">Old Password</Form.Label>
        <Form.Control
          onChange={handleChange}
          name="oldPassword"
          type="text"
          placeholder="Enter old password"
          value={formValues.oldPassword}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label htmlFor="newPassword">New Password</Form.Label>
        <Form.Control
          onChange={handleChange}
          name="newPassword"
          type="text"
          placeholder="Enter new password here"
          value={formValues.newPassword}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label htmlFor="c_newPassword">Confirm New Password</Form.Label>
        <Form.Control
          onChange={handleChange}
          name="c_newPassword"
          type="text"
          placeholder="Confirm new password here"
          value={formValues.c_newPassword}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!formValues.oldPassword || !formValues.c_newPassword || (!formValues.newPassword && formValues.c_newPassword === formValues.newPassword)} >Update and Sign In</Button>
    </Form>
  )
}

export default UpdatePasswordForm