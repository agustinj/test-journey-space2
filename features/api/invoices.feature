Feature: Invoices API

  @api
  Scenario: API rejects invoice creation for an out-of-stock product
    Given I am authenticated via API
    And a new cart has been created via API
    And an out-of-stock product exists in the catalog
    And that product has been added to the cart via API
    When I try to create an invoice for that cart via API
    Then the API response status should be 422