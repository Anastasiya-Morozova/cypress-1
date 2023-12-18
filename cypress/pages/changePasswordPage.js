export class ChangePasswordPage {
  elements = {
    oldPasswordField: () => cy.get("#currentPassword"),
    newPasswordField: () => cy.get("#newPassword"),
    confirmPasswordField: () => cy.get("#confirmPassword"),
    submitBtn: () => cy.get('[data-cy="submit"]')
  };

  changePassword(oldPassword, newPassword) {
    this.elements.oldPasswordField().type(oldPassword);
    this.elements.newPasswordField().type(newPassword);
    this.elements.confirmPasswordField().type(newPassword);
    this.elements.submitBtn().click();
  }
}
