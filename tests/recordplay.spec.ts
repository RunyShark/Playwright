import { test } from "@playwright/test";

test("recordplay", async ({ page }) => {
  await page.goto("https://www.amazon.com.mx/");

  await page.getByPlaceholder("Buscar Amazon.com.mx").click();

  await page.getByPlaceholder("Buscar Amazon.com.mx").fill("alexa");

  await page.getByPlaceholder("Buscar Amazon.com.mx").press("Enter");

  await page
    .getByRole("link", {
      name: "Echo Dot (3ra generación) - Bocina inteligente con Alexa, negro",
    })
    .first()
    .click();

  await page.getByRole("button", { name: "Agregar al Carrito" }).click();

  await page.getByLabel("Amazon.com.mx", { exact: true }).click();
});
