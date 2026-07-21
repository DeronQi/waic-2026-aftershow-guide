"use client";

/* eslint-disable @next/next/no-img-element -- the magazine ships a curated local image archive for static exports */

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  audienceRecommendations,
  changes,
  chapters,
  comparisonPages,
  exhibitMeta,
  exhibitorIndex,
  globalSources,
  glossary,
  magazineExhibits,
  type ChangeStory,
  type Chapter,
} from "./magazine-data";

type PageKind =
  | "cover"
  | "contents"
  | "change-index"
  | "change"
  | "must-see"
  | "chapter"
  | "comparison"
  | "recommendation"
  | "exhibit-index"
  | "exhibit"
  | "exhibitor-index"
  | "glossary"
  | "sources";

type PageEntry = {
  slug: string;
  label: string;
  kind: PageKind;
  dataIndex?: number;
};

const comparisonSpreads = comparisonPages.flatMap((group) =>
  group.matrices.map((matrix) => ({ ...matrix, deck: group.deck })),
);

const pageEntries: PageEntry[] = [
  { slug: "cover", label: "封面", kind: "cover" },
  { slug: "contents", label: "总目录", kind: "contents" },
  { slug: "executive-summary", label: "执行摘要", kind: "change-index" },
  ...changes.map((item, dataIndex) => ({ slug: `shift-${item.slug}`, label: item.title, kind: "change" as const, dataIndex })),
  { slug: "must-see", label: "20 个不可错过", kind: "must-see" },
  ...chapters.map((item, dataIndex) => ({ slug: item.slug, label: item.title, kind: "chapter" as const, dataIndex })),
  ...comparisonSpreads.map((item, dataIndex) => ({ slug: `comparison-${dataIndex + 1}`, label: item.title, kind: "comparison" as const, dataIndex })),
  ...audienceRecommendations.map((item, dataIndex) => ({ slug: `recommendation-${dataIndex + 1}`, label: `${item.audience}精选路线`, kind: "recommendation" as const, dataIndex })),
  { slug: "exhibits", label: "重点展品索引", kind: "exhibit-index" },
  ...magazineExhibits.map((item, dataIndex) => ({ slug: `exhibit-${String(dataIndex + 1).padStart(2, "0")}`, label: `${item.vendor} · ${item.title}`, kind: "exhibit" as const, dataIndex })),
  { slug: "exhibitor-index", label: "展商索引", kind: "exhibitor-index" },
  { slug: "glossary", label: "核心术语", kind: "glossary" },
  { slug: "sources", label: "来源与延伸阅读", kind: "sources" },
];

const totalPages = pageEntries.length;
const pageBySlug = new Map(pageEntries.map((entry, index) => [entry.slug, index]));
const officialIndices = exhibitMeta.flatMap((meta, index) => meta.editorialTag === "官方镇馆之宝" ? [index] : []);
const editorIndices = exhibitMeta.flatMap((meta, index) => meta.editorialTag === "编辑推荐" ? [index] : []);

const railItems = [
  ["cover", "封面"],
  ["executive-summary", "执行摘要"],
  ["panorama", "大会全景"],
  ["compute", "算力与芯片"],
  ["models-agents", "模型与智能体"],
  ["embodied", "具身智能"],
  ["devices", "AI 原生终端"],
  ["industry", "行业应用"],
  ["ecosystem-governance", "学术与治理"],
  ["comparison-1", "横向对比"],
  ["exhibits", "重点展品"],
  ["exhibitor-index", "附录"],
] as const;

const contentsItems = [
  ["executive-summary", "01", "执行摘要", "五项结构变化与 20 个不可错过项目"],
  ["panorama", "02", "大会全景", "规模、三地四馆与 2025→2026 热点迁移"],
  ["compute", "03", "算力、芯片与基础设施", "超节点、国产芯片、绿色算力"],
  ["models-agents", "04", "模型、世界模型与智能体", "多模态、通用智能体与专业智能体"],
  ["embodied", "05", "具身智能", "整机、岗位、家庭、基础模型与灵巧手"],
  ["devices", "06", "AI 原生终端", "手机、眼镜、耳机与陪伴硬件"],
  ["industry", "07", "行业应用", "AI4S、工业、能源、医疗教育与安全"],
  ["ecosystem-governance", "08", "学术、生态与治理", "WAIC Academic、SAIL、OPC 与全球合作"],
  ["comparison-1", "09", "跨厂商对比与推荐", "六张核心表与三类读者路线，共 9 个独立版面"],
  ["exhibitor-index", "10", "附录", "重点展商、核心术语与延伸阅读"],
] as const;

