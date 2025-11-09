import { expect }  from "@playwright/test";
import {BasePage} from "./BasePage";
var productName: string;

export class CartPage extends BasePage {
  private notificationsPopup = this.page.locator('#notifications-display');

  async notificationsPopupDisplay(): Promise<void>  {
    await this.notificationsPopup.waitFor({ state: 'visible' });
    expect(this.page.url().toLowerCase()).toContain('basket'.toLowerCase());
  }
}