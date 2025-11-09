import type { Page } from "@playwright/test";

export class BasePage {
  private cookieButton;
  
  constructor(public page: Page) {
    this.page = page;
    this.cookieButton = this.page.locator('.js-accept-all-cookies');
  }
  
  /**
   * navigate to page and accept cookies
  **/
  async navigate(path: string) : Promise<void> {
    await this.page.goto(path);
    await this.acceptCookiesIfVisibleThenClick();
  }
  
  /**
   * cookie button click if visible
  **/
  private async acceptCookiesIfVisibleThenClick(): Promise<void>  {
    if (await this.cookieButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await this.cookieButton.click();
    }
  }
}