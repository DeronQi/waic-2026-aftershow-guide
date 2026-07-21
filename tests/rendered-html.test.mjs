import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://waic-preview.example/", {
      headers: { accept: "text/html", host: "waic-preview.example" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the finished WAIC electronic magazine", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="zh-CN">/i);
  assert.match(html, /<title>WAIC 2026 展后精选｜新品、亮点与不可错过<\/title>/i);
  assert.match(html, /WAIC 2026.*展后精选/s);
  assert.match(html, /1100\+/);
  assert.match(html, /电子杂志/);
  assert.match(html, /卷首与目录/);
  assert.match(html, /资料与来源/);
  assert.match(html, /property="og:image" content="https:\/\/waic-2026-aftershow-guide\.deron-qi\.chatgpt\.site\/og\.png"/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/i);
});

test("keeps every magazine page uniform and the research package complete", async () => {
  const [page, css, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  const exhibitData = page.slice(page.indexOf("const exhibits"), page.indexOf("const trends"));
  assert.equal((exhibitData.match(/priority: "[SAB]"/g) ?? []).length, 25);
  assert.equal((page.match(/name: "(?:算力与芯片|模型与智能体|具身智能|AI 原生终端|行业 AI · AI4S|安全 · 治理 · 学术)"/g) ?? []).length, 6);
  assert.equal((page.match(/"封面"|"卷首与目录"|"四条信号"|"算力与芯片"|"模型与智能体"|"具身智能"|"AI 原生终端"|"行业 AI · AI4S"|"安全 · 学术 · 治理"|"资料与来源"/g) ?? []).length >= 10, true);
  assert.match(page, /ArrowRight/);
  assert.match(page, /onTouchStart/);
  assert.match(page, /className={`mag-page/);
  assert.match(css, /\.magazine-frame\s*\{[^}]*aspect-ratio:\s*16\s*\/\s*10/s);
  assert.match(css, /@media \(max-width: 700px\)[\s\S]*\.magazine-frame\s*\{\s*aspect-ratio:\s*3\s*\/\s*4/s);
  assert.match(css, /\.mag-page\s*\{[^}]*height:\s*100%/s);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(layout, /new URL\("og\.png", siteUrl\)/);
  assert.doesNotMatch(page, /SkeletonPreview|_sites-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
  await access(new URL("../public/og.png", import.meta.url));
  await access(new URL("../public/downloads/WAIC2026_参展资料_首轮_20260721.zip", import.meta.url));
  await access(new URL("../research/WAIC2026_整理大纲.md", import.meta.url));
  await access(new URL("../research/02_摘要/首轮调研摘要.md", import.meta.url));
  await assert.rejects(access(new URL("public/_sites-preview", templateRoot)));
});
