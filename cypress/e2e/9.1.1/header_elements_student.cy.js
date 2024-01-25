describe("Header elements work correctly", () => {
  beforeEach("Login as a student", () => {
    cy.login(Cypress.config("username"), Cypress.config("password"));
  });

  it("Test1: Check on nav bar elements existing", () => {
    cy.elementShouldExist("li.nav-item a span:contains('Home')");
    cy.elementShouldExist('[data-cy="entity"]');
    cy.elementShouldExist('[data-cy="docsMenu"]');
    cy.elementShouldExist('[data-cy="accountMenu"]');
    cy.elementShouldExist("li.dropdown.nav-item a span:contains('English')");
  });

  it("Test2: Task page: URL check", () => {
    cy.get('[data-cy="entity"]').click();
    cy.get('[href="/task"]').click();
    cy.location("pathname").should("eq", "/task");
  });

  it("Test3: Task page has elements 'Refresh list' and 'Create task'", () => {
    cy.get('[data-cy="entity"]').click();
    cy.get('[href="/task"]').click();
    cy.elementShouldExist(".me-2");
    cy.elementShouldExist('[data-cy="entityCreateButton"]');
  });

  it("Test4: Home page: URL check", () => {
    cy.get("li.nav-item a").contains("span", "Home").click();
    cy.location("pathname").should("eq", "/");
  });

  it("Test5: Home page has element 'Tasks'", () => {
    cy.get("li.nav-item a").contains("span", "Home").click();
    cy.elementShouldExist("h2#task-heading");
  });

  it("Test6: Swagger -> API: URL check", () => {
    cy.get('[data-cy="docsMenu"]').click();
    cy.get('[data-cy="docsMenu"] > .dropdown-menu > .dropdown-item').click();
    cy.location("pathname").should("eq", "/docs/docs");
  });

  it("Test7: Switch language: French", () => {
    cy.get("li.dropdown.nav-item a").contains("span", "English").click();
    cy.get("button[value='fr']").click();
    cy.get(".d-flex > :nth-child(2) > span").contains("span", "Accueil");
  });

  it("Test8: Switch language: Русский", () => {
    cy.get("li.dropdown.nav-item a").contains("span", "English").click();
    cy.get("button[value='ru']").click();
    cy.get(".d-flex > :nth-child(2) > span").contains("span", "Главная");
  });

  it("Test9: Switch language: Українська", () => {
    cy.get("li.dropdown.nav-item a").contains("span", "English").click();
    cy.get("button[value='ua']").click();
    cy.get(".d-flex > :nth-child(2) > span").contains("span", "Головна");
  });

  it("Test10: Account has 3 elements in drop down list", () => {
    cy.get('[data-cy="accountMenu"]').click();
    cy.elementShouldExist("[data-cy='settings']");
    cy.elementShouldExist("[data-cy='passwordItem']");
    cy.elementShouldExist('[data-cy="logout"]');
  });

  it("Test11: User Task: URL check", () => {
    cy.get('[data-cy="entity"]').click();
    cy.navigateTo('[href="/user-task"]', "/user-task");
  });
});
