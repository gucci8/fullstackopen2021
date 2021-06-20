import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({
  submitBlog,
  titleHandler,
  authorHandler,
  urlHandler,
  title,
  author,
  url
}) => (
  <div className='formDiv'>
    <Form onSubmit={submitBlog}>
      <Form.Group>
        <Form.Label>title:</Form.Label>
        <Form.Control
          type='text'
          name='title'
          value={title}
          onChange={titleHandler}
        />
        <Form.Label>author:</Form.Label>
        <Form.Control
          type='text'
          name='author'
          value={author}
          onChange={authorHandler}
        />
        <Form.Label>url:</Form.Label>
        <Form.Control
          type='text'
          name='url'
          value={url}
          onChange={urlHandler}
        />
      </Form.Group>
      <Button variant='primary' id='submitblog' type='submit'>
        create
      </Button>
    </Form>
  </div>
)

BlogForm.propTypes = {
  submitBlog: PropTypes.func.isRequired,
  titleHandler: PropTypes.func.isRequired,
  authorHandler: PropTypes.func.isRequired,
  urlHandler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default BlogForm