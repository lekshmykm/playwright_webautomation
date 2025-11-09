/**
 * Extracts numbers from given text.
 * @param {string} text - input text
 * @returns {number} A random integer thats extracted.
**/
export async function extractNumberFromText(text: string): Promise<number> {
  const match = text.match(/^\d+/);
  const number = match ? parseInt(match[0], 10) : 0;
  return number
}


 