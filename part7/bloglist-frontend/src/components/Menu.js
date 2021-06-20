import React from 'react'
import {
  Link
} from 'react-router-dom'

const Menu = (props) => {
  const padding = {
    padding: 5,
    backgroundColor: 'rgba(196, 196, 196, 1)'
  }

  if (props.user === null) {
    return (
      <div style={padding}>
        <Link style={padding} to='/blogs'>blogs</Link>
        <Link style={padding} to='/users'>users</Link>
        <Link style={padding} to='/login'>login</Link>
      </div>
    )
  }

  return (
    <div style={padding}>
      <Link style={padding} to='/blogs'>blogs</Link>
      <Link style={padding} to='/users'>users</Link>
      Logged in as {props.user.name}
      <button onClick={props.handleLogout}>log out</button>
    </div>
  )
}

export default Menu