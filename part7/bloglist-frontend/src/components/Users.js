import React from 'react'
import {
  Link
} from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = (props) => (
  <div>
    <Table striped>
      <thead>
        <tr>
          <th>Name</th>
          <th>Blogs submitted</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map(user => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>
                {user.name}
              </Link>
            </td>
            <td>
              {user.blogs.length}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
)

export default Users