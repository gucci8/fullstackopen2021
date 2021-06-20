import React from 'react'
import Notification from './Notification'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({
  login,
  username,
  password,
  usernameHandler,
  passwordHandler,
  errorMessage
}) => (
  <div>
    <h2>Log in to application</h2>
    <Notification message={errorMessage.msg} color={errorMessage.color} />
    <Form onSubmit={login}>
      <Form.Group>
        <Form.Label>username:</Form.Label>
        <Form.Control
          type='text'
          name='username'
          value={username}
          onChange={usernameHandler}
        />
        <Form.Label>password:</Form.Label>
        <Form.Control
          type='password'
          name='password'
          value={password}
          onChange={passwordHandler}
        />
      </Form.Group>
      <Button variant='primary' id='submitblog' type='submit'>login</Button>
    </Form>
  </div>
)

export default LoginForm
