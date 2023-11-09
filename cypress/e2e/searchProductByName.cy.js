describe('Searching for a Product', () => {
  it('Searches for a product by name', () => {
    cy.visit('http://localhost:8080');

    cy.wait(2000)
    cy.get('[data-cy=search]').type('M');

    cy.contains('Milk').should('exist');
    cy.contains('Tomatoes').should('exist');

    cy.wait(2000)

    cy.get('[data-cy=search]').type('ilk');
    cy.contains('Milk').should('exist');
    cy.contains('Tomatoes').should('not.exist');
  });
});
