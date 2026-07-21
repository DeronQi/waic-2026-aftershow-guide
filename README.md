# WAIC 2026 全景特刊

一份适合浏览和分享的 WAIC 2026 展后电子杂志，按算力、模型、智能体、具身智能、终端、行业应用、学术生态与治理展开。49 个版面采用统一尺寸，并支持索引跳转、翻页、键盘、触控和页面深链接分享。

## 在线访问

[https://deronqi.github.io/waic-2026-aftershow-guide/](https://deronqi.github.io/waic-2026-aftershow-guide/)

## 内容范围

- 五项结构变化索引与 5 个独立解读页
- 10 个官方“镇馆之宝”与 10 个编辑推荐，全部直达独立详情
- 大会全景和七个专题正文页面
- 六张跨厂商对比表与三类读者推荐清单
- 26 项重点展品索引与 26 个独立详情页，包括腾讯“混元 Hy3 × WorkBuddy”
- 重点展商索引、核心术语与延伸阅读
- 每个详情页都有对应现场图或产品图，并保留原始发布链接
- 发布站点只呈现成品杂志，原始资料与整理文档保存在仓库中

本刊收录 26 项重点展品，其中包括腾讯“混元 Hy3 × WorkBuddy”；展商索引覆盖从算力底座到消费终端的代表性厂商与单位。

## 仓库结构

- `app/`：电子杂志网页源码
- `public/images/editorial/`：详情页现场图、官方资料图与图片来源说明
- `app/magazine-data.ts`：大纲章节、对比表、推荐、展商索引和腾讯详情数据
- `research/01_原始资料/`：33 份首轮网页/模型卡快照和 11 张展商名录图片
- `research/02_摘要/`：首轮摘要、来源目录、图表与配图说明
- `research/03_二轮大纲重做/`：腾讯新增原始资料和“大纲—页面”覆盖矩阵
- `research/02_摘要/详情页配图来源.md`：现场图与官方资料图的原始链接及使用约定
- `research/WAIC2026_整理大纲.md`：完整整理大纲
- `research/WAIC2026_参展资料_首轮_20260721.zip`：首轮资料压缩包

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

## 技术栈

- React 19
- Next.js 16
- vinext / Vite
- GitHub Pages 静态导出

## License

网站代码仅用于本项目展示。站点引用的厂商名称、产品信息及外部资料版权归各自权利人所有。
