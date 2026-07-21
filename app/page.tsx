"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Track =
  | "算力与芯片"
  | "模型与智能体"
  | "具身智能"
  | "AI 原生终端"
  | "行业 AI · AI4S"
  | "安全 · 治理 · 学术";

type Exhibit = {
  vendor: string;
  title: string;
  track: Track;
  priority: "S" | "A" | "B";
  summary: string;
  why: string;
  status: string;
  evidence: "A" | "B" | "C";
  source: string;
};

const tracks: { name: Track; short: string; description: string }[] = [
  {
    name: "算力与芯片",
    short: "COMPUTE",
    description: "超节点、万卡集群、互联与近存计算成为新的系统竞争单元。",
  },
  {
    name: "模型与智能体",
    short: "AGENTS",
    description: "从聊天回答走向任务拆解、工具调用和端到端交付。",
  },
  {
    name: "具身智能",
    short: "ROBOTICS",
    description: "关注长时序作业、跨本体泛化、故障恢复与真实部署。",
  },
  {
    name: "AI 原生终端",
    short: "DEVICES",
    description: "手机、眼镜、耳机开始争夺持续感知与主动服务入口。",
  },
  {
    name: "行业 AI · AI4S",
    short: "INDUSTRY",
    description: "工业工程、能源与蛋白质研发出现可执行工作流。",
  },
  {
    name: "安全 · 治理 · 学术",
    short: "TRUST",
    description: "安全攻防、学术会议和全球治理构成可信 AI 的底层议题。",
  },
];

