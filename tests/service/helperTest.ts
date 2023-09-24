import { ElementHandle, Page } from "@playwright/test";
import { Role } from "../interface";

/**
 * Enum representing the type of an element.
 * @readonly
 * @enum {string}
 */

enum Type {
  submit = "submit",
  text = "text",
}

/**
 * Represents a promise that resolves to void.
 * @typedef {Promise<void>} TestVoid
 */

/**
 * Represents an object that implements helper tests.
 * @interface
 */
type TestVoid = Promise<void>;

interface HelperTestImplements {
  /**
   * Selects elements from the DOM.
   * @function
   * @param {SelectElementsDom} props - Object containing the page and the element selector.
   * @return {Promise<ElementHandle<SVGElement | HTMLElement>[]>} - Array of element handles.
   */
  querySelectorAll: (
    props: SelectElementsDom
  ) => Promise<ElementHandle<SVGElement | HTMLElement>[]>;

  /**
   * Clicks all elements selected from the DOM.
   * @function
   * @param {SelectElementsDom} props - Object containing the page and the element selector.
   * @return {TestVoid}
   */
  clickAllElements: (props: SelectElementsDom) => TestVoid;

  /**
   * Clicks all elements selected from the DOM.
   * @function
   * @param {SelectElementsDom} props - Object containing the page and the element selector.
   * @return {TestVoid}
   */
  clickElementByLocator: (props: SelectElementsDom) => TestVoid;

  /**
   * Clicks all elements selected from the DOM.
   * @function
   * @param {SelectElementsDom} props - Object containing the page and the element selector.
   * @return {TestVoid}
   */
  clickElementByRole: (props: SelectElementByRole) => TestVoid;

  /**
   * Clicks all elements selected from the DOM.
   * @function
   * @param {SelectElementsDom} props - Object containing the page and the element selector.
   * @return {TestVoid}
   */
  fillForm: (props: FillForm) => TestVoid;
}

/**
 * @interface
 * @property {Page} page - The page object.
 * @property {string} element - The selector for the element.
 */
interface SelectElementsDom {
  page: Page;
  element: string;
}

/**
 * @interface
 * @extends Pick<SelectElementsDom, "page">
 * @description Interface representing an object with properties needed to select an element by its role.
 * @property {Role} role - The ARIA role of the element to be selected.
 * @property {string} name - The accessible name of the element to be selected.
 * @example
 * { page: myPage, role: 'button', name: 'Submit' }
 */
interface SelectElementByRole extends Pick<SelectElementsDom, "page"> {
  role: Role;
  name: string;
}

/**
 * @interface
 * @extends SelectElementsDom
 * @description Interface representing an object with properties needed to fill a form.
 * @property {string[] | string} value - The value(s) to be filled in the form. It could be a string or an array of strings.
 * @example
 * { page: myPage, element: '.input-field', value: ['John Doe', 'john.doe@example.com'] }
 */
interface FillForm extends SelectElementsDom {
  value: string[] | string;
}

/**
 * Helper class for performing actions on the page.
 * @class
 * @implements {HelperTestImplements}
 */
export class HelperTest implements HelperTestImplements {
  /**
   * Selects all elements matching the selector on the page.
   * @function
   * @param {SelectElementsDom} param0 - Object containing the page and the element selector.
   * @return {Promise<ElementHandle<SVGElement | HTMLElement>[]>} - Array of element handles.
   */
  async querySelectorAll({ page, element }: SelectElementsDom) {
    return page.$$(element);
  }

  /**
   * Clicks all elements matching the selector on the page.
   * @function
   * @param {SelectElementsDom} param0 - Object containing the page and the element selector.
   * @return {TestVoid}
   */
  async clickAllElements({ page, element }: SelectElementsDom) {
    const buttons = await page.$$(element);

    for (const button of buttons) {
      await button.click();
    }
  }

  /**
   * Clicks an element using a locator.
   * @async
   * @function
   * @param {SelectElementsDom} param0 - Object containing the page and the element selector.
   * @return {Promise<void>}
   * @example
   * await clickElementByLocator({ page, element: '#submit-button' });
   */
  async clickElementByLocator({ page, element }: SelectElementsDom) {
    await page.locator(element).click();
  }

  /**
   * Clicks an element based on its role and name.
   * @async
   * @function
   * @param {SelectElementByRole} param0 - Object containing the page, role, and name of the element.
   * @return {Promise<void>}
   * @example
   * await clickElementByRole({ page, role: 'button', name: 'Submit' });
   */
  async clickElementByRole({ page, role, name }: SelectElementByRole) {
    await page
      .getByRole(role, {
        name,
      })
      .click();
  }

  /**
   * Fills a form by finding its elements and filling or clicking them based on their type.
   * @async
   * @function
   * @param {FillForm} param0 - Object containing the page, element selector, and value(s) to fill.
   * @return {Promise<void>}
   * @example
   * await fillForm({ page, element: '.input-field', value: ['John Doe', 'john.doe@example.com'] });
   */
  async fillForm({ page, element, value }: FillForm) {
    const elemets = await this.querySelectorAll({ page, element });

    let i = 0;
    for (const input of elemets) {
      const type = await input.getAttribute("type");
      if (type === Type.text) await input.fill(value[i]);
      if (type === Type.submit) await input.click();
      i++;
    }
  }
}
