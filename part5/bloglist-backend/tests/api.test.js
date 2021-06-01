const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'aaa',
    author: 'aaa',
    url: 'localhost:7777',
    likes: 1,
    userId: 'aaaa'
  },
  {
    title: 'bbb',
    author: 'bbb',
    url: 'localhost:8000',
    likes: 1,
    userId: 'bbbb'
  }
]

const initialUser = {
  username: 'zzz',
  name: 'yyy zzz',
  password: 'sekret',
}

beforeEach(async () => {
  await User.deleteMany({})
  await api
    .post('/api/users')
    .send(initialUser)
    .set('Accept', 'application/json')
    .expect('Content-Type', /application\/json/)
  
  const users = await User.find({})
  initialBlogs.forEach(b => b.userId = users[0].id)
  await Blog.deleteMany({})

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('4.8: Blogs are json', async () => {
  api
    .get('/api/blogs')
    .expect('Content-Type', /application\/json/)
})

test('4.8: Correct number of blogs is returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(initialBlogs.length)
})

test('4.9: id is defined', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('4.10: new entry is saved', async () => {
  const loginUser = {
    username : 'zzz',
    password: 'sekret'
  }

  const loggedUser = await api
    .post('/api/login')
    .send(loginUser)
    .set('Accept','application/json')
  
  await api
    .post('/api/blogs')
    .send(initialBlogs[0])
    .set('authorization', `bearer ${loggedUser.body.token}`)
    .set('Accept', 'application/json')
    .expect(200)

  const blogs = await Blog.find({})
  expect(blogs.length - initialBlogs.length).toBe(1)
})

test('4.11: If likes is missing, it defaults to 0', async () => {
  const loginUser = {
    username : 'zzz',
    password: 'sekret'
  }

  const loggedUser = await api
    .post('/api/login')
    .send(loginUser)
    .set('Accept','application/json')
  
  const users = await User.find({})
  await api
    .post('/api/blogs')
    .send({
      title: 'ccc',
      url: 'localhost:8000',
      userId: users[0].id
    })
    .set('authorization', `Bearer ${loggedUser.body.token}`)
    .set('Accept', 'application/json')
    .expect(200)
  
  const blog = await Blog.findOne({ title: 'ccc' })

  expect(blog.likes).toBe(0)
})

test('4.12: If title or url is missing, 400 Bad Request is responded', async () => {
  api
    .post('/api/blogs')
    .send({ title: 'ccc' })
    .expect(400)
})

test('4.16: Invalid users are not created: password is at least 3 letters', async () => {
  api
    .post('/api/users')
    .send({
      username: 'xxx',
      name: 'yyy zzz',
      password: 'ok',
      blogs: []
    })
    .expect(400)
})

test('4.16: Invalid users are not created: username is at least 3 letters', async () => {
  api
    .post('/api/users')
    .send({
      username: 'xx',
      name: 'yyy zzz',
      password: 'kys',
      blogs: []
    })
    .expect(400)
})

test('4.23: Posting a blog responses with 401 without authorization', async () => {
  api
    .post('/api/blogs')
    .send(initialBlogs[0])
    .expect(401)
})

afterAll(() => {
  mongoose.connection.close()
})