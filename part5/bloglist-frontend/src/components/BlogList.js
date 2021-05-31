import React from 'react'
import Blog from './Blog'

const BlogList = (props) => (
  <div>
    {props.blogs.map((blog) => (
      <Blog
        key={blog.title}
        blog={blog}
        handleDelete={() => { props.handleDelete(blog) }}
        handleLike={() => { props.handleLike(blog) }}
        loggedUser={props.loggedUser}
      />
    ))}
  </div>
)

export default BlogList