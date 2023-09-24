import { test } from "@playwright/test";

/**
 * @test {recordplay}
 * @description
 * This test navigates to the Amazon Mexico website, searches for "alexa",
 * selects the "Echo Dot (3ra generación)" from the search results, adds it to the cart,
 * and finally navigates back to the homepage by clicking on the Amazon logo.
 * @param {Object} page - The page object provided by Playwright test.
 */
test("recordplay", async ({ page }) => {
  // Navigate to the Amazon Mexico homepage.
  await page.goto("https://www.amazon.com.mx/");

  // Click the search bar, fill it with "alexa", and press "Enter" to perform the search.
  await page.getByPlaceholder("Buscar Amazon.com.mx").click();
  await page.getByPlaceholder("Buscar Amazon.com.mx").fill("alexa");
  await page.getByPlaceholder("Buscar Amazon.com.mx").press("Enter");

  // Click the first "Echo Dot (3ra generación) - Bocina inteligente con Alexa, negro" link from the search results.
  await page
    .getByRole("link", {
      name: "Echo Dot (3ra generación) - Bocina inteligente con Alexa, negro",
    })
    .first()
    .click();

  // Click the "Agregar al Carrito" button to add the item to the cart.
  await page.getByRole("button", { name: "Agregar al Carrito" }).click();

  // Navigate back to the Amazon Mexico homepage by clicking on the Amazon logo.
  await page.getByLabel("Amazon.com.mx", { exact: true }).click();
});
