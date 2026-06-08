import { NextRequest, NextResponse } from "next/server";
import { launchBrowser } from "@/lib/browser";
import { parseCookies, publishToNote, restoreLogin } from "@/lib/note";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    throw new Error("CRON_SECRET が未設定です。");
  }

  const authHeader = request.headers.get("authorization");
  const cronHeader = request.headers.get("x-cron-secret");

  return authHeader === `Bearer ${secret}` || cronHeader === secret;
}

async function runPost(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const editorUrl = process.env.NOTE_EDITOR_URL;
  const title = process.env.NOTE_ARTICLE_TITLE;
  const body = process.env.NOTE_ARTICLE_BODY;
  const publish = process.env.NOTE_PUBLISH === "true";

  if (!editorUrl || !title || !body) {
    return NextResponse.json(
      {
        ok: false,
        error: "NOTE_EDITOR_URL / NOTE_ARTICLE_TITLE / NOTE_ARTICLE_BODY のいずれかが未設定です。",
      },
      { status: 500 },
    );
  }

  const browser = await launchBrowser();

  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      locale: "ja-JP",
      timezoneId: "Asia/Tokyo",
    });

    const cookies = parseCookies(process.env.NOTE_AUTH_COOKIES);
    await restoreLogin(context, cookies);

    const page = await context.newPage();
    const result = await publishToNote({
      page,
      editorUrl,
      title,
      body,
      publish,
    });

    return NextResponse.json({
      ok: true,
      result,
      executedAt: new Date().toISOString(),
    });
  } finally {
    await browser.close();
  }
}

export async function GET(request: NextRequest) {
  try {
    return await runPost(request);
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json().catch(() => ({}))) as Partial<{
      editorUrl: string;
      title: string;
      content: string;
      publish: boolean;
    }>;

    if (body.editorUrl && body.title && body.content) {
      const browser = await launchBrowser();
      try {
        const context = await browser.newContext({
          viewport: { width: 1440, height: 900 },
          locale: "ja-JP",
          timezoneId: "Asia/Tokyo",
        });

        const cookies = parseCookies(process.env.NOTE_AUTH_COOKIES);
        await restoreLogin(context, cookies);

        const page = await context.newPage();
        const result = await publishToNote({
          page,
          editorUrl: body.editorUrl,
          title: body.title,
          body: body.content,
          publish: body.publish ?? false,
        });

        return NextResponse.json({ ok: true, result, executedAt: new Date().toISOString() });
      } finally {
        await browser.close();
      }
    }

    return await runPost(request);
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
