import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import BlogsSimple from './components/BlogsSimple'
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
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
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
    const blog = {
      title: title,
      author: author,
      likes: 0,
      url: url,
      user: user
    }
    await blogService.create(blog)
    showError(`A new blog ${blog.title} by ${blog.author} added`, 'green')
    setBlogs(blogs.concat(blog).sort((a, b) => b.likes - a.likes))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const deleteHandler = async (blog) => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id));
        showError(`Removed ${blog.title} successfully.`, 'green')
      } catch {
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
 
  if (user === null) {
    return (
      <div>
        <Togglable
          buttonLabel={'login'}
          children={
            <LoginForm
              username={username}
              password={password}
              usernameHandler={(event) => { setUsername(event.target.value) }}
              passwordHandler={(event) => { setPassword(event.target.value) }}
              login={handleLogin}
              errorMessage={errorMessage}
            />
          }
        />
        <BlogsSimple
          key='bloglist'
          blogs={blogs}
          handleDelete={deleteHandler}
          handleLike={likeHandler}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        message={errorMessage.msg}
        color={errorMessage.color}
      />
      Logged in as {user.name}
      <button onClick={handleLogout}>log out</button>
      <Togglable
        buttonLabel={'create new blog'}
        children={
          <BlogForm
            submitBlog={submitBlog}
            title={title}
            author={author}
            url={url}
            titleHandler={(event) => {setTitle(event.target.value)}}
            authorHandler={(event) => {setAuthor(event.target.value)}}
            urlHandler={(event) => {setUrl(event.target.value)}}
          />
        }
      />
      <BlogList
        key='bloglist'
        blogs={blogs}
        handleDelete={deleteHandler}
        handleLike={likeHandler}
        loggedUser={user}
      />
    </div>
  )
}

export default App