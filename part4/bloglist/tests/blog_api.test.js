const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/Blog')

const initialBlogs = [
  {
    title: 'aaa',
    author: 'aaa',
    url: 'localhost:7777',
    likes: 1
  },
  {
    title: 'bbb',
    author: 'bbb',
    url: 'localhost:8000',
    likes: 1
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('4.8: Blogs are json', async () => {
  api
    .get('/api/blogs')
    .expect(200)
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
  const response0 = await api.get('/api/blogs')
  await api.post('/api/blogs').send(initialBlogs[0])
  const response1 = await api.get('/api/blogs')

  expect(response0.body.length).toBe(response1.body.length - 1)
})

test('4.11: If likes is missing, it defaults to 0', async () => {
  await api.post('/api/blogs').send({ title: 'ccc', url: 'localhost:8000' })
  const blog = await Blog.findOne({ title: 'ccc' })

  expect(blog.likes).toBe(0)
})

test('4.12: If title or url is missing, 400 Bad Request is responded', async () => {
  api
    .post('/api/blogs').send({ title: 'ccc' })
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})