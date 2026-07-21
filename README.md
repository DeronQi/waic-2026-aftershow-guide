# WAIC 2026 展后精选

一份适合浏览和分享的 WAIC 2026 展后图录，整理大会参展单位的新品、亮点与不可错过内容。

## 在线访问

[https://deronqi.github.io/waic-2026-aftershow-guide/](https://deronqi.github.io/waic-2026-aftershow-guide/)

## 内容范围

- 四条产业信号
- 十大不可错过内容
- 六大赛道导航
- 25 项重点展品搜索与筛选
- A/B/C 来源分级与原始资料链接
- 展品成熟度、演示边界和数据口径提示

当前版本基于 30 份网页原始资料和 11 张展商名录图片完成首轮整理，并非 1100 余家参展单位的全量数据库。

## 本地开发

需要 Node.js 22.13 或更高版本。

```bash
npm install
npm run dev
```

## 构建

验证 Sites / vinext 构建：

```bash
npm run build
```

生成 GitHub Pages 静态文件：

```bash
npm run build:pages
```

静态输出位于 `out/`。

## 内容说明

- “首发”不自动等同于产品成熟。
- 现场 Demo 不自动等同于跨场景泛化能力。
- “全球首个、唯一、领先”等描述按厂商口径处理，除非存在独立证据。
- 政府发布会使用“3000 余项技术产品”，部分展商名录报道使用“4000 余款展品”；站点采用政府口径并保留差异说明。

## 技术栈

- React 19
- Next.js 16
- vinext / Vite
- GitHub Pages 静态导出

## License

网站代码仅用于本项目展示。站点引用的厂商名称、产品信息及外部资料版权归各自权利人所有。
