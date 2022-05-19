Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Thiago')
    cy.get('#lastName').type('Folly')
    cy.get('#email').type('thiagofolly@email.com')
    cy.get('#open-text-area').type('Gostaria de perguntar como devo seguir na automação dos testes')
    cy.contains('button', 'Enviar').click()
})