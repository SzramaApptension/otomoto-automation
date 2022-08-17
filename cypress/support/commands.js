// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('LoginToOtomoto', (mail, pw) => {
    cy.get('[data-testid="usermenu-link-login"]').click();
    cy.get('[data-testid="current-email"]').type(mail);
    cy.get('[data-testid="current-password"]').type(pw);
    cy.get('[data-testid="sign-in-button"]').click();
    cy.get('[data-test="link-account"] > .text').should('contain', mail.substring(0,12));
  })

  Cypress.Commands.add('LoginFail', (mail, pw) => {
    cy.get('[data-testid="usermenu-link-login"]').click();
    cy.get('[data-testid="current-email"]').type(mail);
    cy.get('[data-testid="current-password"]').type(pw);
    cy.get('[data-testid="sign-in-button"]').click();
    cy.get('[data-testid="generic-error-message"]').should('contain', "Nieprawidłowy");
  })
