Feature: Shopping cart

  Scenario: Cart reflects correct quantity and subtotal when adding a product
    Given I am logged in
    And I am on the product catalog page
    When I add 2 units of the first product to the cart
    Then the cart should show a line total equal to the unit price times 2

  Scenario: Updating quantity in the cart recalculates the line total
    Given I am logged in
    And I am on the product catalog page
    And I have added 2 units of a product to the cart
    When I update the quantity to 5 in the cart
    Then the cart should show a line total equal to the unit price times 5

  Scenario: Removing a product from the cart recalculates the total
    Given I am logged in
    And I am on the product catalog page
    And I have added 2 units of a product to the cart
    And I have added 1 unit of another product to the cart
    When I remove the first product from the cart
    Then the cart total should equal the remaining product's line total