import{expect}  from "@playwright/test";
import {BasePage} from "./BasePage";

export class PdpPage extends BasePage {
  private pdpProductName = this.page.locator('div.product-title h1');
  private addToCartButton = this.page.locator('button[data-track-id="addToCartPDP"]')

  /**
   * check for productName in PDP and retrieve the inner text
   * @returns {number}  return string
  **/
  async getPdpProductName():Promise<string> {
    await expect(this.pdpProductName).toBeVisible();
    var pdpProductNameDetail = await this.pdpProductName.innerText();
    return pdpProductNameDetail
  }
  /**
   * get page title
   * @returns {string} the string retrived
  **/
  async getTitle():Promise<string> {
    const pageTitle = await this.page.title();
    return pageTitle;
  }
  /**
   * adds given product to cart
  **/
  async addProductToCart(): Promise<void>  {
    await this.addToCartButton.click();
  } 
}