describe('Blog app', function() {
  beforeEach(function() {
    // Visits the website
    cy.visit('http://localhost:5173');
  });

  it('Login form is shown', function() {
    // Checks if its visible
    cy.get('form').should('be.visible');
    cy.contains('Log in to application'); // Ensure that the form contains the correct heading text
  });

  describe('Login', function() {
    beforeEach(function() {
      // Empty the database and create a user for the backend before login tests (5.18)
      cy.request('POST', 'http://localhost:3003/api/testing/reset'); 
      cy.request('POST', 'http://localhost:3003/api/users', {
        username: 'wilbret',
        password: 'password123', 
        name: 'Test User',
      });
      cy.visit('http://localhost:5173'); // Visit the app again after setup
    });

    it('succeeds with correct credentials', function() {
      // Ensure the login form is visible
      cy.contains('Login').should('be.visible').click();
      
      // Ensure the username input field is present before interacting
      cy.get('input[name="username"]').should('be.visible').type('wilbret'); 
      cy.get('input[name="password"]').should('be.visible').type('password123'); 
      cy.get('button[type="submit"]').click(); 

      // Check if redirected to the main page after successful login
      cy.url().should('eq', 'http://localhost:5173/'); 
      cy.contains('Test User'); // Check if the logged-in user's name appears
    });

    it('fails with wrong credentials', function() {
      cy.contains('Login').should('be.visible').click();
      
      cy.get('input[name="username"]').should('be.visible').type('wilbret');
      cy.get('input[name="password"]').should('be.visible').type('wrongpassword');
      cy.get('button[type="submit"]').click();
    
      // added a timeout if it runs too fast
      cy.contains('Login failed: Incorrect username or password', { timeout: 5000 }).should('be.visible');
    });
    
  });
});
