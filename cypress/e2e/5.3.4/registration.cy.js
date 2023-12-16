const testData = require("../../fixtures/registrationData.json");

describe("Login tests", () => {
//   it("Test 1: Registration with valid data", () => {
//     cy.registration("Hello", "helloworld@hello.com", "Hello!123", "Hello!123");
//     cy.elementShouldNotExist(".invalid-feedback");
//   });

  it("Tests: Registration with invalid data", () => {
    testData.forEach((item) => {
      cy.registration(
        item.username,
        item.email,
        item.firstPassword,
        item.secondPassword
      );
      cy.elementShouldExist(".invalid-feedback");
    });
  });
});