const exhibits: Exhibit[] = [
  {
    vendor: "华为",
    title: "Atlas 950 SuperPoD",
    track: "算力与芯片",
    priority: "S",
    summary: "千卡级超节点首次线下真机展示，强调系统级互联与集群能力。",
    why: "代表算力评价从单卡峰值转向互联、内存、液冷和软件栈协同。",
    status: "官方一手发布；性能仍需独立验证",
    evidence: "A",
    source: "https://www.huawei.com/cn/news/2026/7/atlas-950-superpod",
  },
  {
    vendor: "中科曙光",
    title: "曙光 8000 全国产 AI 超集群",
    track: "算力与芯片",
    priority: "S",
    summary: "面向大模型与 AI for Science 的十万卡级全国产算力底座。",
    why: "本届镇馆之宝之一，体现国产算力从设备走向大型系统工程。",
    status: "奖项与权威媒体报道",
    evidence: "B",
    source: "https://tech.gmw.cn/2026-07/19/content_38894137.htm",
  },
  {
    vendor: "阿里巴巴 · 平头哥",
    title: "真武 M890 × 磐久 AL128",
    track: "算力与芯片",
    priority: "S",
    summary: "芯片、互联与单柜 128 卡超节点的一体化展示。",
    why: "将云基础设施与智能体时代的高密度算力需求放在同一系统中观察。",
    status: "镇馆之宝项目说明；待补白皮书",
    evidence: "B",
    source: "https://static.nfnews.com/content/202607/16/c12632116.html",
  },
  {
    vendor: "中兴通讯及伙伴",
    title: "OEX / Matrix 超节点",
    track: "算力与芯片",
    priority: "S",
    summary: "开放解耦、零线缆与多芯协同的国产智算超节点方案。",
    why: "同时进入镇馆之宝和 SAIL 之星，适合观察开放算力生态。",
    status: "厂商一手发布与奖项",
    evidence: "A",
    source: "https://www.zte.com.cn/china/about/news/20260717C3.html",
  },
  {
    vendor: "东方算芯",
    title: "DF1000 软件定义近存计算芯片",
    track: "算力与芯片",
    priority: "S",
    summary: "以近存计算和 3D 混合键合缓解带宽与功耗瓶颈。",
    why: "提供了不同于单纯追逐制程的国产算力架构路线。",
    status: "行业媒体与厂商口径；待第三方测评",
    evidence: "C",
    source: "https://www.ijiwei.com/n/1066127",
  },
  {
    vendor: "百度",
    title: "百度搭子",
    track: "模型与智能体",
    priority: "S",
    summary: "覆盖研究、文件、网页到报告和演示文稿的任务闭环。",
    why: "把通用智能体从建议工具推向可交付成果的工作入口。",
    status: "奖项与现场媒体观察",
    evidence: "B",
    source: "https://www.yicai.com/news/103278845.html",
  },
  {
    vendor: "阶跃星辰 · STEPX",
    title: "STEPX Neo · Step AOS · Amoo",
    track: "模型与智能体",
    priority: "S",
    summary: "把智能体能力放入操作系统原生层，覆盖终端操作与世界模型。",
    why: "产品组合完整，能够观察 Agentic OS 从概念到产品的落差。",
    status: "权威报道与奖项；待补量产信息",
    evidence: "B",
    source: "https://www.news.cn/digital/20260714/8354f82874ee4741ad1fd9ef716112ef/c.html",
  },
  {
    vendor: "商汤",
    title: "SenseNova U1 Pro",
    track: "模型与智能体",
    priority: "A",
    summary: "理解与生成统一的多模态旗舰模型，面向复杂内容与系统交付。",
    why: "适合观察多模态能力如何由模型演示进入企业应用。",
    status: "厂商一手发布",
    evidence: "A",
    source: "https://www.sensenova.cn/u1-pro",
  },
  {
    vendor: "MiniMax",
    title: "M3",
    track: "模型与智能体",
    priority: "A",
    summary: "强调长上下文、原生多模态与编程能力的旗舰模型。",
    why: "是本届基础模型赛道中兼顾开发者与智能体场景的代表。",
    status: "官方技术博客；并非仅为 WAIC 发布",
    evidence: "A",
    source: "https://www.minimax.io/blog/minimax-m3",
  },
  {
    vendor: "月之暗面",
    title: "Kimi K2.7 Code",
    track: "模型与智能体",
    priority: "A",
    summary: "面向软件工程和 Agentic 任务的代码模型。",
    why: "代码是检验智能体持续规划、工具使用与结果验证的重要场景。",
    status: "模型资料与展会报道；待补本届专页",
    evidence: "B",
    source: "https://www.yicai.com/news/103278845.html",
  },
  {
    vendor: "生数科技",
    title: "Motubrain 世界动作模型",
    track: "模型与智能体",
    priority: "A",
    summary: "统一视觉语言、视频动力学与动作技能，连接数字生成和物理执行。",
    why: "为世界模型如何进入机器人控制提供了清晰观察样本。",
    status: "官方技术页与论文线索",
    evidence: "A",
    source: "https://www.motubrain.com/",
  },
  {
    vendor: "智元机器人",
    title: "远征 A3 Ultra · G2 Max 等五款新品",
    track: "具身智能",
    priority: "S",
    summary: "整机、灵巧手和模型组合，并展示仓储与半导体长时序作业。",
    why: "从产品矩阵到真实场景部署，具备较完整的商业化观察面。",
    status: "多源报道；量产与稳定性待核验",
    evidence: "B",
    source: "https://static.nfnews.com/content/202607/16/c12632116.html",
  },
  {
    vendor: "蚂蚁集团",
    title: "LingBot-VLA 机器人智慧药房",
    track: "具身智能",
    priority: "S",
    summary: "三种构型机器人协同完成问诊、配药到取药的现场闭环。",
    why: "用一个高辨识度流程展示统一模型、多机器人协作与行业边界。",
    status: "镇馆之宝说明；待补厂商原始页",
    evidence: "B",
    source: "https://static.nfnews.com/content/202607/16/c12632116.html",
  },
  {
    vendor: "RoboScience",
    title: "Visics · RoboMirage · FingerEye",
    track: "具身智能",
    priority: "A",
    summary: "强调一脑多手、跨本体快速适配和精细触觉。",
    why: "直面具身模型最关键的泛化、迁移与触觉难题。",
    status: "新华网现场报道；成功率为厂商口径",
    evidence: "B",
    source: "https://www.news.cn/finance/20260718/cc0ca32a79d2406986a1697e9f448aae/c.html",
  },
  {
    vendor: "傅利叶",
    title: "具身之家 · GRW · GR Nano",
    track: "具身智能",
    priority: "A",
    summary: "把具身智能拉向家庭陪伴、康养与轮式双臂协作。",
    why: "家庭和康养比舞台 Demo 更能暴露安全、成本与持续服务问题。",
    status: "权威媒体报道；待补官方产品页",
    evidence: "B",
    source: "https://www.rmzxw.com.cn/c/2026-07-17/3948694.shtml",
  },
  {
    vendor: "魔法原子",
    title: "三款战略具身新品",
    track: "具身智能",
    priority: "A",
    summary: "多形态硬件、具身大模型与九类应用场景的组合展示。",
    why: "适合观察物理 AI 公司的产品组合与行业落地打法。",
    status: "地方权威媒体；待补型号与参数",
    evidence: "B",
    source: "https://jsnews.jschina.com.cn/jsyw/202607/t20260718_s6a5af230e4b0b0018d77382c.shtml",
  },
  {
    vendor: "科大讯飞",
    title: "讯飞 AI 眼镜",
    track: "AI 原生终端",
    priority: "S",
    summary: "聚焦唇动识别、多模态降噪、实时翻译与轻量佩戴。",
    why: "普通观众可以直接理解价值，也便于追问续航与可用边界。",
    status: "奖项与现场报道",
    evidence: "B",
    source: "https://www.dzwww.com/xinwen/shehuixinwen/202607/t20260719_17944108.htm",
  },
  {
    vendor: "荣耀",
    title: "Robot Phone · Agentic OS",
    track: "AI 原生终端",
    priority: "A",
    summary: "以可动感知结构和系统级智能体重新定义手机交互。",
    why: "让手机从纯屏幕设备向具身感知终端迈出可讨论的一步。",
    status: "官方发布；需区分预约与交付",
    evidence: "A",
    source: "https://www.honor.com/cn/news/honor-waic-2026/",
  },
  {
    vendor: "千问 · Bose",
    title: "AI 智能体耳机",
    track: "AI 原生终端",
    priority: "A",
    summary: "覆盖同传、会议纪要、健康记录与眼镜联动。",
    why: "耳机可能成为比屏幕更自然的常驻智能体入口。",
    status: "现场报道；价格与上市时间未公开",
    evidence: "B",
    source: "https://www.yicai.com/video/103280043.html",
  },
  {
    vendor: "李未可",
    title: "AI 记忆眼镜 · WakeeMemory OS",
    track: "AI 原生终端",
    priority: "A",
    summary: "从问答和拍摄转向长期现实记忆与主动服务。",
    why: "产品价值和隐私边界同样突出，适合做正反两面分析。",
    status: "媒体与厂商口径；隐私边界待核实",
    evidence: "C",
    source: "https://www.stcn.com/article/detail/4018264.html",
  },
  {
    vendor: "西门子",
    title: "Eigen Engineering Agent",
    track: "行业 AI · AI4S",
    priority: "A",
    summary: "可执行 PLC 编程、系统配置与迭代优化的工程智能体。",
    why: "工业智能体从辅助问答走向工程执行的代表案例。",
    status: "中国首发新闻稿；效率指标待客户验证",
    evidence: "C",
    source: "https://www.prnasia.com/story/540513-1.shtml",
  },
  {
    vendor: "天鹜科技",
    title: "MatwingsVenus 蛋白质研发智能体",
    track: "行业 AI · AI4S",
    priority: "A",
    summary: "对话式蛋白质设计与自动化湿实验组成研发闭环。",
    why: "AI for Science 从生成候选走向实验验证的典型路径。",
    status: "公司一手发布与奖项；成果数字待审计",
    evidence: "A",
    source: "https://www.matwings.com/",
  },
  {
    vendor: "南方电网",
    title: "大瓦特·云睿配电网规划智能体",
    track: "行业 AI · AI4S",
    priority: "A",
    summary: "覆盖诊断、方案生成、仿真校核、投资评估与报告编制。",
    why: "展示了高责任行业中智能体完整执行链的可能形态。",
    status: "镇馆之宝项目说明",
    evidence: "B",
    source: "https://static.nfnews.com/content/202607/16/c12632116.html",
  },
  {
    vendor: "赛那德",
    title: "iLoabot-X 2.0 · Insight-World V3.0",
    track: "行业 AI · AI4S",
    priority: "B",
    summary: "物流装卸机器人与垂直物理引擎的组合。",
    why: "物流装卸具有任务清晰、需求稳定、可量化回报等商业优势。",
    status: "区政府介绍；待补订单与客户证据",
    evidence: "B",
    source: "https://www.shpt.gov.cn/yaowen/20260720/971575.html",
  },
  {
    vendor: "360",
    title: "图龙锋 · 仪天阵 · 磐石之盾",
    track: "安全 · 治理 · 学术",
    priority: "B",
    summary: "把 AI 用于漏洞挖掘、自动研判与秒级阻断。",
    why: "补齐了智能体扩张之后必须同步建设的安全攻防维度。",
    status: "区政府介绍；待补原始技术说明",
    evidence: "B",
    source: "https://www.shpt.gov.cn/yaowen/20260720/971575.html",
  },
];

