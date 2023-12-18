export class HomePage{
    elements = {
        accountList: ()=> cy.get('[data-cy="accountMenu"]'),
        passwordBtn: ()=> cy.get("[data-cy='passwordItem']"),
        signOutBtn: ()=> cy.get('[data-cy="logout"]') 
    }

    signOut(){
        this.elements.accountList().click();
        this.elements.signOutBtn().click()
    }
}