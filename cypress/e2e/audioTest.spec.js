describe("Audio is played when the user clicks on a beer", () => {
  it("plays audio when a BeerCard is clicked", () => {
    // Stub:  https://docs.cypress.io/api/commands/stub#__docusaurus_skipToContent_fallback
    cy.visit("/", {
      onBeforeLoad(win) {
        // stubbing occurs before any instance of the Audio object is created when the component mounts
        cy.stub(win.Audio.prototype, "play").as("audioPlay");
      },
    });

    cy.get(".card-content img").eq(7).click();

    cy.get("@audioPlay").should("be.called");
  });
});
