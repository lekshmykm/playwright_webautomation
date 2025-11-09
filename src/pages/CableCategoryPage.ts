import {BasePage} from "./BasePage";

export class CableCategoryPage extends BasePage {

  async clickCategoryProduct(categoryItem: string): Promise<void>  {
    await this.page.locator(`a[title="${categoryItem}"]`).click();
  }
}