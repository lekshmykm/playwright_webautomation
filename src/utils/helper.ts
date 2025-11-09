// import{expect}  from "@playwright/test";
// import type { Locator } from "@playwright/test";

  
// export async function verifyUrlContains(actualUrl: string, expectedString: string): Promise<void> {
//   expect(actualUrl.includes(expectedString)).toBeTruthy();
// }

export async function extractNumberFromText(text: string): Promise<number> {
  const match = text.match(/^\d+/);
const number = match ? parseInt(match[0], 10) : 0;
  return number
}


 