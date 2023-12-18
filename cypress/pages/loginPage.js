export class LoginPage {
  elements = {
    usernameField: () => cy.get("#username"),
    passwordField: () => cy.get("#password"),
    submitBtn: () => cy.get('[data-cy="submit"]'),
    errorElement: () => cy.get('[data-cy="loginError"]'),
  };

  login(login, password) {
    cy.visit("/login");
    this.elements.usernameField().type(login);
    this.elements.passwordField().type(password);
    this.elements.submitBtn().click();
  }
}
