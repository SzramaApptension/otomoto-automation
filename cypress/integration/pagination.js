/// <reference types="cypress" />

let carsCount =0;

describe('Pagination', () => {
  it('Pages should have presented same number of cars', () => {      // selecting from drop down list
    cy.viewport(1920,1080);
    cy.visit('/');
    cy.get('#onetrust-accept-btn-handler').click();
    cy.get('#filter_enum_body_type').click();
    cy.get(".ds-dropdown-list-item").contains("Coupe").click();
    cy.get('.ds-select-clear-icon').should('have.length', 1);
    cy.get('#filter_enum_make').click();
    cy.get(".ds-dropdown-list-item-option").contains("Audi").click();
    cy.get('.ds-select-clear-icon').should('have.length', 2);
    cy.get('[data-testid="submit-btn"]').click();
    cy.get("[data-testid='listing-ad']").then(($cars)=>{
      carsCount = Cypress.$($cars).length;
      cy.log(carsCount);
      cy.get('[data-testid="pagination-step-forwards"]').click();
      cy.url().should('include', '2');
      cy.get("[data-testid='listing-ad']").should('have.length', carsCount);
      cy.get('[data-testid="pagination-step-forwards"]').click();
      cy.url().should('include', '3');
      cy.get("[data-testid='listing-ad']").should('have.length', carsCount);
    })
     
    
  })
})