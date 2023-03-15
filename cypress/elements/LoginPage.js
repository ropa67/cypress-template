import config from '@/config/default.json'

class LoginToAccount {
  elements = {
    emailInput: () => cy.get('#'),
    passwordInput: () => cy.get('#'),
    loginBtn: () => cy.get('#'),
    myAccount: () => cy.get('#'),
    errorMessage: () => cy.get('#'),
  }

  submitLogin(username, password) {
    this.typeUsername(username)
    this.typePassword(password)
    this.elements.loginBtn().click()
  }

  typeUsername(username) {
    this.elements.emailInput().type(username)
  }

  typePassword(password) {
    this.elements.passwordInput().type(password)
  }

  clickLogin() {
    this.elements.loginBtn().click()
  }

  clickMyAccount() {
    this.elements.myAccount().click()
  }

  waitToLogin() {
    cy.intercept('POST', `${config.smthng.baseUrl}/${config.smthng.endpoints.customers.merge}`).as('mergeRequest')
    cy.wait('@mergeRequest')
  }

  checkMyAccountPage() {
    cy.url().should('contains', '/my-account/profile')
  }
}

export default new LoginToAccount()
