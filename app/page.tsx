"use client";

/* eslint-disable @next/next/no-img-element -- static editorial assets use relative paths for GitHub Pages and Sites */

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

type Artwork = {
  src: string;
  alt: string;
  caption: string;
};

const trackArtwork: Record<Track, Artwork> = {
  "算力与芯片": {
    src: "images/editorial/event-waic-2.jpg",
    alt: "WAIC 2026 算力展区的 Atlas 950 SuperPoD 机柜",
    caption: "本届算力基础设施现场资料图 · 第一财经",
  },
  "模型与智能体": {
    src: "images/editorial/model-minimax.png",
    alt: "MiniMax M3 模型发布视觉",
    caption: "模型与智能体赛道资料图 · MiniMax 官方",
  },
  "具身智能": {
    src: "images/editorial/robot-magiclab.jpg",
    alt: "WAIC 2026 现场的 MagicLab 人形机器人",
    caption: "具身智能展区现场资料图 · 新华报业",
  },
  "AI 原生终端": {
    src: "images/editorial/terminal-qwen.png",
    alt: "WAIC 现场发布的 AI 智能体耳机画面",
    caption: "AI 原生终端现场资料图 · 第一财经",
  },
  "行业 AI · AI4S": {
    src: "images/editorial/industry-siemens.jpg",
    alt: "西门子 Eigen 工程智能体获得 WAIC SAIL 奖项",
    caption: "工业智能体资料图 · 西门子官方",
  },
  "安全 · 治理 · 学术": {
    src: "images/editorial/compute-sugon.png",
    alt: "WAIC 2026 展馆现场与参观人群",
    caption: "WAIC 2026 展馆现场资料图 · 光明网",
  },
};

const exhibitArtwork: Record<string, Artwork> = {
  华为: {
    src: "images/editorial/compute-huawei.png",
    alt: "华为 Atlas 950 SuperPoD 展示区",
    caption: "Atlas 950 SuperPoD 现场图 · 华为官方",
  },
  中科曙光: {
    src: "images/editorial/compute-sugon.png",
    alt: "中科曙光 WAIC 2026 展区现场",
    caption: "曙光展区现场图 · 光明网",
  },
  东方晶源: {
    src: "images/editorial/compute-eastern.jpg",
    alt: "东方晶源 WAIC 2026 展台",
    caption: "东方晶源展台现场图 · 爱集微",
  },
  MiniMax: {
    src: "images/editorial/model-minimax.png",
    alt: "MiniMax M3 模型发布视觉",
    caption: "MiniMax M3 官方发布图",
  },
  MagicLab: {
    src: "images/editorial/robot-magiclab.jpg",
    alt: "MagicLab 人形机器人现场展示",
    caption: "MagicLab 机器人现场图 · 新华报业",
  },
  阿里云: {
    src: "images/editorial/terminal-qwen.png",
    alt: "WAIC 现场发布的通义智能体终端画面",
    caption: "通义智能体终端现场资料图 · 第一财经",
  },
  西门子: {
    src: "images/editorial/industry-siemens.jpg",
    alt: "西门子 Eigen 工程智能体获得 WAIC SAIL 奖项",
    caption: "Eigen 工程智能体资料图 · 西门子官方",
  },
};

