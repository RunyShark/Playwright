import { test } from "@playwright/test";
import { HelperTest } from "./service";

const helper = new HelperTest();

test("saucedemo login to page", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await page.locator('input[placeholder="Username"]').fill("standard_user");

  await page.locator('input[placeholder="Password"]').fill("secret_sauce");

  await page.locator('input[type="submit"]').click();

  // $$ equal to querySelectorAll
  await helper.clickAllElements({
    page,
    element: 'button:has-text("Add to cart")',
  });

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

  await helper.fillForm({
    page,
    element: "input",
    value: ["Dario", "Moreno", "2222"],
  });

  await helper.clickElementByLocator({
    page,
    element: '//*[@id="cancel"]',
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

  await page.pause();
});
