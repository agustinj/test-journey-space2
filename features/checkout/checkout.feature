Feature: Checkout

  Scenario: Completing billing address with all required fields enables proceeding
    Given I am logged in
    And I am on the product catalog page
    And I have added 1 unit of a product to the cart
    When I proceed to checkout
    And I fill in a valid billing address
    Then the proceed button should be enabled

  Scenario: Missing a required field in billing address keeps the proceed button disabled
    Given I am logged in
    And I am on the product catalog page
    And I have added 1 unit of a product to the cart
    When I proceed to checkout
    And I fill in a billing address without a city
    Then the proceed button should be disabled

  Scenario Outline: Completing checkout with different payment methods
    Given I am logged in
    And I am on the product catalog page
    And I have added 1 unit of a product to the cart
    When I proceed to checkout
    And I fill in a valid billing address
    And I pay with "<payment_method>"
    Then the order should be placed successfully

    Examples:
      | payment_method    |
      | cash-on-delivery  |
      | bank-transfer     |