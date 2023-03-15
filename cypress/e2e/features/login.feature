Feature: Login page

    Feature Login modal will work depending on the user credentials.

    Background:
        Given A user opens a website and open login modal
    Scenario: Success Login
        When A user enters the username "", the password "", and clicks on the login button
        And A user goes to My Profile
        Then The url will contains the inventory subdirectory
    # Scenario: Not verified User
    #     When A user enters the username ""
    #     And A user enters the password ""
    #     And A user clicks on the login button
    #     Then The error message "" is displayed
    Scenario: Incorrect Username Login
        When A user provides incorrect credentials, and clicks on the login button
            | username  | password     |
            | Test@incorrect.com  | passwordIncorect123 |
        Then The error message "Customer account with the given credentials not found" is displayed
    Scenario: Incorrect Password Login
        When A user provides incorrect credentials, and clicks on the login button
            | username  | password     |
            | Test@incorrect.com  | passwordIncorect123 |
        Then The error message "Customer account with the given credentials not found" is displayed