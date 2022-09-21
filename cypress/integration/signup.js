/// <reference types="cypress" />



describe('Create account on Otomoto', () => {

  let randomString = Math.random().toString(36).substring(2);
  const email = "jacek.tester1+" + randomString + "@gmail.com";
  const existingAccLogin = 'jacek.tester1@gmail.com';
  let emailUsername = existingAccLogin.substring(0, existingAccLogin.indexOf("@"));

  before(function () {
    cy.fixture('example').then(function (data) {
      globalThis.data = data;
    })
  })

  beforeEach(() => {
    cy.visit('/');
    cy.viewport(1920, 1080);
    cy.get('#onetrust-accept-btn-handler').click();
  })

  it('Validate signup', () => {
    cy.get('[data-testid="usermenu-link-signup"]').click();
    cy.get('[data-testid="new-email"]').type(email);
    cy.get('[data-testid="new-password"]').type(data.OtoPass);
    cy.get('[data-testid="sign-up-button"]').click();
    cy.get('.ooa-r3slao-Text').should('contain', 'Zweryfikuj');
  })

  it('Login', () => {
    cy.loginToOtomoto(existingAccLogin, data.OtoPass);
    cy.get('[data-test="link-account"] > .text').should('contain', emailUsername);
  })

  it('Change password', () => {
    cy.loginToOtomoto(existingAccLogin, data.OtoPass);
    cy.get('[data-test="link-account"] > .text').should('contain', emailUsername);
    cy.get('#se_accountShop').click();
    cy.get('.password > .tile-header').click();
    cy.get('[data-test="input-old-password"]').type(data.OtoPass);
    cy.get('[data-test="input-password"]').type(data.newPass);
    cy.get('[data-test="input-confirm-password"]').type(data.newPass);
    cy.get(':nth-child(4) > [data-test="change-password"]').click();
    cy.get('.om-confirm-inner > :nth-child(1)').should('contain', "zostało zmienione");
    cy.get('[data-test="logout-button"]').click({ force: true });
    cy.loginToOtomoto(existingAccLogin, data.OtoPass);
    cy.get('[data-testid="generic-error-message"]').should('contain', "Nieprawidłowy");
    cy.loginToOtomoto(existingAccLogin, data.newPass)
    cy.get('[data-test="link-account"] > .text').should('contain', emailUsername);
    cy.readFile("cypress/fixtures/example.json").then((data) => {
      let { OtoPass, newPass } = data;
      let buff = OtoPass;
      OtoPass = newPass;
      newPass = buff;
      data.OtoPass = OtoPass;
      data.newPass = newPass;
      cy.writeFile("cypress/fixtures/example.json", JSON.stringify(data));
    })
  })
})