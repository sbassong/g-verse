import React, { useState } from 'react'
import { SignUpUser } from '../services/UserServices'
import { Form, Button } from 'react-bootstrap'

const iState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUp = (props) => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await SignUpUser({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password
    })
    setFormValues(iState)
    props.history.push('/login')
  }

  return (
    <div className="signin col">
      <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '85%' }}>
        <Form className="col" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ color: 'white' }} htmlFor="name">
              Name
            </Form.Label>
            <Form.Control
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="John Smith"
              value={formValues.name}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ color: 'white' }} htmlFor="email">
              Email
            </Form.Label>
            <Form.Control
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="example@example.com"
              value={formValues.email}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ color: 'white' }} htmlFor="password">
              Password
            </Form.Label>
            <Form.Control
              onChange={handleChange}
              type="password"
              name="password"
              value={formValues.password}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ color: 'white' }} htmlFor="confirmPassword">
              Confirm Password
            </Form.Label>
            <Form.Control
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              required
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={
              !formValues.email ||
              (!formValues.password &&
                formValues.confirmPassword === formValues.password)
            }
          >
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default SignUp
