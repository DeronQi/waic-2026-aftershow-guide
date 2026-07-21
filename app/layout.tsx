import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://waic-2026-aftershow-guide.deron-qi.chatgpt.site/";
const imageUrl = new URL("og-v2.png", siteUrl).toString();

export const metadata: Metadata = {
  title: "WAIC 2026 全景特刊｜从模型竞赛到智能伙伴",
  description: "55 页等尺寸 WAIC 2026 展后电子杂志：五项结构变化、七大专题、九页横向对比与 26 篇重点展品详解。",
  openGraph: {
    title: "WAIC 2026 全景特刊｜从模型竞赛到智能伙伴",
    description: "新品与产业亮点全景｜55 页等尺寸展后电子杂志",
    type: "website",
    locale: "zh_CN",
    url: siteUrl,
    images: [{ url: imageUrl, width: 1622, height: 970, alt: "WAIC 2026 从模型竞赛到智能伙伴" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WAIC 2026 全景特刊",
    description: "从模型竞赛到智能伙伴｜55 页等尺寸展后电子杂志",
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
