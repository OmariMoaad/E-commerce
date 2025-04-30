describe("Product", () => {
  it("should add product to cart", () => {
    cy.visit("http://localhost:3000/");
    cy.get(".navbar").contains("men").click();
    cy.get(".item").first().click();
    cy.get('button').contains("Add To Cart").click();
    cy.get('img[id="cart"]').click();
    
    cy.get("#items").children().should("have.length", 2);
  });
});
