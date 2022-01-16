import React, { useState } from 'react'
import { SignInUser } from '../services/UserServices'
import { Form, Button } from 'react-bootstrap'

const SignIn = (props) => {
  const [formValues, setFormValues] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValues)
    setFormValues({ email: '', password: '' })
    props.setUser(payload)
    props.toggleAuthenticated(true)
    props.history.push('/')
  }

  return (
    <div className="signin col">
      <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '85%' }}>
        <Form className="col" onSubmit={handleSubmit}>
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
          <Button
            variant="primary"
            type="submit"
            disabled={!formValues.email || !formValues.password}
          >
            Sign In
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default SignIn
