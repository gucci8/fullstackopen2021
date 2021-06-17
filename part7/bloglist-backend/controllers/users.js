const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(user)
})
  
usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.password.length < 3) {
    return response.status(400).json({
      error: 'Password should have at least 3 letters'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.delete('/:id', async (request, response) => {
  const user = await User.findByIdAndRemove(request.params.id)
  response.json(user)
})

usersRouter.put('/:id', async (request, response) => {
  const body = request.body

  const entry = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: Number(body.likes)
  }

  const User = await User.findByIdAndUpdate(request.params.id, entry)
  response.json(User)
})

module.exports = usersRouter