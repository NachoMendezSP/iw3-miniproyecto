describe('Shows details for a product', () => {
  it ('Should show the details for a product when clicking', () => {
      cy.visit('http://localhost:8080')

      cy.contains('tr', 'Milk').find('button:contains("Show Details")').click();

      cy.wait(1000)

      cy.contains('Product Details').should('exist');

      cy.contains('strong', 'Name:')
      .parent() 
      .should('contain', 'Milk')

      cy.contains('strong', 'Description:')
      .parent()
      .should('contain', 'Fresh')

      cy.wait(1000)
      
      cy.contains('button', 'Close').click()

  })
})