const signalDetails = [
  {
    title: trends[0][1],
    deck: trends[0][2],
    artwork: trackArtwork["算力与芯片"],
    paragraphs: [
      "WAIC 2026 的算力焦点不再是一张芯片的峰值参数，而是超节点、万卡集群、互联网络、内存体系、液冷和软件栈能否组合成一套稳定的生产系统。华为 Atlas 950 SuperPoD、中科曙光全国产 AI 超集群等展品，把这种变化放到了展馆中央。",
      "这意味着采购和评价逻辑也要改变。真实训练与推理能力取决于集群通信效率、故障恢复、调度利用率和可运维性；单卡参数很高，并不自动等于集群中可以持续交付的有效算力。",
      "看展时最值得追问的是：规模数字对应的是已交付系统还是规划能力？互联效率、能耗、稳定性和软件生态是否有可复现数据？只有这些答案齐备，‘超节点’才从展台概念变成产业基础设施。",
    ],
  },
  {
    title: trends[1][1],
    deck: trends[1][2],
    artwork: trackArtwork["模型与智能体"],
    paragraphs: [
      "模型能力正在从一次对话延伸为一条完整任务链。MiniMax M3、豆包编程智能体、阶跃 AI 桌面伙伴等新品共同强调任务拆解、工具调用、过程校验和成果交付，而不只是在聊天框里给出建议。",
      "产业价值因此从‘回答得像不像’转向‘事情能否真正办完’。一个可用智能体要理解目标、读取上下文、调用外部系统，并在错误发生时重新规划；权限边界和可审计记录也成为产品的一部分。",
      "判断智能体是否进入生产阶段，应重点查看任务成功率、人工接管点、失败恢复、调用成本以及评测集是否贴近真实工作。漂亮的单次演示只证明路径可行，长期稳定交付才代表产品成熟。",
    ],
  },
  {
    title: trends[2][1],
    deck: trends[2][2],
    artwork: trackArtwork["具身智能"],
    paragraphs: [
      "人形机器人仍是展馆最具吸引力的景观，但本届更重要的变化，是厂商开始把叙事从舞台动作转向连续作业。MagicLab、逐际动力、智元和优必选的展品，都把全身控制、跨本体适配或工业岗位作为主要方向。",
      "‘进入岗位’要求机器人面对长时序任务、环境变化和不可避免的失败。真正困难的不是完成一次动作，而是在传感器误差、物体位置变化和人员干扰下持续完成，并知道何时停机或请求人类接管。",
      "因此，现场应优先询问无人值守时长、任务成功率、故障恢复、部署成本和已经运行的客户场景。能否从一台样机复制到多台设备、从一天演示复制到数月运营，是具身智能商业化的分水岭。",
    ],
  },
  {
    title: trends[3][1],
    deck: trends[3][2],
    artwork: trackArtwork["AI 原生终端"],
    paragraphs: [
      "AI 正从应用中的一个功能，变成手机、眼镜和耳机的系统级入口。阿里云智能体耳机、星纪魅族 AI Phone、AR 智能眼镜等展品，把语音、视觉和个人上下文连接为持续服务。",
      "入口之争的关键不是再增加一个聊天按钮，而是设备能否在合适的时间理解环境、调用服务并完成动作。低时延、本地推理、续航、跨应用权限和隐私保护，会共同决定这种主动服务是否可信。",
      "评价终端新品时，应把演示拆成真实使用链：连续佩戴多久、离线还能做什么、哪些数据会上云、误触发如何纠正、服务能否跨应用闭环。只有当这些环节自然衔接，AI 原生终端才会成为新的个人计算入口。",
    ],
  },
];

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
const mustSee = exhibits.filter((item) => item.priority === "S");
const chapterNav = [
  [PAGE.cover, "封面"],
  [PAGE.contents, "卷首"],
  [PAGE.signals, "四条信号"],
  [PAGE.mustSee, "十大必看"],
  [PAGE.exhibitIndex, "展品索引"],
  [sourcePage, "资料来源"],
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
  return "资料与来源";
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
      <header className="page-head">
        <span>WAIC 2026 / POST-SHOW EDITION</span>
        <b>{kicker}</b>
      </header>
      <div className="page-body">{children}</div>
      <footer className="page-foot">
        <span>新品 · 亮点 · 不可错过</span>
        <b>{String(number + 1).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}</b>
      </footer>
    </section>
  );
}

