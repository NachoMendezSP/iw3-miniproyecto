describe('Add product', () => {
  it ('Should add a product', () => {
      cy.visit('http://localhost:8080')
      cy.contains('button', 'Add Product').click()

      cy.get('[data-cy=product-name]').type('Test Product')
      cy.get('[data-cy=product-cost]').type('10');
      cy.get('[data-cy=product-manufacturing-cost]').type('5');
      cy.get('[data-cy=product-description]').type('Description for the new product');
  
      cy.contains('Save Product').click()

      cy.contains('Test Product').should('exist')
  })
})