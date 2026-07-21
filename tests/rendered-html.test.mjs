import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://waic-preview.example/", { headers: { accept: "text/html", host: "waic-preview.example" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
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
  assert.match(html, /四条信号/);
  assert.match(html, /十大不可错过/);
  assert.match(html, /展品索引/);
  assert.match(html, /35 PAGES/);
  assert.match(html, /4 篇产业解读 · 25 篇展品详情/);
  assert.match(html, /property="og:image" content="https:\/\/waic-2026-aftershow-guide\.deron-qi\.chatgpt\.site\/og\.png"/i);
  assert.doesNotMatch(html, /证据状态|证据 [ABC]|A\/B\/C 来源分级|完整资料包|下载完整资料|codex-preview|SkeletonPreview/i);
});

test("keeps every page uniform, every detail rich, and process artifacts out of the published UI", async () => {
  const [page, content, css, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/content.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  const exhibitData = content.slice(content.indexOf("export const exhibits"), content.indexOf("export const trends"));
  const signalData = content.slice(content.indexOf("export const signalDetails"));
  assert.equal((exhibitData.match(/^\s{4}vendor:/gm) ?? []).length, 25);
  assert.equal((exhibitData.match(/isTopTen: true/g) ?? []).length, 10);
  assert.equal((exhibitData.match(/details: \[/g) ?? []).length, 25);
  assert.equal((exhibitData.match(/facts: \[/g) ?? []).length, 25);
  assert.equal((exhibitData.match(/\{ heading:/g) ?? []).length, 75);
  assert.equal((exhibitData.match(/artwork: \{ src:/g) ?? []).length, 25);
  assert.equal((exhibitData.match(/source: "https:\/\//g) ?? []).length, 25);
  assert.equal((signalData.match(/title: trends\[\d\]\[1\]/g) ?? []).length, 4);
  assert.equal((signalData.match(/sections: \[/g) ?? []).length, 4);
  assert.equal((signalData.match(/\{ heading:/g) ?? []).length, 16);
  assert.match(page, /const totalPages = sourcePage \+ 1/);
  assert.match(page, /function SignalDetailPage[\s\S]*signal\.sections\.map/);
  assert.match(page, /function ExhibitDetailPage[\s\S]*item\.details\.map/);
  assert.match(page, /<img src=\{item\.artwork\.src\} alt=\{item\.artwork\.alt\}/);
  assert.match(page, /function pageSlug/);
  assert.match(page, /pageFromHash\(window\.location\.hash\)/);
  assert.match(page, /function ShareButton/);
  assert.match(page, /ArrowRight/);
  assert.match(page, /onTouchStart/);
  assert.match(page, /className={`mag-page/);
  assert.doesNotMatch(page + content, /证据状态|证据 [ABC]|verificationPrompt|evidence:|status:|priority-[sab]|同赛道背景图/);
  assert.doesNotMatch(page, /downloads\/|资料包|archive-stats|A\/B\/C/);
  assert.match(css, /\.magazine-frame\s*\{[^}]*aspect-ratio:\s*16\s*\/\s*10/s);
  assert.match(css, /@media \(max-width: 700px\)[\s\S]*\.magazine-frame\s*\{\s*aspect-ratio:\s*3\s*\/\s*4/s);
  assert.match(css, /\.mag-page\s*\{[^}]*height:\s*100%/s);
  assert.match(css, /\.detail-scroll\s*\{[^}]*overflow-y:\s*auto/s);
  assert.match(css, /--fs-body:\s*clamp\(13px/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(layout, /new URL\("og\.png", siteUrl\)/);
  assert.doesNotMatch(layout, /完整资料包/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
  await assert.rejects(access(new URL("../public/downloads/WAIC2026_参展资料_首轮_20260721.zip", import.meta.url)));
  await access(new URL("../public/og.png", import.meta.url));
  await access(new URL("../public/images/editorial/compute-huawei.png", import.meta.url));
  await access(new URL("../public/images/editorial/products/kimi-k27.png", import.meta.url));
  await access(new URL("../public/images/editorial/products/liweke-x-ai.jpg", import.meta.url));
  await access(new URL("../public/images/editorial/products/senad-iloabot-x.png", import.meta.url));
  await access(new URL("../public/images/editorial/products/360-security.png", import.meta.url));
  await access(new URL("../research/WAIC2026_整理大纲.md", import.meta.url));
  await access(new URL("../research/02_摘要/详情页配图来源.md", import.meta.url));
  await assert.rejects(access(new URL("public/_sites-preview", templateRoot)));
});
