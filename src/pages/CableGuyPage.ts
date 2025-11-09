import{ expect }  from "@playwright/test";
import { BasePage } from "./BasePage";
import { extractNumberFromText } from "../utils/Helper";

export class CableGuyPage extends BasePage {
  private cableGuyPage = this.page.locator('ol.stages li span.stages__link');
  private cableBeginning = this.page.locator('button.cg-plugButton--left');
  private cableEnd = this.page.locator('button.cg-plugButton--right');
  private cableItemSelect = this.page.locator('div.cg-plugItem__wrapper');
  private cableItemPresent = this.page.locator('img.cg-plugImage');
  private manufacturer = this.page.locator('div.cg-brands div.item')
  private totalCableText = this.page.locator('span.cg-count')
  private productListCount = this.page.locator('#cg-results div.product')
  private productName =this.page.locator('div.product span.title__manufacturer')
  private manufacturerBrands =this.page.locator('div.cg-brands div.items .item')

  /**
   * check if cableguy page is loaded based on url and page element
  **/
  async verifyCableGuyPageLoaded() :Promise<void>  {
    expect(this.page.url()).toContain('cableguy');
    expect(this.cableGuyPage).toBeVisible();
  }
  
  /**
   * Get the total count of manufacturer brand available
   * @returns { brandCount }  return number
  **/
  async getManufacturerBrandCount() : Promise<number> {
    await this.manufacturerBrands.first().waitFor({ state: 'visible', timeout: 10000 });
    const brandCount = await this.manufacturerBrands.count();
    return brandCount;
  }
  
  /**
   * click cable end and select the cable type
  **/
  async clickCableBeginning(): Promise<void>  {
    await this.cableBeginning.click();
    await this.selectCableType();
    await this.page.waitForTimeout(1000); //Temporary workaround: we need dynamic wait here as the playwright actions are very faster than page loads, on every click the manufacturer brand is not getting updated properly and hence getting 0 results.
  }
  
  /**
   * click cable end and select the cable type
  **/
  async clickCableEnd(): Promise<void>  {
    await this.cableEnd.click();
    await this.selectCableType();
    await this.page.waitForTimeout(1000); //Temporary workaround: we need dynamic wait here as the playwright actions are very faster than page loads, on every click the manufacturer brand is not getting updated properly and hence getting 0 results.
  }
  
  /**
   * select the first cable type available from the list available
  **/
  async selectCableType(): Promise<void>  {
    await this.cableItemSelect.first().waitFor({ state: 'visible', timeout: 10000 });
    await this.cableItemSelect.first().click();
    await expect(this.cableItemPresent.first()).toBeVisible();
  }
  
  /**
   * click on the first manufacturer available
  **/
  async selectRandomManufacturer(): Promise<void>  {
    await expect(this.manufacturer.first()).toBeVisible();
    await this.manufacturer.first().click();
  }
  
  /**
  * get the total count of products available in cable summary text
  * @returns {count}  return number
  **/
  async getTotalCableSummaryCount(): Promise<number>  {
    await expect(this.totalCableText).not.toHaveText('', { timeout: 10000 });
    const countResultsText = await this.totalCableText.innerText();
    const resultCount = extractNumberFromText(countResultsText);
    return resultCount;
  }
  
  /**
   * get the total count of products available in PLP
   * @returns {number}  return number
   **/
  async getPlpResultCount(): Promise<number>  {
    await this.productListCount.first().waitFor({ state: 'visible', timeout: 10000 });
    const plpProductCount = await this.productListCount.count();
    return plpProductCount;
  }
  
  /**
   * click on first product and retrieve the product name
   * @returns {productName}  return string
   **/
  async selectRandomCable(): Promise<string>  {   
    const productName= await this.getProductName();
    this.productListCount.first().click({ force: true }); 
    return productName;
  }
  
  /**
   * check for productName of firstproduct and retrieve the inner text
   * @returns {productName}  return string
   **/
  async getProductName(): Promise<string> {
    const productName = await this.productName.first().innerText();
    return productName;
  }
}