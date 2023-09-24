import { expect, test } from "@playwright/test";

const xPath = {
  ol: '//*[@id="root-app"]/div/div[2]/section/ol',
};

test("Mercado libre Test", async ({ page }) => {
  // Go to https://www.mercadolibre.com.ar/
  await page.goto("https://www.mercadolibre.com.ar/");

  await page.locator('input[id="cb1-edit"]').fill("Iphone");

  await page.keyboard.press("Enter");

  await expect(page.locator(xPath.ol)).toBeVisible();

  const titles = await page.locator(`${xPath.ol}//li//h2`).allInnerTexts();

  const titlesLength = titles.length;

  expect(titlesLength > 0).toBeTruthy();

  console.log("The total number of is:", titlesLength);

  titles.forEach(
    (text) => (expect(typeof text).toEqual("string"), console.log(text))
  );
});
