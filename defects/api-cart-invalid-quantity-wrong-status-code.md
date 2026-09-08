# POST /carts/{id} returns 404 instead of 422 for non-positive quantities

**Status:** Confirmed by Dave (Backend Engineer)

## Description
When adding a product to the cart via `POST /carts/{id}` with a non-positive `quantity` (0 or negative), the API returns a `404` status code instead of the expected `422` (documented as the status for malformed/invalid content). The `404` status conventionally means "resource not found", which is misleading here since both `cartId` and `productId` are valid and confirmed to work correctly with a positive quantity.

## Steps to reproduce
1. Create a new cart via `POST /carts` (no body required) — returns `201` with a valid cart `id`.
2. Get a valid `product_id` from `GET /products`.
3. Send `POST /carts/{id}` with `{ "product_id": "<valid_id>", "quantity": 1 }` — confirms `200` (baseline, everything else is correctly set up).
4. Send the same request with `quantity: -1` — observe `404` instead of the expected `422`.
5. Send the same request with `quantity: 0` — observe the same `404`.

## Expected result
A non-positive quantity should be rejected with a `422` status (as documented), clearly indicating a validation/content error — not a `404`, which implies a missing resource.

## Actual result
The API responds with `404` for both `quantity: -1` and `quantity: 0`, despite the cart and product both existing and being valid.

## Impact
Any client consuming this API (this frontend, a mobile app, third-party integrations) relying on standard HTTP status code semantics could misinterpret this error as "cart or product not found" instead of "invalid quantity", leading to incorrect error handling and confusing debugging for API consumers.