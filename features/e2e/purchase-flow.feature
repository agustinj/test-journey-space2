Feature: End-to-end purchase journey

    Scenario: Complete purchase flow from catalog to confirmation
        Given I am logged in
        And I am on the product catalog page
        When I search for "Hammer"
        And I open the details of the first product in the results
        And I add 1 unit of the product to the cart
        And I proceed to checkout
        And I fill in a valid billing address
        And I proceed from the address step
        And I pay with "cash-on-delivery"
        Then the order should be placed successfully