import { extractDrawData } from './epsFormatToMatrix'

async function fetchAndPrintEPS(text: string) {
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(text)}&format=eps`;
  
    try {
      const response = await fetch(apiUrl);
      const epsData = await response.text(); // Fetching the EPS as plain text
      const drawData = extractDrawData(epsData)
  
      const epsLines = epsData.split('\n'); // Splitting EPS data by lines
      const first20Lines = epsLines.slice(0, 20); // Extracting the first 20 lines
  
      // Printing the first 20 lines to the screen
      console.log('First 20 lines of the EPS file:');
      first20Lines.forEach(line => console.log(line));
  
    } catch (error) {
      console.error('Error fetching EPS:', error);
    }
  }
  
  // Example usage:
  fetchAndPrintEPS('Hello World');