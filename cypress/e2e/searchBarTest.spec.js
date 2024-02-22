describe("Search Bar exists and Typing in it changes what renders", () => {
  it("fetches beer suggestions based on user input with debouncing", () => {
    cy.visit("/");
    cy.intercept("GET", "**/v2/beers?beer_name=*").as("getBeerSuggestions");
    cy.get("input").type("tras");
    cy.wait("@getBeerSuggestions").its("request.url").should("include", "tras");
    cy.get(".card").should("have.length.greaterThan", 0);
  });

  it('displays "No beers found" when search yields no results', () => {
    cy.intercept("GET", "**/v2/beers?beer_name=unknown", []).as("getNoResults");
    cy.visit("/");
    cy.get('input[name="search"]').type("unknown");
    cy.wait("@getNoResults");
    cy.contains("No beers found").should("be.visible");
  });

  it("restores initial beer cards when search input is cleared", () => {
    cy.visit("/");
    cy.intercept("GET", "**/v2/beers").as("getAllBeers");
    cy.get('input[name="search"]').type("tras").clear();
    cy.wait("@getAllBeers");
    cy.get(".card").should("have.length", 25);
  });
});
