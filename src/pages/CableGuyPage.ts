import{expect}  from "@playwright/test";
import {BasePage} from "./BasePage";
import {extractNumberFromText} from "../utils/helper";

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

  async identifyCableGuyPagePresent(urlText: string) :Promise<void>  {
    expect(this.page.url().toLowerCase()).toContain(urlText.toLowerCase());
    expect(this.cableGuyPage).toBeVisible();
  }

  async getManufacturerBrandCount(previousCount?: number) : Promise<number> {
    await this.page.waitForLoadState('networkidle');
    await this.manufacturerBrands.first().waitFor({ state: 'visible', timeout: 10000 });
    const brandCount = await this.manufacturerBrands.count();
    return brandCount;

  }
  async clickCableBeginning(): Promise<void>  {
    await this.cableBeginning.click();
    await this.selectCableType();
    await this.page.waitForTimeout(1000); //we need dynamic wait here as the playwright actions are very faster than page loads, on every click the manufacturer brand is not getting updated properly and hence getting 0 results.
  }
 
  async clickCableEnd(): Promise<void>  {
    await this.cableEnd.click();
    await this.selectCableType();
    await this.page.waitForTimeout(1000);//we need dynamic wait here as the playwright actions are very faster than page loads, on every click the manufacturer brand is not getting updated properly and hence getting 0 results.
  }
  
  async selectCableType(): Promise<void>  {
    await this.cableItemSelect.first().waitFor({ state: 'visible', timeout: 10000 });
    await this.cableItemSelect.first().click();
    await expect(this.cableItemPresent.first()).toBeVisible();
  }
  
  async selectRandomManufacturer(): Promise<void>  {
    await expect(this.manufacturer.first()).toBeVisible();
    await this.manufacturer.first().click();
  }
  
  async getTotalcableSummaryCount(): Promise<number>  {
    await expect(this.totalCableText).not.toHaveText('', { timeout: 15000 });
    const countResultsText=await this.totalCableText.innerText();
    const resultCount = extractNumberFromText(countResultsText);
    return resultCount;
  }
 
  async getPlpResultCount(): Promise<number>  {
    await this.productListCount.last().waitFor({ state: 'visible', timeout: 10000 });
    const plpProductCount = await this.productListCount.count();
    return plpProductCount;
 }
 async selectRandomCable(): Promise<string>  {   
    const productName= await this.getProductName();
    this.productListCount.first().click({ force: true }); 
    return productName;
 }
 async getProductName(): Promise<string> {
    const productName = await this.productName.first().innerText();
    return productName;
 }

}