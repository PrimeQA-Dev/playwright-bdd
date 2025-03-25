Feature: Login

  Background: 
    Given user open the saucelab url 

  @smoke
  Scenario Outline: user successfully logs in to saucelab with valid credentials and verify different pages
    When user login with "testCredential:username" and "testCredential:password" for register user
    Then user verify swaglabs home page titles for "<username>" user
    Then user tap on "Product" title
    Then user verify add to cart on product detail page
    Then user tap on "<page>" button from product detail page
    Then user verify checkout on cart page

  Examples:
      | page  | 
      | Cart  | 


  @smoke
  Scenario Outline: user successfully logs in to saucelab with valid credentials and verify hamburger menu
    When user login with "testCredential:username" and "testCredential:password" for register user
    Then user verify swaglabs home page titles for "<username>" user
    Then user verify hamburger menu
