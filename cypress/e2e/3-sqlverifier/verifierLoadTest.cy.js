describe('Verifier Page Load Test', () => {
    it('successfully loads Verifier page', () => {
      cy.visit('https://sqlverifier-live-6e21ca0ed768.herokuapp.com/login?page=1&sort=id,ascn') 
      cy.get('.col-md-19').should('exist');
    });
  });