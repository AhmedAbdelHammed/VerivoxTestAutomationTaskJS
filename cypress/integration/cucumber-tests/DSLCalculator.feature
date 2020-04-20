Feature: DSL Calculator
AS A User
I WANT TO use the DSL Calculator
SO THAT I am able to select the best possible tariff for me

Scenario Outline: DSL Result List - verify result list
  Given the User is on "https://www.verivox.de"
  When he is on the DSL calculator
  And he enters prefix or code Ihre Vorwahl as "<countryCode>" with "<speedOptionIndex>" bandwidth selection
  And clicks on the button labeled as JETZT VERGLEICHEN
  Then he should be able see the Result List page with all the available Tariffs
Examples:
  | countryCode | speedOptionIndex |
  |     0531    | 1                |
  |     0241    | 2                |
  |     040     | 3                |
  |     06221   | 4                |
  |     030     | 1                |

Scenario: Result List - verify Offer detail page
  Given the User is on the DSL Result List
  When clicks on "Zum" button for any listed tariff
  Then he should be able see the details of the selected Tariff
  And he should also see a button labeled as '"In 5 Minuten online wechseln "'
  And he should find the tariff price
  And he should find the tariff title
  And he should find the tariff provider name
  And he should find the effective price tooltip labeled as "Durchschnittspreis/Monat"
  And he should find the price details title labeled as "Ihr Tarif"
  And he should find the after twenty four months details label contain "Grundgebühr ab dem 25" text

Scenario: Lazy loading/pagination for loading the Result List
  Given the User is on the DSL Result List
  When there are more than 20 tariffs available for the provided Vorwahl and bandwidth
  Then the User should a button labeled as "20 weitere tarife laden"
  And When he or she clicks on this button
  Then the list should be appended with next 20 tariffs and so on until all Tariffs are loaded