import { expect, test } from "@playwright/test";

const message = "Candidatura aprovada! Podemos marcar a entrevista presencial? ☕";

test("a página está completa, sem erros, e a redação tem 500 palavras", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/Carol, você pediu 500 palavras/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Carol, você pediu 500 palavras.");
  await expect(page.locator(".hero-answer")).toHaveText("Eu achei melhor fazer um site.");
  const paragraphs = await page.getByTestId("essay-content").locator("p").allTextContents();
  expect(paragraphs).toHaveLength(9);
  expect(paragraphs.join(" ").trim().split(/\s+/u)).toHaveLength(500);
  await page.getByRole("link", { name: "Analisar candidatura" }).click();
  await expect(page.getByRole("heading", { name: "Prezada avaliadora," })).toBeInViewport();
  expect(errors).toEqual([]);
});

test("todas as seções e o modal cabem na largura da tela", async ({ page }) => {
  await page.goto("/");
  for (const section of ["inicio", "candidatura", "redacao", "avaliacao"]) {
    await page.locator(`#${section}`).scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  }
  await page.getByRole("button", { name: "Candidatura aprovada" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const bounds = await dialog.boundingBox();
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(page.viewportSize()!.width);
  expect(Math.abs(bounds!.x + bounds!.width / 2 - page.viewportSize()!.width / 2)).toBeLessThan(1);
  expect(Math.abs(bounds!.y + bounds!.height / 2 - page.viewportSize()!.height / 2)).toBeLessThan(1);
  await expect(page.locator(".confetti")).toBeVisible();
  await page.screenshot({ path: `test-results/${test.info().project.name}-approved.png`, fullPage: false });
});

test("a aprovação copia de verdade a mensagem e confirma o resultado", async ({ page, context, browserName }) => {
  test.skip(browserName !== "chromium", "A leitura automatizada do clipboard é suportada pelo Chromium.");
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.getByRole("button", { name: "Candidatura aprovada" }).click();
  await expect(page.getByRole("dialog")).toContainText("próxima etapa.");
  await page.getByRole("button", { name: "Copiar minha decisão" }).click();
  await expect(page.getByRole("status")).toHaveText("Pronto! Agora é só colar na nossa conversa.");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(message);
});

test("clipboard bloqueado oferece cópia manual sem afirmar sucesso", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: () => Promise.reject(new Error("Permission denied")) } }));
  await page.goto("/");
  await page.getByRole("button", { name: "Candidatura aprovada" }).click();
  await page.getByRole("button", { name: "Copiar minha decisão" }).click();
  await expect(page.getByRole("status")).toContainText("A cópia automática não está disponível");
  await expect(page.getByRole("textbox", { name: "Mensagem para copiar manualmente" })).toHaveValue(message);
  await expect(page.getByRole("button", { name: "Decisão copiada!" })).toHaveCount(0);
});

test("recurso, foco, Escape e reconsideração funcionam", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Preciso de mais argumentos" });
  await trigger.click();
  await expect(page.getByRole("heading", { name: "Recurso solicitado!" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Fechar avaliação" })).toBeFocused();
  for (let i = 0; i < 4; i++) {
    await page.keyboard.press("Tab");
    expect(await page.evaluate(() => document.activeElement?.closest("dialog") !== null)).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.getByRole("button", { name: "Reconsiderar decisão" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("movimento reduzido preserva conteúdo e remove confetes", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
  await page.getByRole("button", { name: "Candidatura aprovada" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator(".confetti")).toHaveCount(0);
});