function IndexArtwork({ artwork }: { artwork: Artwork }) {
  return (
    <figure className="index-artwork">
      <img src={artwork.src} alt={artwork.alt} />
    </figure>
  );
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
      <div className="signals-title"><span>01 / SHIFT</span><h2>四条产业信号</h2><p>每条信号都有一页独立解读。点击卡片进入详情。</p></div>
      <div className="signal-grid signal-index-grid">
        {signalDetails.map((signal, index) => (
          <button type="button" key={signal.title} onClick={() => goToPage(PAGE.signalStart + index)}>
            <IndexArtwork artwork={signal.artwork} />
            <span>T/{String(index + 1).padStart(2, "0")}</span>
            <h3>{signal.title}</h3>
            <p>{signal.deck}</p>
            <b>阅读详情 ↗</b>
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
          <div className="detail-kickers"><span>产业信号</span><b>0{index + 1} / 04</b></div>
          <h2>{signal.title}</h2>
          <h3>{signal.deck}</h3>
          <div className="detail-paragraphs">
            {signal.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="detail-actions"><button type="button" className="index-return" onClick={() => goToPage(PAGE.signals)}>← 返回四条信号索引</button><ShareButton /></div>
        </article>
      </div>
    </Page>
  );
}

function MustSeeIndex({ goToPage }: { goToPage: (page: number) => void }) {
  return (
    <Page number={PAGE.mustSee} kicker="EDITOR'S TOP TEN" title="十大不可错过" className="must-index-page">
      <div className="index-heading"><span>02 / TOP TEN</span><h2>十大不可错过</h2><p>首发性、产业代表性与现场价值综合排序。每项均可进入独立详情页。</p></div>
      <div className="must-grid">
        {mustSee.map((item, index) => {
          const exhibitIndex = exhibits.indexOf(item);
          const artwork = exhibitArtwork[item.vendor] ?? trackArtwork[item.track];
          return (
            <button type="button" key={`${item.vendor}-${item.title}`} onClick={() => goToPage(PAGE.exhibitStart + exhibitIndex)}>
              <img src={artwork.src} alt="" />
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
      <div className="index-heading compact-heading"><span>03 / INDEX</span><h2>重点展品索引</h2><p>25 项重点展品 · 六条赛道 · 点击任一项目进入独立详情页。</p></div>
      <div className="exhibit-index-grid">
        {exhibits.map((item, index) => (
          <button type="button" key={`${item.vendor}-${item.title}`} onClick={() => goToPage(PAGE.exhibitStart + index)}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <b>{item.vendor}</b>
            <p>{item.title}</p>
            <em className={`priority priority-${item.priority.toLowerCase()}`}>{item.priority}</em>
          </button>
        ))}
      </div>
      <div className="track-legend">
        {tracks.map((track) => <span key={track.name}><i />{track.name}</span>)}
      </div>
    </Page>
  );
}

function verificationPrompt(track: Track) {
  const prompts: Record<Track, string> = {
    "算力与芯片": "后续还应核对已交付规模、集群利用率、能耗与软件生态的独立验证。",
    "模型与智能体": "后续还应核对真实任务成功率、人工接管比例、权限边界与单次任务成本。",
    "具身智能": "后续还应核对无人值守时长、故障恢复、量产成本以及已部署客户数量。",
    "AI 原生终端": "后续还应核对续航、离线能力、隐私机制以及跨应用任务能否稳定闭环。",
    "行业 AI · AI4S": "后续还应核对客户案例、业务指标改善、专业人员复核机制与规模化复制成本。",
    "安全 · 治理 · 学术": "后续还应核对评测范围、误报漏报、第三方审计以及治理机制的实际执行。",
  };
  return prompts[track];
}

function ExhibitDetailPage({ index, goToPage }: { index: number; goToPage: (page: number) => void }) {
  const item = exhibits[index];
  const artwork = exhibitArtwork[item.vendor] ?? trackArtwork[item.track];
  return (
    <Page number={PAGE.exhibitStart + index} kicker={item.track.toUpperCase()} title={`${item.vendor} · ${item.title}`} className="detail-page exhibit-detail-page">
      <div className="detail-layout exhibit-detail-layout">
        <figure className="detail-visual">
          <img src={artwork.src} alt={artwork.alt} />
          <figcaption>{artwork.caption}{exhibitArtwork[item.vendor] ? "" : " · 同赛道背景图"}</figcaption>
          <span className="visual-number">{String(index + 1).padStart(2, "0")}</span>
        </figure>
        <article className="detail-copy">
          <div className="detail-kickers">
            <span>{item.track}</span>
            <b>重点展品 {String(index + 1).padStart(2, "0")} / {exhibits.length}</b>
          </div>
          <div className="detail-badges">
            <i className={`priority priority-${item.priority.toLowerCase()}`}>{item.priority}</i>
            <i>证据 {item.evidence}</i>
            {item.priority === "S" && <i className="must-badge">十大不可错过</i>}
          </div>
          <h2>{item.vendor}</h2>
          <h3>{item.title}</h3>
          <div className="detail-paragraphs exhibit-paragraphs">
            <p>{item.summary}</p>
            <p>{item.why}</p>
            <p><b>证据状态：</b>{item.status}。{verificationPrompt(item.track)}</p>
          </div>
          <div className="detail-actions">
            <button type="button" className="index-return" onClick={() => goToPage(PAGE.exhibitIndex)}>← 返回重点展品索引</button>
            <div><ShareButton /><a href={item.source} target="_blank" rel="noreferrer">原始来源 ↗</a></div>
          </div>
        </article>
      </div>
    </Page>
  );
}

function SourcesPage() {
  return (
    <Page number={sourcePage} kicker="ARCHIVE & SOURCES" title="资料与来源" className="sources-page">
      <div className="sources-layout">
        <div className="archive-panel">
          <span>FULL RESEARCH PACKAGE</span>
          <h2>所有原始资料<br />现已进入仓库</h2>
          <div className="archive-stats"><div><b>30</b><span>网页原文</span></div><div><b>11</b><span>名录图片</span></div><div><b>49</b><span>资料文件</span></div></div>
          <p>包含原始网页、展商名录图片、首轮摘要、来源目录、整理大纲和完整 ZIP；图片页均保留来源说明。</p>
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
            <div className="cover-copy"><span className="cover-eyebrow">A CURATED FIELD GUIDE TO INTELLIGENCE</span><h1>WAIC<br />2026</h1><h2>展后精选</h2><p>新品 · 亮点 · 不可错过</p></div>
            <div className="cover-data"><div><strong>1100+</strong><span>参展单位</span></div><div><strong>3000+</strong><span>展品</span></div><div><strong>300+</strong><span>全球首发</span></div><p>35 页等尺寸电子杂志，包含 3 个索引、29 个独立详情页与完整资料库。</p></div>
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
            <div className="editorial-lead"><span>EDITOR&apos;S NOTE</span><h2>从索引进入<br />每一个现场<br />重点</h2><p>四条信号、十大不可错过与 25 项重点展品，全部拥有可独立分享的详情页。</p><div className="principles"><b>首发 ≠ 成熟</b><b>Demo ≠ 泛化</b><b>参数 ≠ 可比</b></div></div>
            <div className="contents-list">
              {contents.map(([page, label]) => <button type="button" key={label} onClick={() => goToPage(page)}><span>{String(page + 1).padStart(2, "0")}</span><b>{label}</b><em>GO ↗</em></button>)}
            </div>
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
        <div className="reader-links"><a href="https://github.com/DeronQi/waic-2026-aftershow-guide" target="_blank" rel="noreferrer">GitHub ↗</a><a href="downloads/WAIC2026_参展资料_首轮_20260721.zip" download>资料包 ↓</a></div>
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
          <p className="reader-hint">从索引点击进入详情 · 键盘 ← → 或在页面上左右滑动翻页</p>
        </div>
      </div>
    </main>
  );
}
