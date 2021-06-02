import React, { useState } from 'react'

const Blog = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const showRemoveButton = { display: (props.loggedUser.username !== props.blog.user.username) ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} key={props.blog.id}>
      <div style={hideWhenVisible}>
        {props.blog.title}, {props.blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {props.blog.title}, {props.blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <div>
          <p>{props.blog.url}</p>
          {props.blog.likes} likes
          <button onClick={props.handleLike}>like</button>
          <p>Submitted by {props.blog.user.name}</p>
          <button onClick={props.handleDelete} style={showRemoveButton}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog