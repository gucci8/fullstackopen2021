/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'zzz',
      name: 'yyy zzz',
      password: 'sekret',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })


  it('5:17: Login form is shown', function() {
    cy.contains('login').click()
    cy.contains('username')
    cy.contains('password')
  })

  describe('5.18: Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('zzz')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()

      cy.contains('Logged in as yyy zzz')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('zzz')
      cy.get('#password').type('secksi')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong username or password')
      cy.contains('login')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        username: 'zzz',
        name: 'yyy zzz',
        password: 'sekret',
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.visit('http://localhost:3000')

      cy.contains('login').click()
      cy.get('#username').type('zzz')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()
    })

    it('5.19: A blog can be created', function() {
      cy.contains('create new blog').click()

      cy.get('#title').type('aaa')
      cy.get('#author').type('bbb')
      cy.get('#url').type('ccc')
      cy.get('#submitblog').click()

      cy.contains('aaa, bbb')
    })

    it('5.20: A blog can be liked', function() {
      cy.contains('create new blog').click()

      cy.get('#title').type('aaa')
      cy.get('#author').type('bbb')
      cy.get('#url').type('ccc')
      cy.get('#submitblog').click()

      cy.contains('view').click()
      cy.contains('0 likes')
      cy.get('#likebtn').click()
      cy.contains('1 likes')
    })
  })

  describe('After creating a blog...', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        username: 'zzz',
        name: 'yyy zzz',
        password: 'sekret',
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)

      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'zzz', password: 'sekret'
      }).then(response => {
        localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })

      cy.contains('create new blog').click()

      cy.get('#title').type('aaa')
      cy.get('#author').type('bbb')
      cy.get('#url').type('ccc')
      cy.get('#submitblog').click()
    })

    it('5.21: The user who added the blog can remove it', function() {
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('.error').should('contain', 'Removed aaa successfully')
      cy.get('html').should('not.contain', 'aaa, bbb')
    })
  })

  describe('5.22: The blogs are sorted by their likes in descending order', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        username: 'zzz',
        name: 'yyy zzz',
        password: 'sekret',
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)

      cy.login({ username: 'zzz', password: 'sekret' })

      const blog1 = {
        title: 'aaaaa',
        author: 'bbbbb',
        url: 'ccccc',
        likes: 3
      }
      cy.createBlog(blog1)

      const blog2 = {
        title: 'aaaa',
        author: 'bbbb',
        url: 'cccc',
        likes: 6
      }
      cy.createBlog(blog2)

      const blog3 = {
        title: 'aaa',
        author: 'bbb',
        url: 'ccc',
        likes: 0
      }
      cy.createBlog(blog3)
    })

    it('First blog has most likes even though it was the 2nd/3 to be submitted', function() {
      cy.contains('view').click()
      cy.contains('6 likes')
    })
  })
})