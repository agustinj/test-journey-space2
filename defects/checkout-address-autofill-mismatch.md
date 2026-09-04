# Billing Address autofill for "State" and "Street" generates data unrelated to country or ZIP entered

**Status:** Confirmed by Megan (Product Owner)

## Description
In the checkout's Billing Address step, entering a ZIP code and leaving the field (Tab) causes the "State" and "Street" fields to auto-fill with arbitrary values that do not correspond to the selected country or the entered ZIP (e.g. "Vienna" as state, "test street" as street). Confirmed this is not browser autofill — it reproduces when typing manually.

## Steps to reproduce
1. Reach the Billing Address step in checkout.
2. Select any country from the dropdown (at random).
3. Type any number in the ZIP code field (tested with random values, without browser-suggested autofill).
4. Press Tab to leave the field.
5. Observe that the "State" and "Street" fields auto-fill with arbitrary values (e.g. "Vienna" as state, "test street" as street), with no logical relation to the country or ZIP entered.

## Expected result
The field should either remain empty for manual entry, or auto-fill with real data consistent with the entered ZIP/country.

## Actual result
It auto-fills with incorrect, unrelated data that a customer might not notice and could let pass.

## Impact
Real risk of an order ending up with an incorrect shipping address, without the customer noticing during checkout — direct impact on logistics and customer trust in the purchase.