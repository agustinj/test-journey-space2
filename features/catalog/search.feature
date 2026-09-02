Feature: Product catalog search

  Scenario: Search for an existing product returns matching results
    Given I am on the product catalog page
    When I search for "Hammer"
    Then all displayed products should contain "Hammer" in their name

  Scenario: Searching by a partial word does not match all products containing it (known defect)
    Given I am on the product catalog page
    When I search for "hammer"
    Then the results should include a product named "Sledgehammer"

  Scenario: Filtering by category shows only products from that category
    Given I am on the product catalog page
    When I filter by category "Hammer"
    Then the results should include a product named "Sledgehammer"
    And there should be 7 products in the results

  Scenario: Product details match what was shown in the catalog
    Given I am on the product catalog page
    When I open the details of the first product in the results
    Then the product name, price and sustainability rating should match what was shown in the catalog