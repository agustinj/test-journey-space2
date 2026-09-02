# Text search does not match products by substring

**Status:** Confirmed by Megan (Product Owner)

## Description
When searching "hammer" in the catalog's text search bar, the product "Sledgehammer" does not appear in the results, despite literally containing the substring "hammer" in its name. However, using the "Hammer" category filter, the product does appear correctly.

## Steps to reproduce
1. Go to the product catalog.
2. Search for the term "hammer" in the text search bar.
3. Observe that "Sledgehammer" does not appear in the results.
4. As a comparison, search for the term "Sledge" — the product does appear.
5. As an additional comparison, use the "Hammer" category filter — the product also appears.

## Expected result
Searching "hammer" should return all products containing that term in their name or description, including "Sledgehammer".

## Actual result
"Sledgehammer" is excluded from results when searching "hammer", despite containing the substring.

## Impact
A customer searching for a specific tool may fail to find relevant products, directly affecting catalog sales.