/**
 * Generate a random ID to use on input elements
 * 
 * @returns {string}
 */
export const generateInputId = () => 'input-' + Math.random().toString(16).slice(2);