Feature: Product catalog search

  Scenario: Search for an existing product returns matching results
    Given I am on the product catalog page
    When I search for "Hammer"
    Then all displayed products should contain "Hammer" in their name