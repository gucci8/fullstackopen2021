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

    it('A blog can be created', function() {
      cy.contains('create new blog').click()

      cy.get('#title').type('aaa')
      cy.get('#author').type('bbb')
      cy.get('#url').type('ccc')
      cy.get('#submitblog').click()

      cy.contains('aaa, bbb')
    })

    it('A blog can be liked', function() {
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
})