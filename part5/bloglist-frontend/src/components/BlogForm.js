import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  submitBlog,
  titleHandler,
  authorHandler,
  urlHandler,
  title,
  author,
  url
}) => (
  <form onSubmit={submitBlog}>
    <div>
      title:
      <input value={title} onChange={titleHandler} />
    </div>
    <div>
      author:
      <input value={author} onChange={authorHandler} />
    </div>
    <div>
      url:
      <input value={url} onChange={urlHandler} />
    </div>
    <button type="submit">create</button>
  </form>
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
