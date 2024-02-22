describe("Login with MetaMask", () => {
  it("Visits the Beer Punk", () => {
    cy.visit("http://localhost:5173/");

    cy.contains("Connect wallet").click();
    // The presence of MetaMask extension can't be directly checked due to the nature of Cypress
    // this needs manual QA
  });
});
