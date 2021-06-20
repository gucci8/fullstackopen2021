import React from 'react'

const Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  if (props.loggedUser === null) {
    return (
      <div style={blogStyle} key={props.blog.id}>
        <div>
          {props.blog.title}, {props.blog.author}
          <div>
            <p>{props.blog.url}</p>
            {props.blog.likes} likes
            <button id='likebtn' onClick={props.handleLike}>like</button>
            <p>Submitted by {props.blog.user.name}</p>
          </div>
        </div>
      </div>
    )
  }

  const showRemoveButton = { display: (props.loggedUser.username !== props.blog.user.username) ? 'none' : '' }

  return (
    <div style={blogStyle} key={props.blog.id}>
      <div>
        {props.blog.title}, {props.blog.author}
        <div>
          <p>{props.blog.url}</p>
          {props.blog.likes} likes
          <button id='likebtn' onClick={props.handleLike}>like</button>
          <p>Submitted by {props.blog.user.name}</p>
          <button onClick={props.handleDelete} style={showRemoveButton}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog