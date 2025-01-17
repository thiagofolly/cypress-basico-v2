/// <reference types="Cypress" />


//const faker = require('faker')

describe('Central de Atendimento ao Cliente TAT', function () {
    const user = {}

    beforeEach(() => {
        cy.visit('./src/index.html')

        //user.name = faker.name.firstName()
        //user.lastname = faker.name.firstName()
        //user.password = faker.internet.password()
    })

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('input[id="firstName"]').type('Thiago')
        cy.get('input[id="lastName"]').type('Folly')
        cy.get('input[id="email"]').type('thiagofolly@email.com')
        cy.get('textarea[id="open-text-area"]').type('Gostaria de perguntar como devo seguir na automação dos testes', { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('[class="success"]').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Thiago')
        cy.get('#lastName').type('Folly')
        cy.get('#email').type('emailerrado.email.com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('campo telefone permanece vazio quando preenchido caracteres não numéricos', function () {
        cy.get('#phone').type('abc!@#$').should('be.empty')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Thiago')
        cy.get('#lastName').type('Folly')
        cy.get('#email').type('emailerrado.email.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Thiago')
            .should('have.value', 'Thiago')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Folly')
            .should('have.value', 'Folly')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('thiago@email.com')
            .should('have.value', 'thiago@email.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('25252525')
            .should('have.value', '25252525')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('[class="success"]').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('example')
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('@example')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.get('#title').should('have.text', 'CAC TAT - Política de privacidade')
    })

})