import { existsSync } from "node:fs";
import chromium from "@sparticuz/chromium";
import { chromium as playwrightChromium, type Browser, type LaunchOptions } from "playwright-core";

const isVercel = Boolean(process.env.VERCEL || process.env.AWS_REGION);

function getLocalChromeCandidates(): string[] {
  switch (process.platform) {
    case "darwin":
      return [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/Applications/Chromium.app/Contents/MacOS/Chromium",
      ];
    case "win32":
      return [
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
        `${process.env.LOCALAPPDATA ?? "C:\\Users\\%USERNAME%\\AppData\\Local"}\\Google\\Chrome\\Application\\chrome.exe`,
      ];
    default:
      return [
        "/usr/bin/google-chrome-stable",
        "/usr/bin/google-chrome",
        "/usr/bin/chromium-browser",
        "/usr/bin/chromium",
      ];
  }
}

export async function resolveExecutablePath(): Promise<string> {
  if (isVercel) {
    return chromium.executablePath();
  }

  if (process.env.PLAYWRIGHT_EXECUTABLE_PATH) {
    return process.env.PLAYWRIGHT_EXECUTABLE_PATH;
  }

  const discovered = getLocalChromeCandidates().find((candidate) => existsSync(candidate));
  if (discovered) {
    return discovered;
  }

  throw new Error(
    "ローカル実行用のChrome/Chromiumが見つかりません。PLAYWRIGHT_EXECUTABLE_PATHを設定してください。",
  );
}

export async function launchBrowser(): Promise<Browser> {
  const executablePath = await resolveExecutablePath();
  const headless = process.env.NOTE_HEADLESS !== "false";

  const launchOptions: LaunchOptions = {
    executablePath,
    headless,
    args: isVercel
      ? chromium.args
      : [
          ...chromium.args,
          "--disable-dev-shm-usage",
          "--disable-setuid-sandbox",
          "--no-sandbox",
        ],
  };

  return playwrightChromium.launch(launchOptions);
}
