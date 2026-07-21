"use client";

import { useMemo, useState } from "react";

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

const curated = exhibits.filter((item) => item.priority === "S");

export default function Home() {
  const [activeTrack, setActiveTrack] = useState<Track | "全部">("全部");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return exhibits.filter((item) => {
      const inTrack = activeTrack === "全部" || item.track === activeTrack;
      const text = `${item.vendor} ${item.title} ${item.summary} ${item.why}`.toLowerCase();
      return inTrack && (!keyword || text.includes(keyword));
    });
  }, [activeTrack, query]);

  const trackCount = (track: Track) => exhibits.filter((item) => item.track === track).length;

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="返回页面顶部">
          <span className="brand-block" aria-hidden="true" />
          <span>WAIC 26 / POST-SHOW</span>
        </a>
        <nav className="nav-links" aria-label="页面导航">
          <a href="#signals">趋势</a>
          <a href="#must-see">必看</a>
          <a href="#explorer">展品索引</a>
          <a href="#sources">来源</a>
        </nav>
        <span className="edition">SHANGHAI · 2026</span>
      </header>

      <div id="top" className="page-shell">
        <section className="hero" aria-labelledby="page-title">
          <div className="hero-copy">
            <p className="eyebrow">A CURATED FIELD GUIDE TO INTELLIGENCE</p>
            <h1 id="page-title">WAIC 2026<br />展后精选</h1>
            <p className="hero-subtitle">新品 · 亮点 · 不可错过</p>
            <p className="hero-intro">
              一份从 30 份原始资料中整理出的展后图录。我们不把“首发”等同于成熟，
              也不把现场 Demo 等同于可规模化落地。
            </p>
          </div>
          <div className="metric-panel" aria-label="大会核心规模数据">
            <div className="metric"><strong>1100+</strong><span>参展单位</span><small>EXHIBITORS</small></div>
            <div className="metric"><strong>3000+</strong><span>展品</span><small>EXHIBITS</small></div>
            <div className="metric metric-red"><strong>300+</strong><span>全球首发</span><small>GLOBAL DEBUTS</small></div>
            <a className="metric-source" href="https://www.shio.gov.cn/TrueCMS/shxwbgs/wxdtt/content/44bee286-669a-48d3-adb0-6d046dc83fdd.htm" target="_blank" rel="noreferrer">
              官方口径 ↗
            </a>
          </div>
        </section>

        <section className="editor-note" aria-label="编辑结论">
          <span className="section-code">EDITOR&apos;S NOTE / 01</span>
          <p>
            本届最值得记录的，不是又发布了多少个大模型，而是 AI 以四种更具体的形态进入产业：
            <strong>超节点成为算力单元、智能体开始交付任务、机器人进入连续作业、AI 原生终端争夺个人入口。</strong>
          </p>
        </section>

        <section id="signals" className="section-block">
          <div className="section-heading">
            <span>01 / SHIFT</span><h2>四条产业信号</h2><p>从展品看产业如何移动</p>
          </div>
          <div className="trend-grid">
            {trends.map(([index, title, text]) => (
              <article className="trend-card" key={index}>
                <span className="trend-index">T/{index}</span>
                <span className="trend-dot" aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="must-see" className="section-block">
          <div className="section-heading">
            <span>02 / CURATED</span><h2>十大不可错过</h2><p>S 级编辑推荐 · 按赛道而非名次排列</p>
          </div>
          <div className="curated-grid">
            {curated.map((item, index) => (
              <article className="curated-card" key={item.vendor}>
                <div className="curated-meta"><span>{String(index + 1).padStart(2, "0")}</span><b>{item.track}</b></div>
                <h3>{item.vendor}</h3>
                <h4>{item.title}</h4>
                <p>{item.summary}</p>
                <a href={item.source} target="_blank" rel="noreferrer" aria-label={`查看${item.vendor}${item.title}的来源`}>
                  来源 {item.evidence} ↗
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="route-section" aria-labelledby="route-title">
          <div className="route-label"><span>03 / ROUTE MAP</span><h2 id="route-title">六大赛道</h2></div>
          <div className="route-grid">
            {tracks.map((track, index) => (
              <button
                type="button"
                className="route-stop"
                key={track.name}
                onClick={() => {
                  setActiveTrack(track.name);
                  document.getElementById("explorer")?.scrollIntoView({ behavior: "smooth" });
                }}
                aria-label={`筛选${track.name}，共 ${trackCount(track.name)} 项`}
              >
                <span className="station" aria-hidden="true" />
                <small>{String(index + 1).padStart(2, "0")} · {track.short}</small>
                <strong>{track.name}</strong>
                <em>{trackCount(track.name)} 项</em>
                <p>{track.description}</p>
              </button>
            ))}
          </div>
        </section>

        <section id="explorer" className="section-block explorer">
          <div className="section-heading">
            <span>04 / INDEX</span><h2>重点展品索引</h2><p>25 项首轮候选 · 可筛选与检索</p>
          </div>

          <div className="filter-panel">
            <label className="search-box">
              <span>搜索厂商或展品</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="例如：超节点、机器人、眼镜"
                type="search"
              />
            </label>
            <div className="filter-buttons" aria-label="按赛道筛选">
              <button type="button" className={activeTrack === "全部" ? "active" : ""} onClick={() => setActiveTrack("全部")}>全部 <b>25</b></button>
              {tracks.map((track) => (
                <button
                  type="button"
                  key={track.name}
                  className={activeTrack === track.name ? "active" : ""}
                  onClick={() => setActiveTrack(track.name)}
                >
                  {track.name} <b>{trackCount(track.name)}</b>
                </button>
              ))}
            </div>
          </div>

          <div className="result-line" aria-live="polite">
            <span>RESULT / {String(filtered.length).padStart(2, "0")}</span>
            {(activeTrack !== "全部" || query) && (
              <button type="button" onClick={() => { setActiveTrack("全部"); setQuery(""); }}>清除筛选</button>
            )}
          </div>

          <div className="exhibit-grid">
            {filtered.map((item, index) => (
              <article className="exhibit-card" key={`${item.vendor}-${item.title}`}>
                <div className="exhibit-topline">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <b className={`priority priority-${item.priority.toLowerCase()}`}>{item.priority}</b>
                  <em>证据 {item.evidence}</em>
                </div>
                <p className="track-tag">{item.track}</p>
                <h3>{item.vendor}</h3>
                <h4>{item.title}</h4>
                <p className="summary">{item.summary}</p>
                <details>
                  <summary>为什么值得看</summary>
                  <p>{item.why}</p>
                  <p className="status"><strong>证据状态：</strong>{item.status}</p>
                </details>
                <a className="source-link" href={item.source} target="_blank" rel="noreferrer">查看原始来源 ↗</a>
              </article>
            ))}
          </div>
          {filtered.length === 0 && <p className="empty-state">没有匹配的项目。换个关键词，或清除筛选。</p>}
        </section>

        <section id="sources" className="method-section">
          <div className="method-intro">
            <span className="section-code">05 / SOURCE NOTES</span>
            <h2>每一个判断<br />都能回到来源</h2>
            <p>当前资料库保存 30 个网页原文和 11 张展商名录图片。来源按可追溯性分级，厂商宣传口径不会被自动写成独立事实。</p>
            <div className="grade-list">
              <div><b>A</b><span>政府、大会或厂商一手发布</span></div>
              <div><b>B</b><span>权威媒体现场报道</span></div>
              <div><b>C</b><span>行业媒体、转载或待补原始材料</span></div>
            </div>
          </div>
          <div className="source-list">
            {keySources.map(([grade, topic, publisher, url], index) => (
              <a href={url} target="_blank" rel="noreferrer" key={topic}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <b>{topic}</b>
                <em>{publisher}</em>
                <i>{grade}</i>
                <strong aria-hidden="true">↗</strong>
              </a>
            ))}
          </div>
        </section>

        <section className="caveat-section">
          <span>READ BEFORE SHARING</span>
          <h2>首发 ≠ 成熟 · Demo ≠ 泛化 · 参数 ≠ 可比</h2>
          <div>
            <p>政府发布会使用“3000 余项技术产品”，展商名录相关报道使用“4000 余款展品”。本站以政府口径为主，并保留差异。</p>
            <p>“全球首个、唯一、领先”等描述默认按厂商口径标注；价格、量产、客户、稳定性和独立测试仍是后续核实重点。</p>
          </div>
        </section>

        <footer className="footer">
          <div><span className="brand-block" aria-hidden="true" /><strong>WAIC 2026 展后精选</strong></div>
          <p>首轮资料版 · 更新于 2026-07-21 · 上海</p>
          <a href="#top">返回顶部 ↑</a>
        </footer>
      </div>
    </main>
  );
}
