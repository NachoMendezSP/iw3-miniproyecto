describe('Edit product', () => {
  it ('Should edit a product', () => {
      cy.visit('http://localhost:8080')

      cy.wait(1000)
      cy.contains('tr', 'Apples').find('button:contains("Edit")').click()

      cy.wait(1000)
      cy.get('[data-cy=product-name]').type('{selectall}{backspace}Bananas');
  
      cy.contains('Save Changes').click()

      cy.contains('Bananas').should('exist')
      cy.contains('Apples').should('not.exist')
  })
})