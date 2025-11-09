import{expect}  from "@playwright/test";
import {BasePage} from "./BasePage";


export class HomePage extends BasePage {     
  private categoryContainer = this.page.locator('div.categories-list__rail');

  /**
   * navigate to home page
  **/
  async navigateToHomePage(): Promise<void>  {
    await this.navigate('');
  }
  /**
   * verify if categories are visible
  **/
  async verifyCategoriesAvailability(): Promise<void>  {
    await expect(this.categoryContainer).toBeVisible;
  }
  /**
   * get the total count of categories available
   * @returns {count}  return number
  **/
  async getCategoryCount(): Promise<number>  {
    const items = await this.categoryContainer.locator('li.categories-list__item');
    return items.count();
  }
  /**
   * click on category based on given category key
  **/
  async clickCategory(categoryKey: string): Promise<void>  {
      await this.page.locator(`a[data-gtm-key-anja="${categoryKey}"]`).waitFor({ state: 'visible' });
      await this.page.locator(`a[data-gtm-key-anja="${categoryKey}"]`).click();
  }
  /**
   * get category name and navigate through all of them
  **/
  async listAllCategories(): Promise<void>  { 
    const allCategories = await this.categoryContainer.locator('li');
    for (let i = 0; i < await allCategories.count(); i++) {
    await allCategories.nth(i).innerText();
    }
  }
} 