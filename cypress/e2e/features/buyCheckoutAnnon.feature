Feature: Buy Checkout as Annon

    Background:
        Given A user opens a website and go to the product listing page
    Scenario: Success Checkout Process As Annon
        Then A user click on Buy button on product card
        Then Badge icon in MiniCart show correct value of product count
        Then User Goes to MiniCart
        Then Value in MiniCart is correct
        Then User click Checkout button
        Then User check the value in Totals section and click To Checkout button
        Then User profide email "email@email.com" and click Go To Shopping button
        Then User provide Shipping addres Title, firstName "", lastName "", streetName "", apartment "", zipCode "", city "", phone "", country, state, and click Go To Payment button
        Then User click Copy address data from shipping and check if provided datas are correct firstName "", lastName "", streetName "", apartment "", zipCode "", city "", phone "", letter he click Save Changes and Go To Review Order button
        Then Check values at Confirmation screen, accept Terms and Conditions, Privacy Policy and click Place Order button
        Then Success Page is displayed and click Back To Home Page
