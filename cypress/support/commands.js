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
Cypress.Commands.add("login", (username, password) => {
  cy.visit("/login");

  if (username !== "") {
    cy.get("#username").type(username);
  }

  if (password !== "") {
    cy.get("#password").type(password);
  }

  cy.get('[data-cy="submit"]').click();
});

Cypress.Commands.add("navigateTo", (selector, url) => {
  cy.get(selector).click();
  cy.location("pathname").should("eq", url);
});

Cypress.Commands.add("elementShouldExist", (selector) => {
  cy.get(selector).should("exist");
});


Cypress.Commands.add("elementShouldNotExist", (selector) => {
  cy.get(selector).should('not.exist');
});

Cypress.Commands.add("registration", (username, email, password, confirmPassword) => {
  cy.visit("/account/register");

  if (username !== "") {
    cy.get("#username").type(username);
  }

  if (email !== "") {
    cy.get("#email").type(email);
  }

  if (password !== "") {
    cy.get("#firstPassword").type(password);
  }

  if (confirmPassword !== "") {
    cy.get("#secondPassword").type(confirmPassword);
  }

  cy.get('[data-cy="submit"]').click();
});