const trends = [
  ["01", "算力走向系统化", "从单芯片参数，转向超节点、万卡集群与软硬协同。"],
  ["02", "智能体开始交付", "不再只给建议，而是拆解任务、调用工具并交付成果。"],
  ["03", "机器人进入岗位", "关注连续作业、跨本体泛化和故障恢复，而非舞台动作。"],
  ["04", "终端原生化", "眼镜、耳机与手机成为持续感知、主动服务的个人入口。"],
];

const keySources = [
  ["A", "大会规模与布局", "上海市政府新闻办", "https://www.shio.gov.cn/TrueCMS/shxwbgs/wxdtt/content/44bee286-669a-48d3-adb0-6d046dc83fdd.htm"],
  ["B", "十大现场看点", "第一财经", "https://www.yicai.com/news/103278845.html"],
  ["B", "十大镇馆之宝", "南方+", "https://static.nfnews.com/content/202607/16/c12632116.html"],
  ["B", "闭幕数据与成果", "中国日报", "https://cn.chinadaily.com.cn/a/202607/21/WS6a5eb534a310d709c2fbea57.html"],
  ["A", "WAIC Academic", "官方站", "https://waica2026.worldaic.com.cn/"],
  ["A/B", "全球 AI 治理合作倡议", "新华网", "https://www.news.cn/20260717/3310820b96f949979ce6406712094935/c.html"],
];

