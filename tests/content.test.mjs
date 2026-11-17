import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { countWords } from "../src/lib/word-count.mjs";

const { paragraphs } = JSON.parse(readFileSync(new URL("../src/content/letter.json", import.meta.url), "utf8"));
const essay = paragraphs.join("\n\n");

test("a redação contém exatamente 500 palavras e 9 parágrafos", () => {
  assert.equal(countWords(essay), 500);
  assert.equal(paragraphs.length, 9);
});

test("todas as palavras, sinais e parágrafos são idênticos ao anexo original", () => {
  assert.equal(createHash("sha256").update(essay).digest("hex"), "dadce7846cdaa1b13ec4f05bf0639772dfb54015b7f9f0fc60887feba9242377");
});

test("o contador trata espaços, quebras de linha e texto vazio", () => {
  assert.equal(countWords(""), 0);
  assert.equal(countWords(" \n\t "), 0);
  assert.equal(countWords("  intenção\n\n genuína,\tsempre. "), 3);
  assert.equal(countWords("desperdiçá-lo"), 1);
});
