import React, { useState } from 'react'

const BlogSimple = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} key={props.blog.id}>
      <div style={hideWhenVisible}>
        {props.blog.title}, {props.blog.author}
        <button onClick={toggleVisibility}>{'view'}</button>
      </div>
      <div style={showWhenVisible}>
        {props.blog.title}, {props.blog.author}
        <button onClick={toggleVisibility}>{'hide'}</button>
        <div>
          <p>{props.blog.url}</p>
          {props.blog.likes} likes
          <button onClick={props.handleLike}>like</button>
          <p>Submitted by {props.blog.user.name}</p>
        </div>
      </div>
    </div>
  )
}

const BlogsSimple = (props) => (
  <div>
    {props.blogs.map((blog) => (
      <BlogSimple
        key={blog.title}
        blog={blog}
        handleDelete={() => { props.handleDelete(blog) }}
        handleLike={() => { props.handleLike(blog) }}
      />
    ))}
  </div>
)

export default BlogsSimple