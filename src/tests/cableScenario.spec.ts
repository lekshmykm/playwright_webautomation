import { test } from "@playwright/test";
import { expect }  from "@playwright/test";
import { CableGuyPage } from "../pages/CableGuyPage";
import { CableCategoryPage } from "../pages/CableCategoryPage";
import { HomePage } from "../pages/HomePage";
import { PdpPage } from "../pages/PdpPage";
import { CartPage } from "../pages/CartPage";
import { describe } from "node:test";

describe("Thomann CableGuy end-to-end test scenario", () => {
  test("Navigation through categories and adding cable to cart", async ({ page }) => {
    const cableGuyPage = new CableGuyPage(page);
    const cableCategoryPage = new CableCategoryPage(page);
    const homePage = new HomePage(page);
    const pdpPage = new PdpPage(page);
    const cartPage = new CartPage(page);

    // Step 1: Navigate
    await homePage.navigateToHomePage();

    //Step 2: Verify category availability
    await homePage.verifyCategoriesAvailability();

    //Step 3: click category
    await homePage.clickCategory('KA');
    
    // Step 4: Select Item from Category Page
    await cableCategoryPage.clickCategoryProduct('CableGuy');  

    // Step 5: Select Cable Type and check for manufacturer count channge wrt selection
    await cableGuyPage.verifyCableGuyPageLoaded();  
    const initialManufacturerCount = await cableGuyPage.getManufacturerBrandCount();
    await cableGuyPage.clickCableBeginning();
    await cableGuyPage.clickCableEnd();
    const finalManufacturerCount = await cableGuyPage.getManufacturerBrandCount();
    expect(initialManufacturerCount).not.toBe(finalManufacturerCount);

    // Step 6: Choose Manufacturer 
    await cableGuyPage.selectRandomManufacturer();

    // Step 7: Verify product count and compare with PLP count
    const cableCount = await cableGuyPage.getTotalCableSummaryCount();
    const plpCableCount = await cableGuyPage.getPlpResultCount();
    expect(plpCableCount).toEqual(cableCount);

    // Step 8: Select Random Cable and get product name
    var productName = await cableGuyPage.selectRandomCable();
      
    // Step 5: Click product and verify
    var pdpProductName = await pdpPage.getPdpProductName();
    expect(pdpProductName).toContain(productName);
    var pageTitle = await pdpPage.getTitle();
    expect(pageTitle).toContain(productName); 

    // Step 6: Add to basket and verify popup
    await pdpPage.addProductToCart();
    await cartPage.verifyNotificationPopUpDisplayed();
  })
});