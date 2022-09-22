/// <reference types="cypress" />

describe("Validate if followed offers appears in dedicated page", () => {
  let carName = "";

  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1920, 1080);
    cy.get("#onetrust-accept-btn-handler").click();
  });

  it("Follow the offer", () => {
    cy.get('[data-testid="ad-image"]').click();
    cy.get(".offer-summary > .offer-title").then(($name) => {
      carName = Cypress.$($name).text();
      cy.log(carName);
      cy.get('[data-testid="switch"]').click();
      cy.get("#saveFavCancel").click();
      cy.get(".counter").should("contain", "1");
      cy.get("#observed-counter > .icon-observe-heart_Active").click();
      cy.get('[data-testid="ad-thumbnail"]').click();
      cy.get(".offer-summary > .offer-title").should(
        "contain",
        carName.toString()
      );
    });
  });
});
