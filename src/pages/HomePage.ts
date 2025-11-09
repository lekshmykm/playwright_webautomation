import{expect}  from "@playwright/test";
import {BasePage} from "./BasePage";


export class HomePage extends BasePage {     
  private categoryContainer = this.page.locator('div.categories-list__rail');

  async navigateToHomePage(): Promise<void>  {
    await this.navigate('');
  }
  async verifyAllCategoriesAvailable(): Promise<void>  {
    await expect(this.categoryContainer).toBeVisible;
  }

  async getCategoryCount(): Promise<number>  {
    const items = await this.categoryContainer.locator('li.categories-list__item');
    return items.count();
 }

 async clickCategory(categoryKey: string): Promise<void>  {
      await this.page.locator(`a[data-gtm-key-anja="${categoryKey}"]`).waitFor({ state: 'visible' });
      await this.page.locator(`a[data-gtm-key-anja="${categoryKey}"]`).click();
  }


async listAllCategories(): Promise<void>  { 
    const allCategories = await this.categoryContainer.locator('li');
    for (let i = 0; i < await allCategories.count(); i++) {
    const text = await allCategories.nth(i).innerText();
    // console.log(`Category ${i + 1}: ${text}`); 
    }
 }
} 