describe("Header elements work correctly", () => {
  beforeEach("Login as a student", () => {
    cy.visit("/login");
    cy.get("#username").type("qwerty2");
    cy.get("#password").type("qwerty2");
    cy.get('[data-cy="submit"]').click();
  });
  it("Test1: Check on nav bar elements existing", () => {
    cy.get("li.nav-item a").contains("span", "Home").should("exist");
    cy.get('[data-cy="entity"]').should("exist");
    cy.get('[data-cy="docsMenu"]').should("exist");
    cy.get('[data-cy="accountMenu"]').should("exist");
    cy.get("li.dropdown.nav-item a")
      .contains("span", "English")
      .should("exist");
  });
  it("Test2: Task page: URL check", () => {
    cy.get('[data-cy="entity"]').click();
    cy.get('[href="/task"]').click();
    cy.location("pathname").should("eq", "/task");
    cy.location("search").should("eq", "?page=1&sort=id,asc");
  });
  it("Test3: Task page has elements 'Refresh list' and 'Create task'", () => {
    cy.get('[data-cy="entity"]').click();
    cy.get('[href="/task"]').click();
    cy.get(".me-2").should("exist");
    cy.get('[data-cy="entityCreateButton"]').should("exist");
  });
  it("Test4: Home page: URL check", () => {
    cy.get("li.nav-item a").contains("span", "Home").click();
    cy.location("pathname").should("eq", "/");
  });
  it("Test5: Home page has element 'Tasks'", () => {
    cy.get("li.nav-item a").contains("span", "Home").click();
    cy.get("h2#task-heading").should("exist");
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
    cy.get("[data-cy='settings']").should("exist");
    cy.get("[data-cy='passwordItem']").should("exist");
    cy.get('[data-cy="logout"]').should("exist");
  });
  it("Test11: User Task: URL check", () => {
    cy.get('[data-cy="entity"]').click();
    cy.get('[href="/user-task"]').click();
    cy.location("pathname").should("eq", "/user-task");
  });
});
