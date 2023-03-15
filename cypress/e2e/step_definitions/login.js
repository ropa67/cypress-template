import { Given, When, And, Then } from '@badeball/cypress-cucumber-preprocessor'
const loginPage = require('../../elements/LoginPage').default

Given('A user opens a website and open login modal', () => {
  cy.visit('/')
  loginPage.clickMyAccount()
})

When('A user enters the username {string}, the password {string}, and clicks on the login button', (username, password) => {
  loginPage.submitLogin(username, password)
  loginPage.waitToLogin()
})

And('A user goes to My Profile', () => {
  loginPage.clickMyAccount()
})

When('A user provides incorrect credentials, and clicks on the login button', (table) => {
  table.hashes().forEach((row) => {
    loginPage.submitLogin(row.username, row.password)
  })
})

Then('The error message {string} is displayed', (errorMessage) => {
  loginPage.elements.errorMessage().should('have.text', errorMessage)
})

Then('The url will contains the inventory subdirectory', () => {
  loginPage.checkMyAccountPage()
})
