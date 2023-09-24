import { test, expect } from "@playwright/test";

test("getByRoll.spec", async ({ page }) => {
  await page.goto("https://www.mercadolibre.com.mx/");

  await page
    .getByRole("link", {
      name: "Mis compras",
    })
    .click();
  await page.pause();
});
