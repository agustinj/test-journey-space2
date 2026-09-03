# Invalid decimal quantity in cart is not blocked and breaks checkout confirmation silently

**Status:** Confirmed by Megan (Product Owner)

## Description
The quantity field in the cart correctly validates a decimal value (e.g. 1.5) when leaving the field with Enter — the bug manifests when leaving the field by clicking outside instead. In that case, a red error message appears, but the invalid value (1.5) remains saved in the cart, and the system allows proceeding to checkout with that quantity. Subtotals and the overall total are recalculated using that invalid value.

## Steps to reproduce
1. Add a product to the cart.
2. In the quantity field, enter "1.5".
3. Click outside the field (do not press Enter).
4. Observe that a red error message appears, but the value "1.5" remains saved and totals are recalculated with that number.
5. Proceed with "Proceed to checkout" — the system allows it.
6. Complete the checkout flow (payment method: cash on arrival) and confirm.
7. On the final confirmation step, the system does not show the invoice or give any error message or feedback — the flow gets stuck with no explanation.
8. As a comparison, fixing the quantity to a valid whole number before checkout, the flow completes normally and the invoice is generated.

## Expected result
The system should block proceeding to checkout while there is an invalid quantity in the cart, or at least clearly inform the user why the purchase cannot be completed.

## Actual result
The user proceeds without being blocked, reaches the final checkout step, and the process fails silently with no invoice and no error message.

## Impact
A customer can get stuck in checkout without understanding what happened to their purchase, unable to complete it and with no message to guide them. High impact on conversion and purchase experience.