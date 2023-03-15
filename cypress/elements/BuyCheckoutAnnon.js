/* eslint-disable object-curly-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable space-before-blocks */
/* eslint-disable semi */
/* eslint-disable quotes */
class BuyCheckoutAnnon {
  elements = {
    // Menu & Mini Cart
    shop: () => cy.get('[data-cy=""]'),
    goldBarsCategory: () => cy.contains(""),
    buyButton: () => cy.get('[data-cy=""]'),
    basketNavigationButton: () => cy.get('[data-cy=""]'),
    quantity: () => cy.get('[data-cy=""]'),
    checkoutMiniCart: () => cy.contains(''),
    productCard: () => cy.get('[data-cy=""]'),
    productsTotals: () => cy.get('[data-cy=""]'),
    toCheckoutButton: () => cy.get('[data-cy=""]'),

    // Checkout
    emailInput: () => cy.get('[data-cy=""]'),
    toShoppingButton: () => cy.get('[data-cy=""]'),

    // Address
    title: () => cy.get('[data-cy=""]'),
    firstName: () => cy.get('[data-cy=""]').first(),
    lastName: () => cy.get('[data-cy=""]').first(),
    streetName: () => cy.get('[data-cy=""]').first(),
    apartment: () => cy.get('[data-cy=""]').first(),
    streetNumber: () => cy.get('[data-cy=""]').first(),
    zipCode: () => cy.get('[data-cy=""]').first(),
    city: () => cy.get('[data-cy=""]').first(),
    country: () => cy.get('[data-cy=""]').first(),
    state: () => cy.get('[data-cy=""]').first(),
    select: () => cy.get('[data-cy=""]').first(),
    phone: () => cy.get('[data-cy=""]').first(),
    saveChangesButton: () => cy.get('[data-cy=""]').first(),
    checkBox: () => cy.get('[data-cy=""]').click({multiple: true}),
    goToReview: () => cy.get('[data-cy=""]').first(),

    // Confirmation
    img: () => cy.get('[data-cy=""]'),
    nameAndQuantity: () => cy.get('[data-cy=""]'),
    productSku: () => cy.get('[data-cy=""]'),
    productPrice: () => cy.get('[data-cy=""]'),
    productTotalPrice: () => cy.get('[data-cy=""]'),
    taxPrice: () => cy.get('[data-cy=""]'),
    shippingPrice: () => cy.get('[data-cy=""]'),
    totalPrice: () => cy.get('[data-cy=""]'),
    billingAddressReview: () => cy.get('[data-cy=""]'),
    paymentMethod: () => cy.get('[data-cy=""]'),
    deliveryAddressReview: () => cy.get('[data-cy=""]'),
    deliveryReview: () => cy.get('[data-cy=""]'),
    placeOrderButton: () => cy.get('[data-cy=""]'),
    modal: () => cy.get('[data-cy=""]'),
    confirmButton: () => cy.get('[data-cy=""]'),
    orderNumber: () => cy.get('[data-cy=""]'),
    backToHomePage: () => cy.get('[data-cy=""]'),
  };

  // Methods
  clickShopLink() {
    this.elements.shop().first().trigger("mouseover");
    this.elements.goldBarsCategory().click({ force: true });
    // intercept need to be implemented before sending request
    cy.intercept('POST', `**/getProduct`).as('getProduct')
  }

  clickBuyProductOnProductListPage() {
    this.elements.shop().clickOutside();
    cy.wait('@getProduct', { timeout: 10000 })
      .its('response.statusCode').should('eq', 200)

    this.elements.buyButton().first().click({ force: true });
    cy.intercept('POST', `**/line-items`).as('lineItems')
  }

  checkNewlyAddedProductToTheBasket() {
    cy.wait('@lineItems', {timeout:10000})
      .its('response.statusCode').should('eq', 201)
    this.elements.basketNavigationButton().contains('1')
  }

  openMiniCart() {
    this.elements.basketNavigationButton().click({ force: true })
  }

  valuesInMiniCart() {
    cy.wait('@getProduct', { timeout: 10000 })
      .its('response.statusCode').should('eq', 200)
    this.elements.quantity().contains('1')
  }

  clickCheckoutButton() {
    this.elements.checkoutMiniCart().click({ force: true })
    cy.intercept('POST', `**/getProduct`).as('getProduct')
  }

  checkBasketProduct(){
    this.elements.productCard().should('be.visible')
    this.elements.productsTotals().contains('1')
    cy.wait('@getProduct', { timeout: 10000 })
      .its('response.statusCode').should('eq', 200)
    this.elements.toCheckoutButton().click()
  }

  emailInput(email) {
    this.elements.emailInput().type(email)
    this.elements.toShoppingButton().click({ force: true })
  }

