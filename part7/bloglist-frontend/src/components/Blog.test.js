import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const testuser = {
  username: 'test',
  name: 'test',
  id: '0000000000'
}

const testblog = {
  title: 'test',
  author: 'test',
  url: 'test',
  likes: 0,
  user: testuser,
  id: '000000000'
}

describe('Togglable blog', () => {
  let component
  let mockHandler

  beforeEach(() => {
    mockHandler = jest.fn()
    component = render(
      <Blog blog={testblog} handleLike={mockHandler} handleDelete={() => 0 } loggedUser={testuser} />
    )
  })

  test('5.13: Only title and author are shown', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('5.14: Also url and likes are shown after click', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('5.15: Pressing like button twice calls the event handler twice', () => {
    const like = component.getByText('like')
    fireEvent.click(like)
    fireEvent.click(like)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})