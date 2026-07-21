"use client";

/* eslint-disable @next/next/no-img-element -- static editorial assets use relative paths for GitHub Pages and Sites */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { exhibits, keySources, signalDetails, tracks, type Artwork } from "./content";

const PAGE = {
  cover: 0,
  contents: 1,
  signals: 2,
  signalStart: 3,
  mustSee: 7,
  exhibitIndex: 8,
  exhibitStart: 9,
};

const sourcePage = PAGE.exhibitStart + exhibits.length;
const totalPages = sourcePage + 1;
const mustSee = exhibits.filter((item) => item.isTopTen);
const chapterNav = [
  [PAGE.cover, "封面"],
  [PAGE.contents, "卷首"],
  [PAGE.signals, "四条信号"],
  [PAGE.mustSee, "十大不可错过"],
  [PAGE.exhibitIndex, "展品索引"],
  [sourcePage, "延伸阅读"],
] as const;

function pageLabel(page: number) {
  if (page === PAGE.cover) return "封面";
  if (page === PAGE.contents) return "卷首与目录";
  if (page === PAGE.signals) return "四条产业信号 · 索引";
  if (page >= PAGE.signalStart && page < PAGE.mustSee) return `产业信号 · ${signalDetails[page - PAGE.signalStart].title}`;
  if (page === PAGE.mustSee) return "十大不可错过 · 索引";
  if (page === PAGE.exhibitIndex) return "重点展品 · 索引";
  if (page >= PAGE.exhibitStart && page < sourcePage) {
    const item = exhibits[page - PAGE.exhibitStart];
    return `${item.vendor} · ${item.title}`;
  }
  return "来源与延伸阅读";
}

function pageSlug(page: number) {
  if (page === PAGE.cover) return "cover";
  if (page === PAGE.contents) return "contents";
  if (page === PAGE.signals) return "signals";
  if (page >= PAGE.signalStart && page < PAGE.mustSee) return `signal-${String(page - PAGE.signalStart + 1).padStart(2, "0")}`;
  if (page === PAGE.mustSee) return "top-10";
  if (page === PAGE.exhibitIndex) return "exhibits";
  if (page >= PAGE.exhibitStart && page < sourcePage) return `exhibit-${String(page - PAGE.exhibitStart + 1).padStart(2, "0")}`;
  return "sources";
}

