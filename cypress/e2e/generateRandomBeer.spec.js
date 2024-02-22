describe("Random Beer Functionality", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://api.punkapi.com/v2/beers/random").as(
      "fetchRandomBeer"
    );
    cy.visit("/");
  });

  it("should fetch and display a new random beer each time 'Random Beer' is clicked", () => {
    cy.get("button").contains("Random Beer").click();
    cy.wait("@fetchRandomBeer").its("response.statusCode").should("eq", 200);
    cy.get(".card").should("have.length", 1).and("be.visible");
    cy.get(".card h3")
      .invoke("text")
      .then((firstBeerName) => {
        cy.get("button").contains("Random Beer").click();
        cy.wait("@fetchRandomBeer")
          .its("response.statusCode")
          .should("eq", 200);
        cy.get(".card").should("have.length", 1).and("be.visible");
        cy.get(".card h3").invoke("text").should("not.eq", firstBeerName);
      });
  });
});
