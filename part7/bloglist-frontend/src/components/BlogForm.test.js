import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('5.16: Blog form is submitted with correct details', () => {
  const submitBlog = jest.fn()

  const component = render(
    <BlogForm
      submitBlog={submitBlog}
      titleHandler={() => 0}
      authorHandler={() => 0}
      urlHandler={() => 0}
      title={'Testblog'}
      author={'Testauthor'}
      url={'Testurl'}
    />
  )

  const form = component.container.querySelector('form')

  fireEvent.submit(form)

  expect(submitBlog.mock.calls).toHaveLength(1)
  expect(component.container.querySelector('#title').value).toBe('Testblog')
  expect(component.container.querySelector('#author').value).toBe('Testauthor')
  expect(component.container.querySelector('#url').value).toBe('Testurl')
})