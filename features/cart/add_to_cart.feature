Feature: Shopping cart

  Scenario: Cart reflects correct quantity and subtotal when adding a product
    Given I am logged in
    And I am on the product catalog page
    When I add 2 units of the first product to the cart
    Then the cart should show a line total equal to the unit price times 2