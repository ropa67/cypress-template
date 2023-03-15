import { Given, Then } from '@badeball/cypress-cucumber-preprocessor'

const wishList = require('../../elements/Wishlist')

Given('A user opens a Philoro Website Homepage', () => {
  cy.visit('/')
})
Then('A User go to Product List Page', () => {
  wishList.clickShopLink()
})

Then('A User go to PDP', () => {
  wishList.clickProductOnProductListPage()
})

Then('A user click on the heart icon', () => {
  cy.intercept('POST', '**/addToMyShoppingList').as('addToMyShoppingList')
  wishList.clickAddWishlistButton()
  cy.wait('@getProduct')
    .its('response.statusCode').should('eq', 200)
})

Then('A user go to the wishlist page', () => {
  wishList.openWishlistPage()
})

Then('Badge icon show correct value of product count', () => {
  wishList.checkWishlistProductValue()
})

Then('Newly added product is displayed', () => {
  wishList.checkNewlyAddedProductToWishList()
})
