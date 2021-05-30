import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogService'
import loginService from './services/loginService'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [errorMessage, setErrorMessage] = useState({ msg: null, color: 'red' })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
      url: url
    })
    showError(`A new blog ${blog.title} by ${blog.author} added`, 'green')
    setBlogs(blogs.concat(blog))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const showError = (message, color) => {
    setErrorMessage({ msg: message, color: color })
    setTimeout(() => {
      setErrorMessage({ msg: null })
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage.msg} color={errorMessage.color} />
        <LoginForm
          username={username}
          password={password}
          usernameHandler={(event) => { setUsername(event.target.value) }}
          passwordHandler={(event) => { setPassword(event.target.value) }}
          login={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage.msg} color={errorMessage.color} />
      Logged in as {user.name}
      <button onClick={handleLogout}>
        log out
      </button>
      <BlogForm
        submitBlog={submitBlog}
        title={title}
        author={author}
        url={url}
        titleHandler={(event) => { setTitle(event.target.value) }}
        authorHandler={(event) => { setAuthor(event.target.value) }}
        urlHandler={(event) => { setUrl(event.target.value) }}
      />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App