const pageLabels = ["封面", "卷首与目录", "四条信号", "算力与芯片", "模型与智能体", "具身智能", "AI 原生终端", "行业 AI · AI4S", "安全 · 学术 · 治理", "资料与来源"];

function Page({ number, kicker, title, className = "", children }: { number: number; kicker: string; title: string; className?: string; children: ReactNode }) {
  return (
    <section className={`mag-page ${className}`} aria-label={`第 ${number + 1} 页：${title}`}>
      <header className="page-head">
        <span>WAIC 2026 / POST-SHOW EDITION</span>
        <b>{kicker}</b>
      </header>
      <div className="page-body">{children}</div>
      <footer className="page-foot">
        <span>新品 · 亮点 · 不可错过</span>
        <b>{String(number + 1).padStart(2, "0")} / {String(pageLabels.length).padStart(2, "0")}</b>
      </footer>
    </section>
  );
}

function ExhibitTile({ item, index }: { item: Exhibit; index: number }) {
  return (
    <article className="exhibit-tile">
      <div className="tile-meta">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <b className={`priority priority-${item.priority.toLowerCase()}`}>{item.priority}</b>
        <em>证据 {item.evidence}</em>
      </div>
      <h3>{item.vendor}</h3>
      <h4>{item.title}</h4>
      <p>{item.summary}</p>
      <div className="tile-bottom">
        <span>{item.status}</span>
        <a href={item.source} target="_blank" rel="noreferrer" aria-label={`查看${item.vendor}${item.title}的原始来源`}>来源 ↗</a>
      </div>
    </article>
  );
}

