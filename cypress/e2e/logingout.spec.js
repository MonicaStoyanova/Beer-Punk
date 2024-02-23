describe("Logout Functionality", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("successfully logs out the user and shows them a message", () => {
    cy.get(".disconnectBtn").click();
    cy.contains("Wallet disconnected successfully.").should("be.visible");
    cy.wait(2000); // Wait for the navigation timeout
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});
