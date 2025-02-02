describe('Blog app', function() {
  beforeEach(function() {
    // Visiting the application URL
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    // Check if the login form exists
    cy.get('form').should('be.visible')
    cy.contains('Login') // Ensure that the form contains a "Login" text
  })
})
