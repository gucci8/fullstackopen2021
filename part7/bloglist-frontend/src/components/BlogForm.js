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
  <div className='formDiv'>
    <form onSubmit={submitBlog}>
      <div>
        title:
        <input id='title' value={title} onChange={titleHandler} />
      </div>
      <div>
        author:
        <input id='author' value={author} onChange={authorHandler} />
      </div>
      <div>
        url:
        <input id='url' value={url} onChange={urlHandler} />
      </div>
      <button id='submitblog' type='submit'>create</button>
    </form>
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
