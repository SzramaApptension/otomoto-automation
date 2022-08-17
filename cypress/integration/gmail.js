/// <reference types="cypress" />


describe('Create account on Otomoto', () => {

    before(function(){
        cy.fixture('example').then(function(data){
          globalThis.data = data;
        })
      })
  
    it('Validate signup', () => {
        cy.visit('https://gmail.com')
        cy.get("#identifierId").type("jacek.tester1@gmail.com");
        cy.get('#identifierNext').click();
        cy.get('#password').type(data.EmailPass);
        cy.get('#passwordNext').click();
    })
  })