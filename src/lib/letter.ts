import letter from "@/content/letter.json";
import { countWords } from "@/lib/word-count.mjs";

export const essayParagraphs = letter.paragraphs;
export const essayWordCount = countWords(essayParagraphs.join("\n\n"));
export const decisionMessage =
  "Candidatura aprovada! Podemos marcar a entrevista presencial? ☕";
