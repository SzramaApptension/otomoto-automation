/// <reference types="cypress" />


describe('Validate if elements are visible on pagae', () => {  
    beforeEach(() => {
        cy.visit('/');
        cy.get('#onetrust-accept-btn-handler').click();
    })

    it('Page view', () => {
        cy.get('[data-testid="main-content"]').should('be.visible');
        cy.get('[data-testid="submit-btn"]').should('be.visible');
    })

    it('Validate if login and signin buttons are visible on bigger viewport', () => {
        cy.get('[data-testid="usermenu-link-login"]').should('not.be.visible');
        cy.get('[data-testid="usermenu-link-signup"]').should('not.be.visible');
        cy.viewport(1920,1080);
        cy.get('[data-testid="usermenu-link-login"]').should('be.visible');
        cy.get('[data-testid="usermenu-link-signup"]').should('be.visible');
    })

    it('Menu carousel should appear after pressing menu button', () => {
        cy.get('[data-testid="carousel"]').should('not.be.visible');
        cy.get('[data-testid="side-menu-button"]').click();
        cy.get('[data-testid="carousel"]').should('be.visible');
    })
  })