Feature: Login

  @critical
  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I log in with a valid email and password
    Then I should be redirected to my account page
    And I should see my name displayed