Feature: Otomoto filtering

    Scenario Outline: Filter cars
        Given I access otomoto page
        And I select typ nadwozia <nadwozie>
        And I select marka pojazdu <marka>
        And I select max_price <max>
        When I click on pokaz button
        Then I should be presented with the cars that meets the expectations <nadwozie> <marka> <max>

        Examples:
            | nadwozie | marka   | max    |
            | Coupe    | Audi    | 10000  |
            | Kombi    | BMW     | 132500 |
            | Kompakt  | Ford    | 70000  |
            | Minivan  | Renault | 28000  |