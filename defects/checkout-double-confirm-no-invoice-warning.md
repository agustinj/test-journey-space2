# "Payment was successful" message does not indicate a second click is needed to get the invoice

**Status:** Confirmed by Megan (Product Owner)

## Description
When confirming payment, the system shows "Payment was successful" after the first click on "Confirm", without displaying the invoice or indicating that the process requires an additional step. Only after pressing "Confirm" a second time (same button, no text change or warning) does the final message with the invoice number appear.

## Steps to reproduce
1. Complete the checkout flow up to the payment confirmation step.
2. Press "Confirm".
3. Observe the "Payment was successful" message, with no invoice or indication of pending steps.
4. Press "Confirm" again (same button).
5. Observe that only now "Thanks for your order! Your invoice number is INV-XXXXXXX" appears.

## Expected result
Order confirmation should complete in a single step, or at minimum, the message should clearly indicate that an additional action is needed to obtain the invoice.

## Actual result
The user receives an ambiguous success message that suggests the process is finished, with no signal that one more click is needed to see their invoice number.

## Impact
High risk of real customers abandoning the page believing their purchase is confirmed, without saving the invoice — leading to complaints of "I paid but have no order confirmation".