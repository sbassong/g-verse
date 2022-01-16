import React, {useState} from 'react'
import { UpdateUser } from '../services/UserServices'
import swal from '@sweetalert/with-react'
import { Form, Button} from 'react-bootstrap'


const UpdateProfileForm = ({user}) => {
  const iState = { name: user.name, email: user.email, image: user.image }
  const [formValues, setFormValues] = useState(iState)

  const handleSubmit = async (e) => {
    e.preventDefault()
    UpdateUser(user.id, formValues)
    swal("Profile successfully updated!")
    .then(() => {window.location.reload()})
  }

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label htmlFor="name">Name</Form.Label>
        <Form.Control
          onChange={handleChange}
          name="name"
          type="text"
          placeholder="John Smith"
          value={formValues.name}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control
          onChange={handleChange}
          name="email"
          type="email"
          placeholder="example@example.com"
          value={formValues.email}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label htmlFor="picture">Picture URL</Form.Label>
        <Form.Control
          onChange={handleChange}
          name="image"
          type="text"
          placeholder="https://i.imgur.com/tRxbS89m.jpg"
          value={formValues.image}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={(formValues.name || formValues.email || formValues.image) === ""} >Update Profile</Button>
    </Form>
  )
}

export default UpdateProfileForm