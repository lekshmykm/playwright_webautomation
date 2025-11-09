import { expect }  from "@playwright/test";
import {BasePage} from "./BasePage";

export class CartPage extends BasePage {
  private notificationsPopup = this.page.locator('#notifications-display');

  /**
   * verify if notification popup is displayed and also check the cart url
  **/
  async verifyNotificationPopUpDisplayed(): Promise<void>  {
     await this.notificationsPopup.waitFor({ state: 'visible' });
     expect(this.notificationsPopup).toBeVisible({ timeout: 10000 });
  }
}