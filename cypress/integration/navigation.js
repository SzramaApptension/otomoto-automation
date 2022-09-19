/// <reference types="cypress" />

let carsCount =0;

describe('Navigation', () => {
  it('Should have same results', () => {      // selecting from drop down list
    cy.visit('/');
    cy.get('#onetrust-accept-btn-handler').click();
    cy.get('#filter_enum_body_type').click();
    cy.get(".ds-dropdown-list-item").contains("Coupe").click();
    cy.get('.ds-select-clear-icon').should('have.length', 1);
    cy.get('#filter_enum_make').click();
    cy.get(".ds-dropdown-list-item-option").contains("Audi").click();
    cy.get('.ds-select-clear-icon').should('have.length', 2);
    cy.get(".ds-select").eq(5).click();
    cy.get(".ds-dropdown-list-item-option").contains("10 000 PLN").click();
    cy.get('.ds-select-clear-icon').should('have.length', 3);
    cy.get('[data-testid="submit-btn"]').click();
    cy.get("[data-testid='listing-ad']").then(($cars)=>{                     
      carsCount = Cypress.$($cars).length;
      cy.log(carsCount);
      cy.get('.e1l24m9v0').should('contain', carsCount.toString());
      cy.url().should('include', '/osobowe/audi').should('include', '10000');
    }).then(()=>{                             // selecting by typing
      cy.visit('/');
       cy.get('#filter_enum_body_type').type("Coupe").type('{enter}');
       cy.get('.ds-select-clear-icon').should('have.length', 1);
       cy.get('#filter_enum_make').type("Audi").type('{enter}');
       cy.get('.ds-select-clear-icon').should('have.length', 2);
       cy.get(".ds-select").eq(5).type("10000").type('{enter}');
       cy.get('.ds-select-clear-icon').should('have.length', 3);
       cy.get('[data-testid="submit-btn"]').click();
       cy.get("[data-testid='listing-ad']").should('have.length', carsCount);
       cy.get('.e1l24m9v0').should('contain', carsCount.toString());
       cy.url().should('include', '/osobowe/audi').should('include', '10000');
    })
     

  })
})