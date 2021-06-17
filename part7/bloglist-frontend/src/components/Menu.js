import React from 'react'
import {
  Link
} from 'react-router-dom'

const Menu = (props) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to='/blogs'>blogs</Link>
      <Link style={padding} to='/users'>users</Link>
      Logged in as {props.user.name}
      <button onClick={props.handleLogout}>log out</button>
    </div>
  )
}

export default Menu