// click on 3 stars then go to favorites and see if the are there
// if there click to remove one
// back to home click one that was added to see if it gets removed

// describe("Adding to favorites", () => {
//   it("Clicking stars", () => {
//     cy.visit("/");
//cy.get("button").contains("Add to favorites").click();
// cy.get("#star", { timeout: 10000 }).click();
// cy.get('button[title="Add to favorites"]', { timeout: 10000 })
//   .first()
//   .click();
// cy.get("button").find("._starIcon_1dnyp_77");
//cy.contains("._starIcon_1dnyp_77").eq(0).click();
//cy.contains("._starIcon_1dnyp_77").eq(3).click();
//cy.contains("._starIcon_1dnyp_77").eq(5).click();
//cy.contains("._starIcon_1dnyp_77").eq(8).click();
// remove the one in index 3
//cy.contains("._starIcon_1dnyp_77").eq(3).click();
//});
/*
  it("Beers are in favorites", () => {
    cy.visit("/favorite");
    // check if 0 5 8
    // remove 8
  });
  */
//});
describe("BeerCard Star Click Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("clicks stars at indexes 0, 3, 5, and 8", () => {
    const indexes = [0, 3, 5, 8];

    // Ensure the page has loaded by checking for the presence of beer cards

    cy.get("#card-content", { timeout: 10000 }).should("exist");

    // Loop through the specified indexes and click the star on each BeerCard
    indexes.forEach((index) => {
      cy.get("#card-content")
        .eq(index)
        .then((card) => {
          cy.wrap(card).find("#star").click();
        });
    });
  });
});
