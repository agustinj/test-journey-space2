Feature: Products API

  @api
  Scenario: Getting the product list returns a successful response
    When I request the list of products via API
    Then the API response status should be 200