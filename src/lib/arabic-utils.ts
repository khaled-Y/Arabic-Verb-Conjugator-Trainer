// Utility function to remove Arabic diacritics
export const removeDiacritics = (text: string): string => {
  return text.replace(/[\u064B-\u065F\u0670\u0640]/g, '');
};

// Normalize text for search by removing diacritics and converting to lowercase
export const normalizeForSearch = (text: string): string => {
  return removeDiacritics(text).toLowerCase().trim();
};