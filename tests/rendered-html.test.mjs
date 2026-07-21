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

test("server-renders the finished WAIC editorial guide", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="zh-CN">/i);
  assert.match(html, /<title>WAIC 2026 展后精选｜新品、亮点与不可错过<\/title>/i);
  assert.match(html, /WAIC 2026.*展后精选/s);
  assert.match(html, /1100\+/);
  assert.match(html, /十大不可错过/);
  assert.match(html, /重点展品索引/);
  assert.match(html, /每一个判断.*都能回到来源/s);
  assert.match(html, /property="og:image" content="https:\/\/waic-2026-aftershow-guide\.deron-qi\.chatgpt\.site\/og\.png"/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/i);
});

test("keeps the research index complete and the starter disposable", async () => {
  const [page, css, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  const exhibitData = page.slice(page.indexOf("const exhibits"), page.indexOf("const trends"));
  assert.equal((exhibitData.match(/priority: "[SAB]"/g) ?? []).length, 25);
  assert.equal((page.match(/name: "(?:算力与芯片|模型与智能体|具身智能|AI 原生终端|行业 AI · AI4S|安全 · 治理 · 学术)"/g) ?? []).length, 6);
  assert.match(page, /useMemo/);
  assert.match(page, /type="search"/);
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(layout, /new URL\("og\.png", siteUrl\)/);
  assert.doesNotMatch(page, /SkeletonPreview|_sites-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
  await access(new URL("../public/og.png", import.meta.url));
  await assert.rejects(access(new URL("public/_sites-preview", templateRoot)));
});
