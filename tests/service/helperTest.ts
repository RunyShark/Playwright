import { ElementHandle, Page } from "@playwright/test";
import { Role } from "../interface";

enum Type {
  submit = "submit",
  text = "text",
}
type TestVoid = Promise<void>;

interface HelperTestImplements {
  querySelectorAll: (
    props: SelectElementsDom
  ) => Promise<ElementHandle<SVGElement | HTMLElement>[]>;

  clickAllElements: (props: SelectElementsDom) => TestVoid;

  clickElementByLocator: (props: SelectElementsDom) => TestVoid;

  clickElementByRole: (props: SelectElementByRole) => TestVoid;

  fillForm: (props: FillForm) => TestVoid;
}

interface SelectElementsDom {
  page: Page;
  element: string;
}

interface SelectElementByRole extends Pick<SelectElementsDom, "page"> {
  role: Role;
  name: string;
}

interface FillForm extends SelectElementsDom {
  value: string[] | string;
}

export class HelperTest implements HelperTestImplements {
  async querySelectorAll({ page, element }: SelectElementsDom) {
    return page.$$(element);
  }

  async clickAllElements({ page, element }: SelectElementsDom) {
    const buttons = await page.$$(element);

    for (const button of buttons) {
      await button.click();
    }
  }

  async clickElementByLocator({ page, element }: SelectElementsDom) {
    await page.locator(element).click();
  }

  async clickElementByRole({ page, role, name }: SelectElementByRole) {
    await page
      .getByRole(role, {
        name,
      })
      .click();
  }

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
