import type { BrowserContext, Cookie, Page } from "playwright-core";

const TITLE_SELECTORS = [
  'textarea[placeholder*="タイトル"]',
  'textarea[placeholder*="title"]',
  'input[placeholder*="タイトル"]',
  'input[placeholder*="title"]',
  '[data-testid="editor-title"] textarea',
  '[contenteditable="true"][role="textbox"]',
];

const BODY_SELECTORS = [
  '[data-testid="note-editor"] [contenteditable="true"]',
  '.ProseMirror[contenteditable="true"]',
  '[contenteditable="true"][data-contents="true"]',
  '[contenteditable="true"][role="textbox"]',
  'main [contenteditable="true"]',
];

export function parseCookies(raw: string | undefined): Cookie[] {
  if (!raw) {
    throw new Error("NOTE_AUTH_COOKIES が未設定です。ログイン済みCookieをJSON文字列で指定してください。");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new Error(`NOTE_AUTH_COOKIES のJSON解析に失敗しました: ${(error as Error).message}`);
  }

  if (!Array.isArray(parsed)) {
    throw new Error("NOTE_AUTH_COOKIES はCookie配列(JSON)である必要があります。");
  }

  return parsed as Cookie[];
}

export async function restoreLogin(context: BrowserContext, cookies: Cookie[]) {
  await context.addCookies(cookies);
}

async function fillBySelector(page: Page, selectors: string[], value: string) {
  for (const selector of selectors) {
    const locator = page.locator(selector).first();
    if ((await locator.count()) === 0) continue;

    try {
      await locator.waitFor({ state: "visible", timeout: 3_000 });
      await locator.click({ timeout: 3_000 });

      const tagName = await locator.evaluate((el) => el.tagName.toLowerCase());
      if (tagName === "textarea" || tagName === "input") {
        await locator.fill(value);
        return true;
      }

      const success = await locator.evaluate((el, content) => {
        const node = el as HTMLElement;
        const lines = String(content).replace(/\r\n/g, "\n").split("\n");

        node.focus();
        node.innerHTML = "";

        const fragment = document.createDocumentFragment();
        for (const line of lines) {
          const p = document.createElement("p");
          if (line.length === 0) {
            p.appendChild(document.createElement("br"));
          } else {
            p.textContent = line;
          }
          fragment.appendChild(p);
        }

        node.appendChild(fragment);
        node.dispatchEvent(new InputEvent("input", { bubbles: true, data: content, inputType: "insertText" }));
        node.dispatchEvent(new Event("change", { bubbles: true }));
        return true;
      }, value);

      if (success) {
        return true;
      }
    } catch {
      // 次の候補へフォールバック
    }
  }

  return false;
}

async function pasteByClipboard(page: Page, selector: string, value: string) {
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"], {
    origin: new URL(page.url()).origin,
  });

  await page.evaluate(async (content) => {
    await navigator.clipboard.writeText(content);
  }, value);

  const target = page.locator(selector).first();
  await target.click();
  const modifier = process.platform === "darwin" ? "Meta" : "Control";
  await page.keyboard.press(`${modifier}+V`);
}

async function clickFirstVisible(page: Page, selectors: string[]) {
  for (const selector of selectors) {
    const locator = page.locator(selector).first();
    if ((await locator.count()) === 0) continue;

    try {
      await locator.waitFor({ state: "visible", timeout: 3_000 });
      await locator.click({ timeout: 3_000 });
      return true;
    } catch {
      // 次を試す
    }
  }

  return false;
}

export type PublishParams = {
  page: Page;
  editorUrl: string;
  title: string;
  body: string;
  publish: boolean;
};

export async function publishToNote({ page, editorUrl, title, body, publish }: PublishParams) {
  await page.goto(editorUrl, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => undefined);

  const titleFilled = await fillBySelector(page, TITLE_SELECTORS, title);
  if (!titleFilled) {
    throw new Error("タイトル入力欄を特定できませんでした。TITLE_SELECTORS を実環境に合わせて調整してください。");
  }

  let bodyFilled = await fillBySelector(page, BODY_SELECTORS, body);
  if (!bodyFilled) {
    const fallbackSelector = BODY_SELECTORS[0];
    await pasteByClipboard(page, fallbackSelector, body).catch(() => undefined);
    bodyFilled = await fillBySelector(page, BODY_SELECTORS, body);
  }

  if (!bodyFilled) {
    throw new Error("本文エディタを特定できませんでした。BODY_SELECTORS を実環境に合わせて調整してください。");
  }

  await page.waitForTimeout(1_500);

  if (!publish) {
    return {
      published: false,
      message: "NOTE_PUBLISH=false のため、公開操作はスキップしました。",
      currentUrl: page.url(),
    };
  }

  const firstPublishClicked = await clickFirstVisible(page, [
    'button:has-text("公開")',
    'button:has-text("Publish")',
    '[data-testid="publish-button"]',
  ]);

  if (!firstPublishClicked) {
    throw new Error("公開ボタンが見つかりませんでした。publish用セレクタを見直してください。");
  }

  await page.waitForTimeout(1_000);

  const confirmClicked = await clickFirstVisible(page, [
    'button:has-text("公開する")',
    'button:has-text("公開して投稿")',
    'button:has-text("投稿する")',
    'button:has-text("Publish")',
    '[data-testid="confirm-publish-button"]',
  ]);

  if (!confirmClicked) {
    throw new Error("公開確認ボタンが見つかりませんでした。confirm用セレクタを見直してください。");
  }

  await page.waitForLoadState("networkidle", { timeout: 20_000 }).catch(() => undefined);

  return {
    published: true,
    message: "note記事を公開しました。",
    currentUrl: page.url(),
  };
}
