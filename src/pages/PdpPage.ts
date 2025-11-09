import{expect}  from "@playwright/test";
import {BasePage} from "./BasePage";

export class PdpPage extends BasePage {
  private pdpProductName = this.page.locator('div.product-title h1');
  private addToCartButton = this.page.locator('button[data-track-id="addToCartPDP"]')

  async getPdpProductName():Promise<string> {
    await expect(this.pdpProductName).toBeVisible();
    var pdpProductNameDetail = await this.pdpProductName.innerText();
    return pdpProductNameDetail
  }
  async getTitle():Promise<string> {
    const pageTitle = await this.page.title();
    return pageTitle;
  }
  async addProductToCart(): Promise<void>  {
    await this.addToCartButton.click();
}
   }