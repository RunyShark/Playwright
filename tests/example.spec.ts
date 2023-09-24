import { test, expect } from "@playwright/test";

/**
 * @test {has title}
 * @description Verifies that the Playwright documentation website has the correct title.
 * @param {Object} page - The page object provided by Playwright test.
 */
test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

/**
 * @test {get started link}
 * @description Verifies that the Get Started link navigates to the Installation section.
 * @param {Object} page - The page object provided by Playwright test.
 */
test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});
