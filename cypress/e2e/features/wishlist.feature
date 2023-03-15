Feature: Add Product to Wishlist

    Feature Wishlist should work as in BR. After clicking on the heart icon, the product should be added to the wishlist, and number with the already added products should update

     Scenario: Success Wishlist Added Product
        Given A user opens a Philoro Website Homepage
        When A User go to Product List Page 
        And A User go to PDP
        And A user click on the heart icon
        And A user go to the wishlist page
        Then Badge icon show correct value of product count 
        Then Newly added product is displayed 
    