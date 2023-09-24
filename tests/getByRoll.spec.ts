import { test } from "@playwright/test";

/**
 * @test {getByRoll.spec}
 * @description This test navigates to the MercadoLibre website and clicks on the "Mis compras" link using getByRole.
 * @param {Object} page - The page object provided by Playwright test.
 */
test("getByRoll.spec", async ({ page }) => {
  await page.goto("https://www.mercadolibre.com.mx/");

  await page
    .getByRole("link", {
      name: "Mis compras",
    })
    .click();
  await page.pause();
});