function pageFromHash(hash: string) {
  const slug = hash.replace(/^#/, "");
  if (!slug) return null;
  const page = Array.from({ length: totalPages }, (_, index) => index).find((index) => pageSlug(index) === slug);
  return page ?? null;
}

function Page({ number, kicker, title, className = "", children }: { number: number; kicker: string; title: string; className?: string; children: ReactNode }) {
  return (
    <section className={`mag-page ${className}`} aria-label={`第 ${number + 1} 页：${title}`}>
      <header className="page-head"><span>WAIC 2026 / POST-SHOW EDITION</span><b>{kicker}</b></header>
      <div className="page-body">{children}</div>
      <footer className="page-foot"><span>新品 · 亮点 · 不可错过</span><b>{String(number + 1).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}</b></footer>
    </section>
  );
}

function IndexArtwork({ artwork }: { artwork: Artwork }) {
  return <figure className="index-artwork"><img src={artwork.src} alt={artwork.alt} /></figure>;
}

function ShareButton() {
  const [shared, setShared] = useState(false);

  const share = async () => {
    const shareData = { title: pageLabel(pageFromHash(window.location.hash) ?? 0), url: window.location.href };
    try {
      if (navigator.share) await navigator.share(shareData);
      else await navigator.clipboard.writeText(shareData.url);
      setShared(true);
      window.setTimeout(() => setShared(false), 1800);
    } catch {
      setShared(false);
    }
  };

  return <button type="button" className="share-button" onClick={share}>{shared ? "链接已复制 ✓" : "分享本页 ↗"}</button>;
}

function SignalIndex({ goToPage }: { goToPage: (page: number) => void }) {
  return (
    <Page number={PAGE.signals} kicker="THE BIG SHIFT" title="四条产业信号" className="signals-page">
      <div className="index-heading signal-heading"><span>01 / SHIFT</span><h2>四条产业信号</h2><p>从 25 项重点展品中，读出算力、智能体、机器人与终端正在发生的结构变化。</p></div>
      <div className="signal-grid">
        {signalDetails.map((signal, index) => (
          <button type="button" key={signal.title} onClick={() => goToPage(PAGE.signalStart + index)}>
            <IndexArtwork artwork={signal.artwork} />
            <span>T/{String(index + 1).padStart(2, "0")}</span>
            <h3>{signal.title}</h3>
            <p>{signal.deck}</p>
            <b>阅读完整解读 ↗</b>
          </button>
        ))}
      </div>
    </Page>
  );
}

function SignalDetailPage({ index, goToPage }: { index: number; goToPage: (page: number) => void }) {
  const signal = signalDetails[index];
  return (
    <Page number={PAGE.signalStart + index} kicker={`SIGNAL 0${index + 1}`} title={signal.title} className="detail-page signal-detail-page">
      <div className="detail-layout">
        <figure className="detail-visual">
          <img src={signal.artwork.src} alt={signal.artwork.alt} />
          <figcaption>{signal.artwork.caption}</figcaption>
          <span className="visual-number">T/{String(index + 1).padStart(2, "0")}</span>
        </figure>
        <article className="detail-copy">
          <div className="detail-scroll">
            <div className="detail-kickers"><span>产业信号</span><b>0{index + 1} / 04</b></div>
            <h2>{signal.title}</h2>
            <p className="detail-lead">{signal.deck}</p>
            <ul className="fact-strip">{signal.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
            <div className="section-list">
              {signal.sections.map((section) => <section key={section.heading}><h3>{section.heading}</h3><p>{section.body}</p></section>)}
            </div>
          </div>
          <div className="detail-actions"><button type="button" className="index-return" onClick={() => goToPage(PAGE.signals)}>← 返回四条信号</button><ShareButton /></div>
        </article>
      </div>
    </Page>
  );
}

function MustSeeIndex({ goToPage }: { goToPage: (page: number) => void }) {
  return (
    <Page number={PAGE.mustSee} kicker="EDITOR'S TOP TEN" title="十大不可错过" className="must-index-page">
      <div className="index-heading"><span>02 / TOP TEN</span><h2>十大不可错过</h2><p>按首发性、产业代表性与现场信息密度选出。每项均有独立长文详情与对应配图。</p></div>
      <div className="must-grid">
        {mustSee.map((item, index) => {
          const exhibitIndex = exhibits.indexOf(item);
          return (
            <button type="button" key={`${item.vendor}-${item.title}`} onClick={() => goToPage(PAGE.exhibitStart + exhibitIndex)}>
              <img src={item.artwork.src} alt="" />
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><b>{item.vendor}</b><p>{item.title}</p></div>
              <em>详情 ↗</em>
            </button>
          );
        })}
      </div>
    </Page>
  );
}

function ExhibitIndex({ goToPage }: { goToPage: (page: number) => void }) {
  return (
    <Page number={PAGE.exhibitIndex} kicker="SELECTED EXHIBITS" title="重点展品索引" className="exhibit-index-page">
      <div className="index-heading compact-heading"><span>03 / INDEX</span><h2>重点展品索引</h2><p>25 项重点展品 · 六条赛道 · 点击任一项目进入完整详情。</p></div>
      <div className="exhibit-index-grid">
        {exhibits.map((item, index) => (
          <button type="button" key={`${item.vendor}-${item.title}`} onClick={() => goToPage(PAGE.exhibitStart + index)}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <b>{item.vendor}</b>
            <p>{item.title}</p>
            {item.isTopTen && <em>TOP 10</em>}
          </button>
        ))}
      </div>
      <div className="track-legend">{tracks.map((track) => <span key={track.name}><i />{track.name}</span>)}</div>
    </Page>
  );
}

function ExhibitDetailPage({ index, goToPage }: { index: number; goToPage: (page: number) => void }) {
  const item = exhibits[index];
  return (
    <Page number={PAGE.exhibitStart + index} kicker={item.track.toUpperCase()} title={`${item.vendor} · ${item.title}`} className="detail-page exhibit-detail-page">
      <div className="detail-layout">
        <figure className="detail-visual">
          <img src={item.artwork.src} alt={item.artwork.alt} />
          <figcaption>{item.artwork.caption}</figcaption>
          <span className="visual-number">{String(index + 1).padStart(2, "0")}</span>
        </figure>
        <article className="detail-copy">
          <div className="detail-scroll">
            <div className="detail-kickers"><span>{item.track}</span><b>重点展品 {String(index + 1).padStart(2, "0")} / {exhibits.length}</b></div>
            {item.isTopTen && <span className="top-ten-badge">十大不可错过</span>}
            <h2>{item.vendor}</h2>
            <h3 className="product-title">{item.title}</h3>
            <p className="detail-lead">{item.summary}</p>
            <ul className="fact-strip">{item.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
            <div className="section-list">
              {item.details.map((section) => <section key={section.heading}><h3>{section.heading}</h3><p>{section.body}</p></section>)}
            </div>
          </div>
          <div className="detail-actions">
            <button type="button" className="index-return" onClick={() => goToPage(PAGE.exhibitIndex)}>← 返回展品索引</button>
            <div><ShareButton /><a href={item.source} target="_blank" rel="noreferrer">查看来源 ↗</a></div>
          </div>
        </article>
      </div>
    </Page>
  );
}

function SourcesPage() {
  return (
    <Page number={sourcePage} kicker="FURTHER READING" title="来源与延伸阅读" className="sources-page">
      <div className="sources-intro">
        <span>READ THE ORIGINALS</span>
        <h2>继续阅读<br />原始发布</h2>
        <p>每个展品详情页均保留直接来源链接。本页汇总大会规模、现场看点、镇馆之宝、闭幕成果、学术与治理六个全局入口。</p>
      </div>
      <div className="source-list">
        {keySources.map(([topic, publisher, url], index) => (
          <a href={url} target="_blank" rel="noreferrer" key={topic}>
            <span>{String(index + 1).padStart(2, "0")}</span><b>{topic}</b><em>{publisher}</em><strong>↗</strong>
          </a>
        ))}
      </div>
      <p className="source-note">内容截至 2026 年 7 月 21 日。产品参数和案例以各链接中的发布主体口径为准。</p>
    </Page>
  );
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const touchStart = useRef<number | null>(null);

  const goToPage = (page: number) => {
    const nextPage = Math.max(0, Math.min(totalPages - 1, page));
    setCurrentPage(nextPage);
    if (typeof window !== "undefined") window.history.replaceState(null, "", `#${pageSlug(nextPage)}`);
  };

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
  }, [currentPage]);

  const renderPage = () => {
    if (currentPage === PAGE.cover) {
      return (
        <Page number={PAGE.cover} kicker="ISSUE 01 · JUL 2026" title="封面" className="cover-page">
          <div className="cover-grid">
            <div className="cover-copy"><span>A CURATED FIELD GUIDE TO INTELLIGENCE</span><h1>WAIC<br />2026</h1><h2>展后精选</h2><p>新品 · 亮点 · 不可错过</p></div>
            <div className="cover-data"><div><strong>1100+</strong><span>参展单位</span></div><div><strong>3000+</strong><span>展品</span></div><div><strong>300+</strong><span>全球首发</span></div><p>35 页等尺寸电子杂志 · 4 篇产业解读 · 25 篇展品详情</p></div>
          </div>
          <div className="cover-mark" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
        </Page>
      );
    }

    if (currentPage === PAGE.contents) {
      const contents = chapterNav.slice(2);
      return (
        <Page number={PAGE.contents} kicker="FRONT MATTER" title="卷首与目录" className="contents-page">
          <div className="contents-layout">
            <div className="editorial-lead"><span>EDITOR&apos;S NOTE</span><h2>从索引进入<br />每一个现场<br />重点</h2><p>四条产业信号、十大不可错过与 25 项重点展品，全部拥有可独立分享的完整详情页。</p><div className="principles"><b>产品是什么</b><b>技术怎么做</b><b>应用在哪里</b></div></div>
            <div className="contents-list">{contents.map(([page, label]) => <button type="button" key={label} onClick={() => goToPage(page)}><span>{String(page + 1).padStart(2, "0")}</span><b>{label}</b><em>GO ↗</em></button>)}</div>
          </div>
        </Page>
      );
    }

    if (currentPage === PAGE.signals) return <SignalIndex goToPage={goToPage} />;
    if (currentPage >= PAGE.signalStart && currentPage < PAGE.mustSee) return <SignalDetailPage index={currentPage - PAGE.signalStart} goToPage={goToPage} />;
    if (currentPage === PAGE.mustSee) return <MustSeeIndex goToPage={goToPage} />;
    if (currentPage === PAGE.exhibitIndex) return <ExhibitIndex goToPage={goToPage} />;
    if (currentPage >= PAGE.exhibitStart && currentPage < sourcePage) return <ExhibitDetailPage index={currentPage - PAGE.exhibitStart} goToPage={goToPage} />;
    return <SourcesPage />;
  };

  return (
    <main className="magazine-app">
      <header className="reader-topbar">
        <div className="reader-brand"><span className="brand-block" aria-hidden="true" /><b>WAIC 2026 展后精选</b><em>电子杂志 · 35 PAGES</em></div>
        <div className="reader-links"><a href="https://github.com/DeronQi/waic-2026-aftershow-guide" target="_blank" rel="noreferrer">GitHub ↗</a></div>
      </header>
      <div className="reader-layout">
        <nav className="page-rail" aria-label="杂志章节目录">
          {chapterNav.map(([page, label]) => {
            const nextChapter = chapterNav.find(([chapterPage]) => chapterPage > page)?.[0] ?? totalPages;
            const isActive = currentPage >= page && currentPage < nextChapter;
            return <button type="button" key={label} className={isActive ? "active" : ""} onClick={() => goToPage(page)} aria-current={currentPage === page ? "page" : undefined}><span>{String(page + 1).padStart(2, "0")}</span><b>{label}</b></button>;
          })}
        </nav>
        <div className="reader-main">
          <div className="magazine-frame" onTouchStart={(event) => { touchStart.current = event.changedTouches[0].clientX; }} onTouchEnd={(event) => { if (touchStart.current === null) return; const distance = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(distance) > 42) goToPage(currentPage + (distance < 0 ? 1 : -1)); touchStart.current = null; }}>
            {renderPage()}
          </div>
          <div className="reader-controls">
            <button type="button" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 0} aria-label="上一页">← 上一页</button>
            <div className="reader-progress"><span style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }} /><b>{pageLabel(currentPage)}</b><em>{String(currentPage + 1).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}</em></div>
            <button type="button" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages - 1} aria-label="下一页">下一页 →</button>
          </div>
          <p className="reader-hint">从索引进入详情 · 键盘 ← → 或在页面上左右滑动翻页 · 详情正文可上下滚动</p>
        </div>
      </div>
    </main>
  );
}
