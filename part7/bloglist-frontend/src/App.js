import React, { useState, useEffect } from 'react'
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import Togglable from './components/Togglable'
import Menu from './components/Menu'
import Notification from './components/Notification'

import Users from './components/Users'
import User from './components/User'

import BlogList from './components/BlogList'
import Blog from './components/Blog'

import blogService from './services/blogService'
import userService from './services/userService'
import loginService from './services/loginService'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])

  const [user, setUser] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [errorMessage, setErrorMessage] = useState({ msg: null, color: 'red' })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }, [])

  useEffect(() => {
    userService.getAll().then(users =>
      setUsers( users.sort((a, b) => b.blogs.length - a.blogs.length) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username,
        password: password
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      showError('Wrong username or password', 'red')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const submitBlog = async (event) => {
    event.preventDefault()

    const blog = await blogService.create({
      title: title,
      author: author,
      likes: 0,
      url: url,
      user: user
    })

    showError(`A new blog ${blog.title} by ${blog.author} added`, 'green')
    blog.user = user
    setBlogs(blogs.concat(blog).sort((a, b) => b.likes - a.likes))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const deleteHandler = async (blog) => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        showError(`Removed ${blog.title} successfully.`, 'green')
      } catch (error) {
        showError(`Blog ${blog.title} has already been removed from the server`, 'red')
      }
    }
  }

  const likeHandler = async (blog) => {
    try {
      const newObj = {
        likes: Number(blog.likes) + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
        id: blog.id,
        user: blog.user
      }
      await blogService.updateBlog(blog.id, newObj)
      setBlogs(blogs.filter(b => b.id !== blog.id).concat(newObj).sort((a, b) => b.likes - a.likes))
    } catch(error) {
      showError(error.message, 'red')
    }
  }

  const showError = (message, color) => {
    setErrorMessage({ msg: message, color: color })
    setTimeout(() => {
      setErrorMessage({ msg: null })
    }, 3000)
  }

  const blogMatch = useRouteMatch('/blogs/:id')
  const viewedBlog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  const userMatch = useRouteMatch('/users/:id')
  const viewedUser = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  if (user === null) {
    return (
      <div>
        <Menu user={null} handleLogout={handleLogout} />
        <h2>blog app</h2>
        <Switch>
          <Route path='/blogs/:id'>
            <Blog
              blog={viewedBlog}
              handleDelete={() => { deleteHandler(viewedBlog) }}
              handleLike={() => { likeHandler(viewedBlog) }}
              loggedUser={null}
            />
          </Route>
          <Route path='/blogs'>
            <BlogList
              key='bloglist'
              blogs={blogs}
            />
          </Route>
          <Route path={'/login'}>
            <LoginForm
              username={username}
              password={password}
              usernameHandler={(event) => { setUsername(event.target.value) }}
              passwordHandler={(event) => { setPassword(event.target.value) }}
              login={handleLogin}
              errorMessage={errorMessage}
            />
          </Route>
        </Switch>
      </div>
    )
  }

  return (
    <div>
      <Menu user={user} handleLogout={handleLogout} />
      <h2>blog app</h2>
      <Notification
        message={errorMessage.msg}
        color={errorMessage.color}
      />
      <Switch>
        <Route path='/blogs/:id'>
          <Blog
            blog={viewedBlog}
            handleDelete={() => { deleteHandler(viewedBlog) }}
            handleLike={() => { likeHandler(viewedBlog) }}
            loggedUser={user}
          />
        </Route>
        <Route path='/blogs'>
          <Togglable buttonLabel={'create new blog'} >
            <BlogForm
              submitBlog={submitBlog}
              title={title}
              author={author}
              url={url}
              titleHandler={(event) => {setTitle(event.target.value)}}
              authorHandler={(event) => {setAuthor(event.target.value)}}
              urlHandler={(event) => {setUrl(event.target.value)}}
            />
          </Togglable>
          <BlogList
            key='bloglist'
            blogs={blogs}
          />
        </Route>
        <Route path='/users/:id'>
          <User user={viewedUser} />
        </Route>
        <Route path='/users'>
          <Users users={users} />
        </Route>
      </Switch>
    </div>
  )
}

export default App