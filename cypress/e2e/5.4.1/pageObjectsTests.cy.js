import { faker } from "@faker-js/faker";
const loginPage = require("../../fixtures/loginPageElements.json");
const homePage = require("../../fixtures/homePageElements.json");
const changePasswordPage = require("../../fixtures/changePasswordElements.json");

describe("Changing password via UI", () => {
  let username = "qwerty2";
  let oldPassword = "qwerty2";
  let newPassword = faker.internet.password({ length: 9 });

  it("User can't login with the old password", () => {
    cy.login(username, oldPassword);
    cy.get(homePage.accountList).click();
    cy.get(homePage.passwordBtn).should("exist");
    cy.get(homePage.passwordBtn).click();
    cy.changePassword(oldPassword, newPassword);
    cy.signOut();

    cy.login(username, oldPassword);
    cy.get(loginPage.errorElement).should("exist");
    cy.get(loginPage.passwordField).clear().type(newPassword);
    cy.get(loginPage.submitBtn).click();

    cy.get(homePage.accountList).click();
    cy.get(homePage.passwordBtn).click();
    cy.changePassword(newPassword, oldPassword);
  });
});
