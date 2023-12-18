import {faker} from "@faker-js/faker";
import { LoginPage } from "../../pages/loginPage";
import { HomePage } from "../../pages/homePage";
import { ChangePasswordPage } from "../../pages/changePasswordPage";

describe("Changing password via UI", () => {
  let username = "qwerty2";
  let oldPassword = "qwerty2";
  let newPassword = faker.internet.password({ length: 9 });
  let homePage = new HomePage();
  let changePasswordPage = new ChangePasswordPage();
  let loginPage = new LoginPage();

  it("User can't login with the old password", () => {
    loginPage.login(username, oldPassword);
    homePage.elements.accountList().click();
    homePage.elements.passwordBtn().should("exist");
    homePage.elements.passwordBtn().click();
    changePasswordPage.changePassword(oldPassword, newPassword);
    homePage.signOut();

    loginPage.login(username, oldPassword);
    loginPage.elements.errorElement().should('exist');
    loginPage.elements.passwordField().clear().type(newPassword);
    loginPage.elements.submitBtn().click();

    homePage.elements.accountList().click();
    homePage.elements.passwordBtn().click();
    changePasswordPage.changePassword(newPassword, oldPassword);
  });
});
