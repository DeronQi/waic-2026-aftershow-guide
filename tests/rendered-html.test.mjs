import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

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

test("server-renders the finished WAIC magazine edition", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="zh-CN">/i);
  assert.match(html, /<title>WAIC 2026 全景特刊｜从模型竞赛到智能伙伴<\/title>/i);
  assert.match(html, /1100\+/);
  assert.match(html, /<strong>55<\/strong><span>等尺寸页面<\/span>/);
  assert.match(html, /五项结构变化/);
  assert.match(html, /七大专题/);
  assert.match(html, /九页横向对比/);
  assert.match(html, /26 篇重点展品详解/);
  assert.match(html, /property="og:image" content="https:\/\/waic-2026-aftershow-guide\.deron-qi\.chatgpt\.site\/og-v2\.png"/i);
  assert.doesNotMatch(html, /证据等级|证据 [ABC]|A\/B\/C 来源分级|下载完整资料|codex-preview|SkeletonPreview|阅读说明|三项保留判断|统一资料卡|正文状态|阅读边界|继续追问|研究过程|写作过程/i);
});

test("covers the complete outline while preserving equal pages and rich product details", async () => {
  const [page, content, magazineData, css, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/content.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/magazine-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  const exhibitData = content.slice(content.indexOf("export const exhibits"), content.indexOf("export const trends"));
  assert.equal((exhibitData.match(/^\s{4}vendor:/gm) ?? []).length, 25);
  assert.equal((exhibitData.match(/isTopTen: true/g) ?? []).length, 10);
  assert.equal((exhibitData.match(/details: \[/g) ?? []).length, 25);
  assert.equal((exhibitData.match(/artwork: \{ src:/g) ?? []).length, 25);
  assert.match(magazineData, /export const tencentExhibit/);
  assert.match(magazineData, /混元 Hy3 × WorkBuddy/);
  assert.match(magazineData, /export const magazineExhibits = \[\.\.\.exhibits, tencentExhibit\]/);
  assert.equal((magazineData.match(/^\s{4}slug: "(?:compute-systems|agents-deliver|robots-work|personal-ai|industry-proof)"/gm) ?? []).length, 5);
  assert.equal((magazineData.match(/^\s{4}slug: "(?:panorama|compute|models-agents|embodied|devices|industry|ecosystem-governance)"/gm) ?? []).length, 7);
  assert.equal((magazineData.match(/title: "(?:超节点与超集群|通用 \/ 专业智能体|全球首发证据与成熟度|机器人场景成熟度|具身模型与世界模型|手机 \/ 眼镜 \/ 耳机)"/g) ?? []).length, 6);
  assert.match(page, /const comparisonSpreads = comparisonPages\.flatMap/);
  assert.match(page, /comparisonSpreads\.map/);
  assert.match(page, /audienceRecommendations\.map\(\(item, dataIndex\)/);
  assert.match(page, /function ComparisonPage[\s\S]*matrix\.rows\.map/);
  assert.match(page, /function RecommendationPage[\s\S]*group\.items\.map/);
  assert.match(page, /const totalPages = pageEntries\.length/);
  assert.match(page, /function ChangeDetailPage[\s\S]*story\.sections\.map/);
  assert.match(page, /function ChapterPage[\s\S]*chapter\.sections\.map/);
  assert.match(page, /function ExhibitDetailPage[\s\S]*item\.details\.map/);
  assert.match(page, /pageFromHash\(window\.location\.hash\)/);
  assert.match(page, /function ShareButton/);
  assert.match(page, /ArrowRight/);
  assert.match(page, /onTouchStart/);
  assert.doesNotMatch(page, /downloads\/|证据等级|evidence:|reading-note|ReadingNotePage|statusDefinitions|三项保留判断|统一资料卡|method-note|继续追问|阅读边界|正文状态|研究过程|写作过程/);
  assert.doesNotMatch(magazineData, /statusDefinitions|heading: "验证问题"|heading: "还要验证"|判断口径|横向框架/);
  assert.match(css, /\.magazine-frame\s*\{[^}]*aspect-ratio:\s*16\s*\/\s*10/s);
  assert.match(css, /@media \(max-width: 700px\)[\s\S]*\.magazine-frame\s*\{\s*aspect-ratio:\s*3\s*\/\s*4/s);
  assert.match(css, /\.mag-page\s*\{[^}]*height:\s*100%/s);
  assert.match(css, /\.detail-scroll\s*\{[^}]*overflow-y:\s*auto/s);
  assert.match(css, /\.chapter-scroll\s*\{[^}]*overflow-y:\s*auto/s);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(layout, /new URL\("og-v2\.png", siteUrl\)/);
  assert.match(layout, /55 页等尺寸/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await access(new URL("../public/og-v2.png", import.meta.url));
  await access(new URL("../public/images/editorial/products/tencent-hy3.png", import.meta.url));
  await access(new URL("../research/WAIC2026_整理大纲.md", import.meta.url));
  await access(new URL("../research/03_二轮大纲重做/README.md", import.meta.url));
  await access(new URL("../research/03_二轮大纲重做/大纲到页面覆盖矩阵.md", import.meta.url));
  await access(new URL("../research/03_二轮大纲重做/01_原始资料/034_腾讯混元Hy3_官方.html", import.meta.url));
  await access(new URL("../research/03_二轮大纲重做/01_原始资料/035_腾讯效率智能体工具集_官方.html", import.meta.url));
  await access(new URL("../research/03_二轮大纲重做/01_原始资料/036_WorkBuddy_腾讯云产品页.html", import.meta.url));
});
