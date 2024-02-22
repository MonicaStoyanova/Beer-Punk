describe("BeerCard Star Click Test adds to favorites", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("adds beers to favorites by clicking stars at indexes 0, 3, 5, and 8", () => {
    const indexes = [0, 3, 5, 8];
    const expectedFavoritesCount = indexes.length - 1;
    // Checking for the presence of beer cards
    cy.get(".card-content", { timeout: 10000 }).should(
      "have.length.at.least",
      1
    );
    // Loop through the specified indexes and click the star on each BeerCard
    indexes.forEach((index) => {
      cy.get(".card").eq(index).find(".star-icon").click();
    });
    // Removes one beer that was previously clicked
    cy.get(".card").eq(3).find(".star-icon").click();

    cy.visit("/favorite");
    // Ensure the page has loaded by checking for the presence of beer cards
    cy.get(".card-content", { timeout: 10000 }).should(
      "have.length",
      expectedFavoritesCount
    );
    // Remove one item from favorites by clicking its star
    cy.get(".card").eq(0).find(".star-icon").click();
    // Verify the item has been removed by checking the length again
    cy.get(".card-content").should("have.length", expectedFavoritesCount - 1);
  });
});
