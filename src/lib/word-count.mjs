/** Count only whitespace-separated words in the supplied text. */
export function countWords(text) {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/u).length : 0;
}
