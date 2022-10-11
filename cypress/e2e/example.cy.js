/// <reference types="Cypress" />

describe("empty spec", () => {
  it("passes", () => {
    cy.visit("localhost:4242");
    cy.contains("title one").click();
    cy.contains("lesson one").click();
    cy.url().should("include", "/flashCards/1");
  });

  it("fails", () => {
    expect(true).to.equal(false);
  });
});
