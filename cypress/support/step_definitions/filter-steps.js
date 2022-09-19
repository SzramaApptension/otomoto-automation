import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";

let carsCount = 0;
let number = 0;
let price = 0;

Given("I access otomoto page", () => {
    cy.visit("//");
    cy.viewport(1920,1080);
    cy.get('#onetrust-accept-btn-handler').click();
})

And("I select typ nadwozia {word}", (nadwozie) => {
    cy.get('#filter_enum_body_type').type(nadwozie).type('{enter}');
    cy.get('.ds-select-clear-icon').should('have.length', 1);
})

And("I select marka pojazdu {word}", (marka) => {
    cy.get('#filter_enum_make').type(marka).type('{enter}');
    cy.get('.ds-select-clear-icon').should('have.length', 2);
})

And("I select max_price {word}", (max) => {
    cy.get(".ds-select").eq(5).type(max).type('{enter}');
    cy.get('.ds-select-clear-icon').should('have.length', 3);
})

When("I click on pokaz button", () => {
    cy.get('[data-testid="submit-btn"]').click();
})

Then('I should be presented with the cars that meets the expectations {word} {word} {word}', (nadwozie, marka, max) => {
    cy.get("[class='ooa-17z33ro'] [type='text']").should('have.value', nadwozie);
    cy.get("[class='ooa-1obpyoo'][type='text']").invoke('attr', 'placeholder').should('contain', marka);
    cy.get("div:nth-of-type(5) > div > div:nth-of-type(2) input[role='combobox']").invoke('attr', 'value').should('contain', addSpacesInNumber(max));

    cy.get("[data-testid='listing-ad']").then(($cars) => {
        carsCount = Cypress.$($cars).length;
        cy.log(carsCount);
    }).then(() => {
        cy.get(".ooa-x3g7qd-Text").invoke('text').then((text1) => {
            number = parseInt(text1.toString().replace(/\D/g, ''), 10);
            cy.log(number);
            cy.get('body').then($body => {
                if ($body.find('[data-testid="pagination-list"]').length) {
                    cy.get('[data-testid="pagination-list"]').should('contain', Math.ceil(number / carsCount));
                }
                else {
                    expect(carsCount).to.eq(number);
                }
            }).then(() => {
                cy.get("[data-testid='listing-ad']").each(($el, index, list) => {
                    cy.wrap($el).should('contain', marka);
                }).then(() => {
                    cy.get("[data-testid='listing-ad'] .e1b25f6f8").each(($el, index, list) => {
                        cy.wrap($el).invoke('text').then((text2) => {
                            price = parseInt(text2.toString().replace(/\D/g, ''), 10);
                            expect(price).to.not.be.greaterThan(parseInt(max, 10));
                        })
                    })
                })
            })
        })
    })
})

const addSpacesInNumber = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
