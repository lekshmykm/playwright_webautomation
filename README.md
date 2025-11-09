# Web Automation
Webautomation script using Playwright in typescript - page navigation, product identification, addtocart
using POM and reporting using allure

**Test Scenario**
1. Navigate to the home page
2. Select cable category and product as Cableguy
3. Select random Cable Beginning and Cable End type
4. Choose a random Manufacturer
5. Validate the product count displayed is equal to products displayed
6. Open one product and verify the correct product page
7. Add it to the shopping basket and verify the basket popup

**Pre Requisite**
* `node` of version `23.0+` should be installed in the system

**SetUp**
1. git clone https://github.com/lekshmykm/playwright_webautomation.git
2. cd to `playwright_webautomation` directory
3. Run `npm install`
3. Rename the file `.env.example` to `.env`

**Run tests**
* Run the command `npm test`  - runs the test in headless mode and opens the allure report at the end of the test run

**Improvements for the future**
1. Remove some of the hardcoded waits to dynamic wait
2. Add `eslint` for lint fixes and failing lint check for deviation from standards
3. Run in multiple browsers
4. CICD implementation