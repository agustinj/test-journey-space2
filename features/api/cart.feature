Feature: Cart API validations
  
  @api
  Scenario: API rejects a negative quantity when adding a product to the cart
    Given a new cart has been created via API
    And a valid product exists in the catalog
    When I try to add a negative quantity of that product to the cart via API
    Then the API response status should be 422
  
  @api
  Scenario: API rejects a decimal quantity when adding a product to the cart
    Given a new cart has been created via API
    And a valid product exists in the catalog
    When I try to add a decimal quantity of that product to the cart via API
    Then the API response status should be 422

  @api
  Scenario: API rejects adding an out-of-stock product to the cart
    Given a new cart has been created via API
    And an out-of-stock product exists in the catalog
    When I try to add that product to the cart via API
    Then the API response status should be 422