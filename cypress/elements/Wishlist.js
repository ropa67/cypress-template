class AddToWishlistProduct {
  elements = {
    shop: () => cy.get('[data-cy=""]'),
    firstProductAtTheList: () => cy.get('[data-cy=""]'),
    wishlistProductValue: () => cy.get('[data-cy=""]'),
    wishlistNavigationButton: () => cy.get('[data-cy=""]'),
    productCart: () => cy.get('[data-cy=""]'),
    productWishlistButton: () => cy.get('[data-cy=""]'),
    productCategories: () => cy.get('[data-cy=""]'),
  }

  clickShopLink() {
    this.elements.shop().first().trigger('mouseover')
    this.elements.productCategories().first().click()
  }

  clickProductOnProductListPage() {
    this.elements.shop().clickOutside()
    cy.intercept('POST', '**/getProduct').as('getProduct')
    this.elements.firstProductAtTheList().first().click()
  }

  clickAddWishlistButton() {
    cy.wait('@getProduct')
      .its('response.statusCode').should('eq', 200)
    this.elements.productWishlistButton().click()
  }

  openWishlistPage() {
    this.elements.wishlistNavigationButton().click()
  }

  checkWishlistProductValue() {
    this.elements.wishlistProductValue().contains('1')
  }

  checkNewlyAddedProductToWishList() {
    this.elements.productCart().should('be.visible')
  }
}
module.exports = new AddToWishlistProduct()