  shippingAddressInputs(firstName, lastName, streetName, apartment, zipCode, city, phone) {
    // Fill shipp address
    this.elements.title().contains('Mr')
    this.elements.firstName().type(firstName)
    this.elements.lastName().type(lastName)
    this.elements.streetName().type(streetName)
    this.elements.apartment().type(apartment)
    this.elements.zipCode().type(zipCode)
    this.elements.city().type(city)
    this.elements.country().contains('US')
    this.elements.state().click({ force: true })
    this.elements.select().contains('Alabama').click()
    this.elements.phone().type(phone)
    this.elements.saveChangesButton().click({ force: true })
    cy.intercept('POST', `**/setShippingMethod`).as('setShippingMethod')
  }

  billingAddressInputs(firstName, lastName, streetName, apartment, zipCode, city, phone){
    cy.wait('@setShippingMethod', { timeout: 10000 })
      .its('response.statusCode').should('eq', 200)

    // Fill billing address inputs with datas from shipp address
    this.elements.checkBox()

    // Request assertion
    cy.intercept('POST', `**/setBilling`).as('setBillingAddress')
    cy.contains('Save Changes').click()
    cy.url().should('contains', '/checkout/buy')

    cy.wait('@setBillingAddress', { timeout: 10000 })
      .its('response.statusCode').should('eq', 200)

    cy.get('@setBillingAddress').its('response.body.billingAddress')
      .should("have.property", "apartment", apartment)

    cy.get('@setBillingAddress').its('response.body.billingAddress')
      .should("have.property", "city", city)

    cy.get('@setBillingAddress').its('response.body.billingAddress')
      .should("have.property", "firstName", firstName)

    cy.get('@setBillingAddress').its('response.body.billingAddress')
      .should("have.property", "lastName", lastName)

    cy.get('@setBillingAddress').its('response.body.billingAddress')
      .should("have.property", "phone", phone)

    cy.get('@setBillingAddress').its('response.body.billingAddress')
      .should("have.property", "postalCode", zipCode)

    cy.get('@setBillingAddress').its('response.body.billingAddress')
      .should("have.property", "state", 'Alabama')

    cy.get('@setBillingAddress').its('response.body.billingAddress')
      .should("have.property", "streetName", streetName)

    cy.get('@setBillingAddress').its('response.body.billingAddress')
      .should("have.property", "title", 'Mr.')

    cy.intercept('POST', `**/recalculate`).as('recalculate')
    this.elements.goToReview().click({ force: true })
  }

  confirmationScreen() {
    cy.wait('@recalculate', { timeout: 10000 })
      .its('response.statusCode').should('eq', 200)

    // Simplt assertion
    this.elements.img().should('be.visible')
    this.elements.nameAndQuantity().should('be.visible')
    this.elements.productSku().should('be.visible')
    this.elements.productPrice().should('be.visible')
    this.elements.productTotalPrice().should('be.visible')
    this.elements.taxPrice().should('be.visible')
    this.elements.totalPrice().should('be.visible')
    this.elements.billingAddressReview().contains('Mr.')
    this.elements.productSku().should('be.visible')
    this.elements.paymentMethod().contains('Bank Transfer')
    this.elements.deliveryReview().contains('Standard Delivery')
    this.elements.deliveryReview().should('be.visible')
    cy.intercept('POST', `**/orders`).as('orders')

    // Modal catch
    cy.get('body').then(($body) => {
      if ($body.find('#modal').length > 0) {
        this.elements.confirmButton().click({ force: true })
        // click all checkbox
        this.elements.checkBox()

        this.elements.placeOrderButton().click({ force: true })
      } else {
        // click all checkbox
        this.elements.checkBox()
        this.elements.placeOrderButton().click({ force: true })
      }
    })
  }

  succesPage() {
    cy.wait('@orders', { timeout: 10000 })
      .its('response.statusCode').should('eq', 201)

    cy.get('@orders').its('response.body.order')
      .should("have.property", "currencyCode", 'USD')

    cy.get('@orders').its('response.body.order')
      .should("have.property", "customerEmail", '')

    cy.get('@orders').its('response.body.order')
      .should("have.property", "orderNumber")

    cy.get('@orders').its('response.body.order')
      .should("have.property", "orderType", 'order')

    cy.get('@orders').its('response.body.order')
      .should("have.property", "transactionType", 'buy')

    cy.get('@orders').its('response.body.order.lineItems.0')
      .should("have.property", "quantity", 1)

    cy.get('@orders').its('response.body.order')
      .should("have.property", "anonymousId")

    this.elements.orderNumber().should('be.visible')
    this.elements.backToHomePage().click({ force: true })
    this.elements.basketNavigationButton().should('not.exist')
  }
}

export default new BuyCheckoutAnnon();