function TrackPage({ pageNumber, track, title, deck }: { pageNumber: number; track: Track; title: string; deck: string }) {
  const items = exhibits.filter((item) => item.track === track);
  return (
    <Page number={pageNumber} kicker={track} title={title} className="track-page">
      <div className="chapter-title">
        <span>{String(pageNumber - 2).padStart(2, "0")} / TRACK</span>
        <h2>{title}</h2>
        <p>{deck}</p>
      </div>
      <div className={`tile-grid tile-count-${items.length}`}>
        {items.map((item, index) => <ExhibitTile item={item} index={index} key={`${item.vendor}-${item.title}`} />)}
      </div>
    </Page>
  );
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const touchStart = useRef<number | null>(null);

  const goToPage = (page: number) => setCurrentPage(Math.max(0, Math.min(pageLabels.length - 1, page)));

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "PageDown") goToPage(currentPage + 1);
      if (event.key === "ArrowLeft" || event.key === "PageUp") goToPage(currentPage - 1);
      if (event.key === "Home") goToPage(0);
      if (event.key === "End") goToPage(pageLabels.length - 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage]);

  const renderPage = () => {
    if (currentPage === 0) {
      return (
        <Page number={0} kicker="ISSUE 01 · JUL 2026" title="封面" className="cover-page">
          <div className="cover-grid">
            <div className="cover-copy">
              <span className="cover-eyebrow">A CURATED FIELD GUIDE TO INTELLIGENCE</span>
              <h1>WAIC<br />2026</h1>
              <h2>展后精选</h2>
              <p>新品 · 亮点 · 不可错过</p>
            </div>
            <div className="cover-data">
              <div><strong>1100+</strong><span>参展单位</span></div>
              <div><strong>3000+</strong><span>展品</span></div>
              <div><strong>300+</strong><span>全球首发</span></div>
              <p>一套基于 30 份网页原文、11 张展商名录图片整理的电子杂志。</p>
            </div>
          </div>
          <div className="cover-mark" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
        </Page>
      );
    }

    if (currentPage === 1) {
      return (
        <Page number={1} kicker="FRONT MATTER" title="卷首与目录" className="contents-page">
          <div className="contents-layout">
            <div className="editorial-lead">
              <span>EDITOR&apos;S NOTE</span>
              <h2>AI 正以四种<br />更具体的形态<br />进入产业</h2>
              <p>超节点成为算力竞争单元；智能体开始交付完整任务；机器人进入连续作业；AI 原生终端争夺个人入口。</p>
              <div className="principles"><b>首发 ≠ 成熟</b><b>Demo ≠ 泛化</b><b>参数 ≠ 可比</b></div>
            </div>
            <div className="contents-list">
              {pageLabels.slice(2).map((label, index) => (
                <button type="button" key={label} onClick={() => goToPage(index + 2)}>
                  <span>{String(index + 3).padStart(2, "0")}</span><b>{label}</b><em>GO ↗</em>
                </button>
              ))}
            </div>
          </div>
        </Page>
      );
    }

    if (currentPage === 2) {
      return (
        <Page number={2} kicker="THE BIG SHIFT" title="四条产业信号" className="signals-page">
          <div className="signals-title"><span>01 / SHIFT</span><h2>四条产业信号</h2><p>从展品看，产业竞争正从“模型本身”移向系统、执行与入口。</p></div>
          <div className="signal-grid">
            {trends.map(([index, title, text]) => (
              <article key={index}>
                <span>T/{index}</span><i aria-hidden="true" /><h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </Page>
      );
    }

    if (currentPage === 3) return <TrackPage pageNumber={3} track="算力与芯片" title="算力从单卡走向系统" deck="超节点、万卡集群、互联、液冷与软件栈共同决定真实可用算力。" />;
    if (currentPage === 4) return <TrackPage pageNumber={4} track="模型与智能体" title="模型开始交付完整任务" deck="评价重点从回答质量转向任务拆解、工具调用、验证与结果交付。" />;
    if (currentPage === 5) return <TrackPage pageNumber={5} track="具身智能" title="机器人从会动走向能上岗" deck="真正需要追问的是成功率、无人值守时长、故障恢复、成本与接管条件。" />;
    if (currentPage === 6) return <TrackPage pageNumber={6} track="AI 原生终端" title="新的个人入口争夺战" deck="眼镜、耳机与手机正在变成持续感知、主动服务的智能伙伴。" />;
    if (currentPage === 7) return <TrackPage pageNumber={7} track="行业 AI · AI4S" title="AI 深入高门槛工作流" deck="工业工程、能源规划、蛋白质研发与物流场景开始出现完整执行链。" />;

    if (currentPage === 8) {
      const securityItem = exhibits.find((item) => item.track === "安全 · 治理 · 学术")!;
      return (
        <Page number={8} kicker="TRUST & GOVERNANCE" title="安全、学术与治理" className="trust-page">
          <div className="trust-layout">
            <div className="trust-title"><span>07 / TRUST</span><h2>能力越强，<br />越需要新的<br />安全与治理底座</h2><p>本届大会首次自主举办 WAIC Academic，并继续把全球 AI 治理放在重要位置。</p></div>
            <div className="trust-cards">
              <ExhibitTile item={securityItem} index={0} />
              <a className="institution-card blue-card" href="https://waica2026.worldaic.com.cn/" target="_blank" rel="noreferrer"><span>ACADEMIC</span><h3>WAIC Academic</h3><p>首届自主学术会议，把论文、学者与产业议题纳入大会主线。</p><b>官方站 ↗</b></a>
              <a className="institution-card red-card" href="https://www.news.cn/20260717/3310820b96f949979ce6406712094935/c.html" target="_blank" rel="noreferrer"><span>GOVERNANCE</span><h3>全球 AI 治理合作倡议</h3><p>安全、包容、合作与发展不再是展览之外的附录。</p><b>新华网 ↗</b></a>
            </div>
          </div>
          <div className="evidence-strip"><div><b>A</b><span>政府、大会或厂商一手</span></div><div><b>B</b><span>权威媒体现场报道</span></div><div><b>C</b><span>行业媒体或待补原始材料</span></div></div>
        </Page>
      );
    }

    return (
      <Page number={9} kicker="ARCHIVE & SOURCES" title="资料与来源" className="sources-page">
        <div className="sources-layout">
          <div className="archive-panel">
            <span>FULL RESEARCH PACKAGE</span>
            <h2>所有原始资料<br />现已进入仓库</h2>
            <div className="archive-stats"><div><b>30</b><span>网页原文</span></div><div><b>11</b><span>名录图片</span></div><div><b>47</b><span>资料文件</span></div></div>
            <p>包含原始网页、展商名录图片、首轮摘要、来源目录、图表说明、整理大纲和完整 ZIP。</p>
            <div className="archive-actions">
              <a href="downloads/WAIC2026_参展资料_首轮_20260721.zip" download>下载完整资料包 ↓</a>
              <a href="https://github.com/DeronQi/waic-2026-aftershow-guide/tree/main/research" target="_blank" rel="noreferrer">浏览 GitHub 资料库 ↗</a>
            </div>
          </div>
          <div className="mag-source-list">
            {keySources.map(([grade, topic, publisher, url], index) => (
              <a href={url} target="_blank" rel="noreferrer" key={topic}>
                <span>{String(index + 1).padStart(2, "0")}</span><b>{topic}</b><em>{publisher}</em><i>{grade}</i><strong>↗</strong>
              </a>
            ))}
          </div>
        </div>
        <div className="source-caveat">政府发布会采用“3000 余项技术产品”；部分展商名录报道采用“4000 余款展品”。本刊以政府口径为主，并保留差异。</div>
      </Page>
    );
  };

  return (
    <main className="magazine-app">
      <header className="reader-topbar">
        <div className="reader-brand"><span className="brand-block" aria-hidden="true" /><b>WAIC 2026 展后精选</b><em>电子杂志 · ISSUE 01</em></div>
        <div className="reader-links">
          <a href="https://github.com/DeronQi/waic-2026-aftershow-guide" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="downloads/WAIC2026_参展资料_首轮_20260721.zip" download>资料包 ↓</a>
        </div>
      </header>

      <div className="reader-layout">
        <nav className="page-rail" aria-label="杂志目录">
          {pageLabels.map((label, index) => (
            <button type="button" key={label} className={currentPage === index ? "active" : ""} onClick={() => goToPage(index)} aria-current={currentPage === index ? "page" : undefined}>
              <span>{String(index + 1).padStart(2, "0")}</span><b>{label}</b>
            </button>
          ))}
        </nav>

        <div className="reader-main">
          <div
            className="magazine-frame"
            onTouchStart={(event) => { touchStart.current = event.changedTouches[0].clientX; }}
            onTouchEnd={(event) => {
              if (touchStart.current === null) return;
              const distance = event.changedTouches[0].clientX - touchStart.current;
              if (Math.abs(distance) > 42) goToPage(currentPage + (distance < 0 ? 1 : -1));
              touchStart.current = null;
            }}
          >
            {renderPage()}
          </div>

          <div className="reader-controls">
            <button type="button" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 0} aria-label="上一页">← 上一页</button>
            <div className="reader-progress"><span style={{ width: `${((currentPage + 1) / pageLabels.length) * 100}%` }} /><b>{pageLabels[currentPage]}</b><em>{String(currentPage + 1).padStart(2, "0")} / {String(pageLabels.length).padStart(2, "0")}</em></div>
            <button type="button" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === pageLabels.length - 1} aria-label="下一页">下一页 →</button>
          </div>
          <p className="reader-hint">键盘 ← → 或在页面上左右滑动翻页</p>
        </div>
      </div>
    </main>
  );
}
