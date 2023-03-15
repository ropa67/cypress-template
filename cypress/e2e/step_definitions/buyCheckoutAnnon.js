/* eslint-disable semi */
/* eslint-disable quotes */
import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
const checkout = require("../../elements/BuyCheckoutAnnon.js").default;

Given("A user opens a website and go to the product listing page", () => {
  cy.visit("/");
  checkout.clickShopLink();
});

Then("A user click on Buy button on product card", () => {
  checkout.clickBuyProductOnProductListPage();
});

Then("Badge icon in MiniCart show correct value of product count", () => {
  checkout.checkNewlyAddedProductToTheBasket();
});

Then("User Goes to MiniCart", () => {
  checkout.openMiniCart();
});

Then("Value in MiniCart is correct", () => {
  checkout.valuesInMiniCart();
});

Then("User click Checkout button", () => {
  checkout.clickCheckoutButton();
});

Then("User check the value in Totals section and click To Checkout button", () => {
  checkout.checkBasketProduct();
});

Then("User profide email {string} and click Go To Shopping button", (email) => {
  checkout.emailInput(email)
});

Then("User provide Shipping addres Title, firstName {string}, lastName {string}, streetName {string}, apartment {string}, zipCode {string}, city {string}, phone {string}, country, state, and click Go To Payment button", (firstName, lastName, streetName, apartment, zipCode, city, phone) => {
  checkout.shippingAddressInputs(firstName, lastName, streetName, apartment, zipCode, city, phone)
});

Then("User click Copy address data from shipping and check if provided datas are correct, letter he click Save Changes and Go To Review Order button", (firstName, lastName, streetName, apartment, zipCode, city, phone) => {
  checkout.shippingAddressInputs(firstName, lastName, streetName, apartment, zipCode, city, phone)
});

Then("User click Copy address data from shipping and check if provided datas are correct firstName {string}, lastName {string}, streetName {string}, apartment {string}, zipCode {string}, city {string}, phone {string}, letter he click Save Changes and Go To Review Order button", (firstName, lastName, streetName, apartment, zipCode, city, phone) => {
  checkout.billingAddressInputs(firstName, lastName, streetName, apartment, zipCode, city, phone)
});

Then("Check values at Confirmation screen, accept Terms and Conditions, Privacy Policy and click Place Order button", () => {
  checkout.confirmationScreen();
});

Then("Success Page is displayed and click Back To Home Page", () => {
  checkout.succesPage();
})
