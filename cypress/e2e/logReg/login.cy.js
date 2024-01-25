const testData = require("../../../fixtures/loginData.json");

describe("Login tests", () => {
  it("Test 1: login with valid data", () => {
    cy.login("qwerty2", "qwerty2");
    cy.elementShouldExist('[data-cy="entity"]');
  });

  it("Tests 2-5: login with invalid data", () => {
    testData.forEach((item) => {
      cy.login(item.username, item.password);
      cy.elementShouldNotExist('[data-cy="entity"]');
    });
  });
});
