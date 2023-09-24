import { expect, test } from "@playwright/test";

// Define xPaths of elements to be interacted with.
const xPath = {
  ol: '//*[@id="root-app"]/div/div[2]/section/ol',
};

/**
 * @test {Mercado libre Test}
 * @description
 * This test navigates to the MercadoLibre Argentina website, performs a search for "Iphone", and then verifies the visibility of the results.
 * It also logs the titles of the products and checks that they are strings.
 * @param {Object} page - The page object provided by Playwright test.
 */
test("Mercado libre Test", async ({ page }) => {
  // Navigate to the MercadoLibre Argentina website.
  await page.goto("https://www.mercadolibre.com.ar/");

  // Fill the search box with "Iphone" and press "Enter" to perform the search.
  await page.locator('input[id="cb1-edit"]').fill("Iphone");
  await page.keyboard.press("Enter");

  // Expect the search results container to be visible.
  await expect(page.locator(xPath.ol)).toBeVisible();

  // Retrieve the titles of the listed products.
  const titles = await page.locator(`${xPath.ol}//li//h2`).allInnerTexts();

  // Verify the length of the titles array and log the number of items found.
  const titlesLength = titles.length;
  expect(titlesLength > 0).toBeTruthy();
  console.log("The total number of is:", titlesLength);

  // Log each title and verify that it is a string.
  titles.forEach(
    (text) => (expect(typeof text).toEqual("string"), console.log(text))
  );
});
