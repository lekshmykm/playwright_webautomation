import { BasePage } from "./BasePage";

export class CableCategoryPage extends BasePage {
  /**
   * click on category product based on given category item
  **/
  async clickCategoryProduct(categoryItem: string): Promise<void>  {
    await this.page.locator(`a[title="${categoryItem}"]`).click();
  }
}