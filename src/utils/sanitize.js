/**
 * Input sanitization and validation utilities for Census 2027 Portal
 * Prevents XSS, prompt injection, and invalid field data
 */

/**
 * Strips HTML tags and harmful characters from user input
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return '';

  return input
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .replace(/[^\w\s\u0900-\u097F.,#\-\/()@+]/gi, '') // Keep alphanumeric, Hindi Unicode, and basic punctuation
    .trim()
    .slice(0, 500); // Enforce max character limit
}

/**
 * Defends against prompt injection before sending message to AI assistant
 */
export function sanitizeForGemini(promptText) {
  if (!promptText || typeof promptText !== 'string') return '';

  let sanitized = promptText.trim().slice(0, 1000);

  // Neutralize common prompt injection patterns
  const injectionPatterns = [
    /ignore\s+(all\s+)?(previous|above)\s+instructions/gi,
    /you\s+are\s+now\s+a/gi,
    /system\s*:\s*/gi,
    /assistant\s*:\s*/gi,
    /jailbreak/gi,
    /DAN\s+mode/gi
  ];

  injectionPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '[FILTERED]');
  });

  return sanitized;
}

/**
 * Validates demographic number inputs (e.g. members count, age)
 */
export function validateNumberInput(value, min = 0, max = 150) {
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) return false;
  return parsed >= min && parsed <= max;
}

/**
 * Debounce helper for rate-limiting typing events
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
