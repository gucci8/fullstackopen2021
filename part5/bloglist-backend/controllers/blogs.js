const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
  response.json(blogs)
})
  
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body

  if (!request.token || !request.user) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const user = await User.findById(request.user.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: Number(body.likes) || 0,
    user: user._id
  })
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(204).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  if (!request.token || !request.user) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === request.user.id.toString()) {
    await blog.remove()
    response.status(204).json(blog)
  } else {
    response.status(401).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)

  const entry = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: Number(body.likes),
    user: blog.user._id
  }

  await blog.update(entry)
  response.status(204).end()
})

module.exports = blogsRouter