function indexOfSlug(slug: string) {
  return pageBySlug.get(slug) ?? 0;
}

function pageFromHash(hash: string) {
  const slug = hash.replace(/^#/, "");
  return slug ? pageBySlug.get(slug) ?? null : null;
}

function PageShell({ number, kicker, title, className = "", children }: { number: number; kicker: string; title: string; className?: string; children: ReactNode }) {
  return (
    <section className={`mag-page ${className}`} aria-label={`第 ${number + 1} 页：${title}`}>
      <header className="page-head"><span>WAIC 2026 / POST-SHOW FIELD GUIDE</span><b>{kicker}</b></header>
      <div className="page-body">{children}</div>
      <footer className="page-foot"><span>从模型竞赛到智能伙伴</span><b>{String(number + 1).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}</b></footer>
    </section>
  );
}

function ShareButton({ title }: { title: string }) {
  const [shared, setShared] = useState(false);

  const share = async () => {
    const shareData = { title, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(shareData);
      else await navigator.clipboard.writeText(shareData.url);
      setShared(true);
      window.setTimeout(() => setShared(false), 1600);
    } catch {
      setShared(false);
    }
  };

  return <button type="button" className="share-button" onClick={share}>{shared ? "链接已复制" : "分享本页 ↗"}</button>;
}

function CoverPage({ number, goToPage }: { number: number; goToPage: (page: number) => void }) {
  return (
    <PageShell number={number} kicker="THE COMPLETE 2026 EDITION" title="从模型竞赛到智能伙伴" className="cover-page">
      <div className="cover-grid">
        <div className="cover-copy">
          <span>WORLD ARTIFICIAL INTELLIGENCE CONFERENCE / SHANGHAI</span>
          <h1>WAIC<br />2026</h1>
          <h2>从模型竞赛<br />到智能伙伴</h2>
          <p>新品与产业亮点全景</p>
          <button type="button" className="cover-start" onClick={() => goToPage(indexOfSlug("contents"))}>开始阅读 <span>→</span></button>
        </div>
        <div className="cover-side">
          <figure><img src="images/editorial/event-waic.jpg" alt="WAIC 2026 展馆现场" /><figcaption>SHANGHAI · 17—20 JUL 2026</figcaption></figure>
          <div className="cover-data">
            <div><strong>1100+</strong><span>参展单位</span></div>
            <div><strong>3000+</strong><span>技术产品</span></div>
            <div><strong>300+</strong><span>全球首发</span></div>
            <div><strong>{totalPages}</strong><span>等尺寸页面</span></div>
          </div>
          <p>按算力、模型、智能体、具身智能、终端、行业应用与治理完整重构。</p>
        </div>
      </div>
    </PageShell>
  );
}

function ContentsPage({ number, goToPage }: { number: number; goToPage: (page: number) => void }) {
  return (
    <PageShell number={number} kicker="CONTENTS" title="总目录" className="contents-page">
      <div className="contents-full">
        <div className="contents-masthead"><span>10 CHAPTERS / {totalPages} PAGES</span><h2>完整目录</h2><p>点击任一章节直达。重点展品另有独立长文页面，所有页面均可分享深链接。</p></div>
        <div className="contents-grid">
          {contentsItems.map(([slug, chapter, title, deck]) => (
            <button type="button" key={slug} onClick={() => goToPage(indexOfSlug(slug))}>
              <span>{chapter}</span><div><b>{title}</b><p>{deck}</p></div><em>↗</em>
            </button>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

function ChangeIndexPage({ number, goToPage }: { number: number; goToPage: (page: number) => void }) {
  return (
    <PageShell number={number} kicker="EXECUTIVE SUMMARY" title="本届大会最重要的变化" className="change-index-page">
      <div className="index-heading five-heading"><span>01 / THE SHIFT</span><h2>五项结构变化</h2><p>从底层算力到行业验证，WAIC 2026 的主线已经从“能力展示”迁移到“系统交付”。</p></div>
      <div className="five-change-grid">
        {changes.map((item, index) => (
          <button type="button" key={item.slug} onClick={() => goToPage(indexOfSlug(`shift-${item.slug}`))}>
            <figure><img src={item.artwork.src} alt="" /></figure>
            <span>0{index + 1}</span>
            <h3>{item.title}</h3>
            <p>{item.deck}</p>
            <b>完整判断 ↗</b>
          </button>
        ))}
      </div>
    </PageShell>
  );
}

function ChangeDetailPage({ number, story, index, goToPage }: { number: number; story: ChangeStory; index: number; goToPage: (page: number) => void }) {
  return (
    <PageShell number={number} kicker={`SHIFT 0${index + 1} / ${story.eyebrow}`} title={story.title} className="detail-page change-detail-page">
      <div className="detail-layout">
        <figure className="detail-visual">
          <img src={story.artwork.src} alt={story.artwork.alt} />
          <figcaption>{story.artwork.caption}</figcaption>
          <span className="visual-number">S/0{index + 1}</span>
        </figure>
        <article className="detail-copy">
          <div className="detail-scroll">
            <div className="detail-kickers"><span>本届大会最重要的变化</span><b>0{index + 1} / 05</b></div>
            <h2>{story.title}</h2>
            <p className="detail-lead">{story.deck}</p>
            <ul className="fact-strip">{story.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
            <div className="section-list">
              {story.sections.map((section) => <section key={section.heading}><h3>{section.heading}</h3><p>{section.body}</p></section>)}
            </div>
          </div>
          <div className="detail-actions"><button type="button" className="index-return" onClick={() => goToPage(indexOfSlug("executive-summary"))}>← 返回执行摘要</button><ShareButton title={story.title} /></div>
        </article>
      </div>
    </PageShell>
  );
}

function MustSeePage({ number, goToPage }: { number: number; goToPage: (page: number) => void }) {
  return (
    <PageShell number={number} kicker="20 MUST-SEE PROJECTS" title="一页不可错过清单" className="must-see-page">
      <div className="must-heading"><div><span>01.2 / MUST SEE</span><h2>20 个不可错过</h2></div><p>10 个官方“镇馆之宝”＋10 个有显著首发、现场演示或产业代表性的编辑推荐。点击进入独立详情。</p></div>
      <div className="must-columns">
        {[officialIndices, editorIndices].map((indices, groupIndex) => (
          <section key={groupIndex}>
            <header><span>{groupIndex === 0 ? "OFFICIAL" : "EDITORIAL"}</span><b>{groupIndex === 0 ? "官方镇馆之宝" : "编辑推荐"}</b></header>
            <div>
              {indices.map((exhibitIndex, index) => {
                const item = magazineExhibits[exhibitIndex];
                return (
                  <button type="button" key={`${item.vendor}-${item.title}`} onClick={() => goToPage(indexOfSlug(`exhibit-${String(exhibitIndex + 1).padStart(2, "0")}`))}>
                    <span>{String(index + 1).padStart(2, "0")}</span><b>{item.vendor}</b><p>{item.title}</p><em>↗</em>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}

function ChapterPage({ number, chapter, goToPage }: { number: number; chapter: Chapter; goToPage: (page: number) => void }) {
  const nextChapter = chapters.find((item) => Number(item.number) === Number(chapter.number) + 1);
  return (
    <PageShell number={number} kicker={`${chapter.number} / ${chapter.eyebrow}`} title={chapter.title} className="chapter-page">
      <div className="chapter-layout">
        <aside className="chapter-hero">
          <figure><img src={chapter.artwork.src} alt={chapter.artwork.alt} /><figcaption>{chapter.artwork.caption}</figcaption></figure>
          <span>CHAPTER {chapter.number}</span>
          <h2>{chapter.title}</h2>
          <p>{chapter.deck}</p>
        </aside>
        <article className="chapter-copy">
          <div className="chapter-scroll">
            {chapter.sections.map((section, index) => (
              <section key={section.heading}>
                <div className="chapter-section-title"><span>{chapter.number}.{index + 1}</span><h3>{section.heading}</h3></div>
                <p>{section.body}</p>
                <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>
              </section>
            ))}
          </div>
          <div className="detail-actions">
            <button type="button" className="index-return" onClick={() => goToPage(indexOfSlug("contents"))}>← 返回目录</button>
            <div><ShareButton title={chapter.title} />{nextChapter ? <button type="button" className="next-chapter" onClick={() => goToPage(indexOfSlug(nextChapter.slug))}>下一章 →</button> : <button type="button" className="next-chapter" onClick={() => goToPage(indexOfSlug("comparison-1"))}>进入对比 →</button>}</div>
          </div>
        </article>
      </div>
    </PageShell>
  );
}

function ComparisonPage({ number, index }: { number: number; index: number }) {
  const matrix = comparisonSpreads[index];
  return (
    <PageShell number={number} kicker={`09 / COMPARISON ${String(index + 1).padStart(2, "0")}`} title={matrix.title} className="comparison-page">
      <div className="comparison-heading"><span>09.{String(index + 1).padStart(2, "0")}</span><div><h2>{matrix.title}</h2><p>{matrix.deck}</p></div></div>
      <div className="matrix-spread">
        <aside><span>COMPARISON</span><strong>{String(index + 1).padStart(2, "0")}</strong><b>OF 06</b></aside>
        <section className="matrix-feature">
          <div className="matrix" role="table" aria-label={matrix.title}>
            <div className="matrix-row matrix-head" role="row">{matrix.columns.map((column) => <b key={column} role="columnheader">{column}</b>)}</div>
            {matrix.rows.map((row, rowIndex) => <div className="matrix-row" role="row" key={rowIndex}>{row.map((cell, cellIndex) => <span role="cell" key={cellIndex}>{cell}</span>)}</div>)}
          </div>
          <div className="matrix-takeaway"><span>核心判断</span><p>{matrix.note}</p></div>
        </section>
      </div>
    </PageShell>
  );
}

function RecommendationPage({ number, index }: { number: number; index: number }) {
  const group = audienceRecommendations[index];
  return (
    <PageShell number={number} kicker={`09 / RECOMMENDATION ${String(index + 1).padStart(2, "0")}`} title={`${group.audience}精选路线`} className="recommendations-page">
      <div className="recommendation-heading"><span>WHO SHOULD SEE WHAT / 0{index + 1}</span><h2>{group.audience}<br />精选路线</h2><p>{group.lead} 本页把最值得关注的系统、产品与议题串成一条完整路线。</p></div>
      <div className="audience-spread">
        <aside><span>RECOMMENDED</span><strong>{String(group.items.length).padStart(2, "0")}</strong><b>项重点内容</b></aside>
        <ol>{group.items.map((item, itemIndex) => <li key={item}><span>{String(itemIndex + 1).padStart(2, "0")}</span><b>{item}</b></li>)}</ol>
      </div>
    </PageShell>
  );
}

function ExhibitIndexPage({ number, goToPage }: { number: number; goToPage: (page: number) => void }) {
  return (
    <PageShell number={number} kicker="SELECTED EXHIBITS" title="重点展品索引" className="exhibit-index-page">
      <div className="index-heading compact-heading"><span>FIELD NOTES</span><h2>重点展品索引</h2><p>{magazineExhibits.length} 项重点展品，全部配有独立图片、产品状态、技术解读与产业意义。</p></div>
      <div className="exhibit-index-grid expanded-index">
        {magazineExhibits.map((item, index) => (
          <button type="button" key={`${item.vendor}-${item.title}`} onClick={() => goToPage(indexOfSlug(`exhibit-${String(index + 1).padStart(2, "0")}`))}>
            <span>{String(index + 1).padStart(2, "0")}</span><b>{item.vendor}</b><p>{item.title}</p>{exhibitMeta[index].editorialTag ? <em>{exhibitMeta[index].editorialTag === "官方镇馆之宝" ? "官方" : "推荐"}</em> : null}
          </button>
        ))}
      </div>
      <div className="track-legend"><span><i />算力与芯片</span><span><i />模型与智能体</span><span><i />具身智能</span><span><i />AI 原生终端</span><span><i />行业 AI / AI4S</span><span><i />安全与治理</span></div>
    </PageShell>
  );
}

function ExhibitDetailPage({ number, index, goToPage }: { number: number; index: number; goToPage: (page: number) => void }) {
  const item = magazineExhibits[index];
  const meta = exhibitMeta[index];
  return (
    <PageShell number={number} kicker={item.track.toUpperCase()} title={`${item.vendor} · ${item.title}`} className="detail-page exhibit-detail-page">
      <div className="detail-layout">
        <figure className="detail-visual">
          <img src={item.artwork.src} alt={item.artwork.alt} />
          <figcaption>{item.artwork.caption}</figcaption>
          <span className="visual-number">{String(index + 1).padStart(2, "0")}</span>
        </figure>
        <article className="detail-copy">
          <div className="detail-scroll">
            <div className="detail-kickers"><span>{item.track}</span><b>重点展品 {String(index + 1).padStart(2, "0")} / {magazineExhibits.length}</b></div>
            {meta.editorialTag ? <span className="top-ten-badge">{meta.editorialTag}</span> : null}
            <h2>{item.vendor}</h2>
            <h3 className="product-title">{item.title}</h3>
            <p className="detail-lead">{item.summary}</p>
            <ul className="fact-strip">{item.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
            <div className="maturity-strip"><span>大会状态 <b>{meta.status}</b></span><span>成熟度 <b>{meta.maturity}</b></span></div>
            <div className="section-list">
              {item.details.map((section) => <section key={section.heading}><h3>{section.heading}</h3><p>{section.body}</p></section>)}
            </div>
          </div>
          <div className="detail-actions">
            <button type="button" className="index-return" onClick={() => goToPage(indexOfSlug("exhibits"))}>← 返回展品索引</button>
            <div><ShareButton title={`${item.vendor} · ${item.title}`} /><a href={item.source} target="_blank" rel="noreferrer">原始来源 ↗</a></div>
          </div>
        </article>
      </div>
    </PageShell>
  );
}

function ExhibitorIndexPage({ number }: { number: number }) {
  return (
    <PageShell number={number} kicker="10.1 / EXHIBITOR INDEX" title="重点展商与单位索引" className="appendix-page exhibitor-list-page">
      <div className="appendix-heading"><span>APPENDIX A</span><div><h2>重点展商与单位索引</h2><p>从算力底座到消费终端，按赛道汇集本刊重点提及的厂商与单位，便于快速查找。</p></div></div>
      <div className="exhibitor-table" role="table" aria-label="重点展商与单位索引">
        <div className="exhibitor-row table-head" role="row"><b>厂商 / 单位</b><b>赛道</b><b>主要展品</b></div>
        {exhibitorIndex.map(([vendor, track, product]) => <div className="exhibitor-row" role="row" key={`${vendor}-${product}`}><span>{vendor}</span><span>{track}</span><span>{product}</span></div>)}
      </div>
    </PageShell>
  );
}

function GlossaryPage({ number }: { number: number }) {
  return (
    <PageShell number={number} kicker="10.2 / GLOSSARY" title="核心术语" className="appendix-page glossary-page">
      <div className="glossary-layout">
        <header className="glossary-intro"><span>APPENDIX B</span><h2>核心术语</h2><p>十个高频概念，串起算力系统、智能体、具身智能与创新生态。</p></header>
        <section className="glossary-list">{glossary.map(([term, definition], index) => <article key={term}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{term}</h3><p>{definition}</p></div></article>)}</section>
      </div>
    </PageShell>
  );
}

function SourcesPage({ number }: { number: number }) {
  return (
    <PageShell number={number} kicker="10.3 / ORIGINALS" title="来源与延伸阅读" className="sources-page">
      <div className="sources-intro"><span>READ THE ORIGINALS</span><h2>继续阅读<br />原始发布</h2><p>从会前发布、开幕现场到产业观察与闭幕成果，本页精选政府发布、大会专题与主流媒体的全景报道。</p></div>
      <div className="source-list extended-sources">
        {globalSources.map(([topic, publisher, url], index) => <a href={url} target="_blank" rel="noreferrer" key={`${topic}-${publisher}`}><span>{String(index + 1).padStart(2, "0")}</span><b>{topic}</b><em>{publisher}</em><strong>↗</strong></a>)}
      </div>
      <p className="source-note">报道更新至 2026 年 7 月 21 日。链接按会前信息、现场观察与闭幕成果编排。</p>
    </PageShell>
  );
}

function renderPage(entry: PageEntry, number: number, goToPage: (page: number) => void) {
  switch (entry.kind) {
    case "cover": return <CoverPage number={number} goToPage={goToPage} />;
    case "contents": return <ContentsPage number={number} goToPage={goToPage} />;
    case "change-index": return <ChangeIndexPage number={number} goToPage={goToPage} />;
    case "change": return <ChangeDetailPage number={number} story={changes[entry.dataIndex ?? 0]} index={entry.dataIndex ?? 0} goToPage={goToPage} />;
    case "must-see": return <MustSeePage number={number} goToPage={goToPage} />;
    case "chapter": return <ChapterPage number={number} chapter={chapters[entry.dataIndex ?? 0]} goToPage={goToPage} />;
    case "comparison": return <ComparisonPage number={number} index={entry.dataIndex ?? 0} />;
    case "recommendation": return <RecommendationPage number={number} index={entry.dataIndex ?? 0} />;
    case "exhibit-index": return <ExhibitIndexPage number={number} goToPage={goToPage} />;
    case "exhibit": return <ExhibitDetailPage number={number} index={entry.dataIndex ?? 0} goToPage={goToPage} />;
    case "exhibitor-index": return <ExhibitorIndexPage number={number} />;
    case "glossary": return <GlossaryPage number={number} />;
    case "sources": return <SourcesPage number={number} />;
  }
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const touchStart = useRef<number | null>(null);

  const goToPage = useCallback((page: number) => {
    const nextPage = Math.max(0, Math.min(totalPages - 1, page));
    setCurrentPage(nextPage);
    if (typeof window !== "undefined") window.history.replaceState(null, "", `#${pageEntries[nextPage].slug}`);
  }, []);

  useEffect(() => {
    const syncFromHash = () => {
      const page = pageFromHash(window.location.hash);
      if (page !== null) setCurrentPage(page);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "PageDown") goToPage(currentPage + 1);
      if (event.key === "ArrowLeft" || event.key === "PageUp") goToPage(currentPage - 1);
      if (event.key === "Home") goToPage(0);
      if (event.key === "End") goToPage(totalPages - 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, goToPage]);

  const currentEntry = pageEntries[currentPage];

  return (
    <div className="magazine-app">
      <a className="skip-link" href="#magazine-frame">跳到当前页面</a>
      <header className="reader-topbar">
        <button type="button" className="reader-brand" onClick={() => goToPage(0)} aria-label="返回封面"><span className="brand-block" /><span><b>WAIC 2026 全景特刊</b><em>POST-SHOW FIELD GUIDE</em></span></button>
        <nav className="reader-links" aria-label="站点链接"><a href="https://github.com/DeronQi/waic-2026-aftershow-guide" target="_blank" rel="noreferrer">项目主页 ↗</a><ShareButton title={currentEntry.label} /></nav>
      </header>
      <div className="reader-layout">
        <nav className="page-rail" aria-label="章节导航">
          {railItems.map(([slug, label]) => {
            const page = indexOfSlug(slug);
            const active = currentPage === page || (slug === "exhibits" && currentEntry.kind === "exhibit");
            return <button type="button" key={slug} className={active ? "active" : ""} onClick={() => goToPage(page)}><span>{String(page + 1).padStart(2, "0")}</span><b>{label}</b></button>;
          })}
        </nav>
        <main className="reader-main">
          <div id="magazine-frame" className="magazine-frame" tabIndex={-1} onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => {
            if (touchStart.current === null) return;
            const delta = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
            if (Math.abs(delta) > 58) goToPage(currentPage + (delta < 0 ? 1 : -1));
            touchStart.current = null;
          }}>
            {renderPage(currentEntry, currentPage, goToPage)}
          </div>
          <div className="reader-controls">
            <button type="button" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 0}>← 上一页</button>
            <div className="reader-progress" aria-live="polite"><span style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }} /><b>{currentEntry.label}</b><em>{currentPage + 1} / {totalPages}</em></div>
            <button type="button" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages - 1}>下一页 →</button>
          </div>
          <p className="reader-hint">键盘 ← → / PageUp PageDown · 移动端可左右滑动 · 每页链接可独立分享</p>
        </main>
      </div>
    </div>
  );
}
