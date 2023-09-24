import { test } from "@playwright/test";
import { HelperTest } from "./service";

const helper = new HelperTest();

/**
 * @test {saucedemo login to page}
 * @description
 * This test navigates to the SauceDemo website, logs in with valid credentials,
 * adds items to cart, removes them, performs checkout actions and navigates through the cart.
 *
 * @param {Object} page - The page object provided by Playwright test.
 */
test("saucedemo login to page", async ({ page }) => {
  // Navigate to the SauceDemo login page and login with valid credentials.
  await page.goto("https://www.saucedemo.com/");
  await page.locator('input[placeholder="Username"]').fill("standard_user");
  await page.locator('input[placeholder="Password"]').fill("secret_sauce");
  await page.locator('input[type="submit"]').click();

  // Add all visible items to the cart.
  await helper.clickAllElements({
    page,
    element: 'button:has-text("Add to cart")',
  });

  // Open the cart and remove all items, then continue shopping.
  await helper.clickElementByLocator({
    page,
    element: ".shopping_cart_link",
  });
  await helper.clickAllElements({
    page,
    element: 'button:has-text("Remove")',
  });
  await page
    .getByRole("button", {
      name: "Go back Continue Shopping",
    })
    .click();

  // Add all visible items to the cart again and proceed to checkout.
  await helper.clickAllElements({
    page,
    element: 'button:has-text("Add to cart")',
  });
  await helper.clickElementByLocator({
    page,
    element: ".shopping_cart_link",
  });
  await helper.clickElementByRole({
    page,
    name: "Checkout",
    role: "button",
  });

  // Fill in the checkout form and cancel the checkout.
  await helper.fillForm({
    page,
    element: "input",
    value: ["Dario", "Moreno", "2222"],
  });
  await helper.clickElementByLocator({
    page,
    element: '//*[@id="cancel"]',
  });

  // Return to cart, proceed to checkout, fill in the checkout form again, and finish the checkout.
  await helper.clickElementByLocator({
    page,
    element: ".shopping_cart_link",
  });
  await helper.clickElementByRole({
    page,
    name: "Checkout",
    role: "button",
  });
  await helper.fillForm({
    page,
    element: "input",
    value: ["Dario", "Moreno", "2222"],
  });
  await helper.clickElementByRole({
    page,
    name: "Finish",
    role: "button",
  });
});
