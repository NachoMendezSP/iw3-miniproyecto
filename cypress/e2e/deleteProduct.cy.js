describe('Delete product', () => {
  it ('Should add and delete a product', () => {
      cy.visit('http://localhost:8080')
      
      cy.wait(1000)
      cy.contains('button', 'Add Product').click()

      cy.get('[data-cy=product-name]').type('New Product')
      cy.get('[data-cy=product-cost]').type('10');
      cy.get('[data-cy=product-manufacturing-cost]').type('5');
      cy.get('[data-cy=product-description]').type('Description for the new product')
  
      cy.contains('Save Product').click()

      cy.contains('New Product').should('exist')

      cy.wait(1000)
      cy.contains('tr', 'New Product').find('button:contains("Delete")').click()

      cy.wait(1000)
      cy.contains('button', 'Yes').click()

      cy.contains('New Product').should('not.exist')
  })
})