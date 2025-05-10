/**
 * Utility functions for currency formatting in the application
 */

/**
 * Formats a number as Indian Rupee (INR) currency
 * Follows the Indian numbering system (lakhs, crores)
 * 
 * @param {number} amount - The amount to format
 * @returns {string} - Formatted currency string with ₹ symbol
 */
export const formatIndianCurrency = (amount) => {
  if (amount === null || amount === undefined) {
    return '₹0';
  }
  
  // Convert to string and split by decimal point if any
  const [wholePart, decimalPart] = amount.toString().split('.');
  
  // Format the whole part with commas for Indian numbering system
  // (last 3 digits, then groups of 2 digits from right to left)
  let formattedWholePart = '';
  let counter = 0;
  
  for (let i = wholePart.length - 1; i >= 0; i--) {
    counter++;
    formattedWholePart = wholePart[i] + formattedWholePart;
    
    if (i !== 0) {
      if (counter === 3) {
        formattedWholePart = ',' + formattedWholePart;
      } else if (counter > 3 && (counter - 3) % 2 === 0) {
        formattedWholePart = ',' + formattedWholePart;
      }
    }
  }
  
  // Add decimal part if it exists
  const result = decimalPart ? `${formattedWholePart}.${decimalPart}` : formattedWholePart;
  
  return `₹${result}`;
};

/**
 * Parses an Indian currency string back to a number
 * 
 * @param {string} currencyString - The currency string to parse (e.g., "₹1,23,456.78")
 * @returns {number} - The parsed number value
 */
export const parseIndianCurrency = (currencyString) => {
  if (!currencyString) return 0;
  
  // Remove the currency symbol and commas
  const cleanString = currencyString.replace('₹', '').replace(/,/g, '');
  
  // Parse as float
  return parseFloat(cleanString);
};

/**
 * Converts a number to words in Indian currency format
 * Useful for printing amounts on financial documents
 * 
 * @param {number} amount - The amount to convert
 * @returns {string} - The amount in words (e.g., "One Lakh Twenty Three Thousand Four Hundred Fifty Six Rupees and Seventy Eight Paise")
 */
export const amountToWords = (amount) => {
  // Implementation for converting amount to words in Indian currency format
  // This is a placeholder - a full implementation would be more complex
  
  return `Amount in words placeholder for ${formatIndianCurrency(amount)}`;
};