import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://waic-2026-aftershow-guide.deron-qi.chatgpt.site/";
const imageUrl = new URL("og.png", siteUrl).toString();

export const metadata: Metadata = {
  title: "WAIC 2026 展后精选｜新品、亮点与不可错过",
  description: "从 30 份原始资料中整理的 WAIC 2026 展后图录：25 个重点展品、六大赛道、来源分级与核实边界。",
  openGraph: {
    title: "WAIC 2026 展后精选",
    description: "新品 · 亮点 · 不可错过｜25 个重点项目与六大赛道展后图录",
    type: "website",
    locale: "zh_CN",
    url: siteUrl,
    images: [{ url: imageUrl, width: 1792, height: 1072, alt: "WAIC 2026 展后精选" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WAIC 2026 展后精选",
    description: "新品 · 亮点 · 不可错过｜25 个重点项目与六大赛道展后图录",
    images: [imageUrl],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
