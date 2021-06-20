import React from 'react'
import {
  Link
} from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = (props) => (
  <div>
    <Table striped>
      <thead>
        <tr>
          <th>Blog title</th>
          <th>Submitter</th>
        </tr>
      </thead>
      <tbody>
        {props.blogs.map((blog) => (
          <tr key={blog.id}>
            <td>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title}
              </Link>
            </td>
            <td>
              {blog.author}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
)

export default BlogList