import { exhibits, type Artwork, type DetailSection, type Exhibit } from "./content";

export type EvidenceGrade = "A" | "B" | "C";

export type ExhibitMeta = {
  status: string;
  maturity: string;
  evidence: EvidenceGrade;
  editorialTag?: "官方镇馆之宝" | "编辑推荐";
};

export type ChangeStory = {
  slug: string;
  eyebrow: string;
  title: string;
  deck: string;
  artwork: Artwork;
  facts: string[];
  sections: DetailSection[];
};

export type ChapterSection = {
  heading: string;
  body: string;
  points: string[];
};

export type Chapter = {
  slug: string;
  number: string;
  eyebrow: string;
  title: string;
  deck: string;
  artwork: Artwork;
  sections: ChapterSection[];
};

export type ComparisonMatrix = {
  title: string;
  columns: string[];
  rows: string[][];
  note: string;
};

export const tencentExhibit: Exhibit = {
  vendor: "腾讯",
  title: "混元 Hy3 × WorkBuddy",
  track: "模型与智能体",
  isTopTen: false,
  summary: "以 Hy3 的 Agent 与 Coding 能力为底座，通过 WorkBuddy 把网页、文件、代码与办公工具连接成可交付成果的工作智能体。",
  facts: ["295B 总参数 / 21B 激活", "最长 256K 上下文", "WAIC 现场交付网页与参观攻略"],
  details: [
    {
      heading: "本届展示",
      body: "混元 Hy3 在 WAIC 2026 完成展会首秀，WorkBuddy 展台让观众直接提交“整理 WAIC 参观攻略”“搭建上海 AI 热力数据网站”等任务。展示重点不是聊天，而是让智能体读取资料、组织步骤、调用工具并交付文件或可运行页面。",
    },
    {
      heading: "模型与产品",
      body: "Hy3 采用快慢思考融合的 MoE 架构，总参数 2950 亿、激活参数 210 亿，支持 256K 上下文。腾讯把模型接入 WorkBuddy、CodeBuddy、元宝、ima 与 TokenHub，通过真实办公、编程和知识任务的反馈共同迭代模型与产品。",
    },
    {
      heading: "生态位置",
      body: "WorkBuddy 之外，腾讯还提供 QClaw、企业版 WorkBuddy、ClawPro、智能体开发平台 ADP 与企点营销云。个人工具、企业工作台、开发平台和模型服务由此组成一条从开箱即用到企业治理的效率智能体产品链。",
    },
    {
      heading: "产业落点",
      body: "WorkBuddy 的长期价值取决于长任务成功率、失败恢复、企业权限与审计、敏感数据隔离和模型切换成本。它能否减少真实工作流中的返工，将决定工作智能体从现场亮点走向日常生产工具的速度。",
    },
  ],
  artwork: {
    src: "images/editorial/products/tencent-hy3.png",
    alt: "腾讯混元 Hy3 官方发布视觉",
    caption: "混元 Hy3 × WorkBuddy · 腾讯官方",
  },
  source: "https://www.tencent.com/zh-cn/tencent-hunyuan-officially-releases-hy3-advancing-agent-capabilities-and-deeper-product-integration/",
};

export const magazineExhibits = [...exhibits, tencentExhibit];

const statuses: Omit<ExhibitMeta, "editorialTag">[] = [
  { status: "首次公开展出", maturity: "商用系统路线", evidence: "A" },
  { status: "发布 / 展示", maturity: "集群建设与交付阶段", evidence: "B" },
  { status: "首次公开展出", maturity: "云基础设施方案", evidence: "B" },
  { status: "首秀 / 获奖", maturity: "联合方案验证", evidence: "A" },
  { status: "首次公开展出", maturity: "芯片验证阶段", evidence: "C" },
  { status: "现场演示", maturity: "开放体验", evidence: "B" },
  { status: "展会首秀", maturity: "内测 / 待量产", evidence: "B" },
  { status: "已发布", maturity: "API / 平台可用", evidence: "A" },
  { status: "已发布", maturity: "产品能力开放", evidence: "A" },
  { status: "已发布", maturity: "模型服务可用", evidence: "A" },
  { status: "首次公开展示", maturity: "研究与产品验证", evidence: "A" },
  { status: "五款新品首发", maturity: "量产与场景部署并行", evidence: "B" },
  { status: "现场演示", maturity: "场景试点", evidence: "B" },
  { status: "首次公开展示", maturity: "模型与硬件适配验证", evidence: "B" },
  { status: "方案首展", maturity: "家庭 / 康养试点", evidence: "B" },
  { status: "三款新品首发", maturity: "场景验证", evidence: "B" },
  { status: "现场首秀", maturity: "待上市", evidence: "B" },
  { status: "首次公开展示", maturity: "预约 / 概念验证", evidence: "A" },
  { status: "现场展示", maturity: "上市窗口待披露", evidence: "B" },
  { status: "展会首秀", maturity: "邀请体验 / 待上市", evidence: "B" },
  { status: "中国首发", maturity: "工业软件集成阶段", evidence: "B" },
  { status: "现场演示", maturity: "研发平台与实验闭环", evidence: "A" },
  { status: "获奖项目展示", maturity: "行业试点", evidence: "B" },
  { status: "新品展示", maturity: "垂直场景商业化", evidence: "A" },
  { status: "现场发布", maturity: "安全产品组合", evidence: "B" },
  { status: "展会首秀", maturity: "模型与产品规模应用", evidence: "A" },
];

const editorPicks = new Set([7, 8, 9, 13, 14, 17, 19, 20, 21, 25]);

export const exhibitMeta: ExhibitMeta[] = statuses.map((item, index) => ({
  ...item,
  editorialTag: index < 10 ? "官方镇馆之宝" : editorPicks.has(index) ? "编辑推荐" : undefined,
}));

export const changes: ChangeStory[] = [
  {
    slug: "compute-systems",
    eyebrow: "COMPUTE",
    title: "算力从单卡竞争进入系统工程",
    deck: "超节点、超集群、互联、内存、液冷和软件栈共同决定有效算力，峰值参数不再足以解释生产能力。",
    artwork: { src: "images/editorial/event-waic-2.jpg", alt: "WAIC 2026 超节点与算力基础设施展区", caption: "算力基础设施现场 · 第一财经" },
    facts: ["超节点成为基本单元", "互联与内存决定效率", "软件生态影响迁移成本"],
    sections: [
      { heading: "结构变化", body: "华为 Atlas 950 SuperPoD、曙光 8000、真武 M890 × 磐久 AL128 和中兴 OEX/Matrix 把展台叙事从单芯片拉到整套系统。卡间通信、统一内存、故障隔离和调度利用率开始与单卡算力同等重要。" },
      { heading: "路线分化", body: "有的方案追求千卡级统一寻址，有的强调十万卡超集群，有的以单柜高密度减少通信距离，也有厂商用近存计算、3D 封装或光互联缓解带宽与功耗压力。它们不能只用一个峰值数字横向排序。" },
      { heading: "产业含义", body: "模型训练和推理越来越像数据中心系统工程。客户真正购买的是持续可用的吞吐、兼容的软件栈和可运维能力，而不是一张参数表。国产芯片的竞争也因此转向多芯协同和生态兼容。" },
      { heading: "产业观察", body: "决定系统竞争力的，是已交付规模、真实模型负载下的表现、全系统功耗、连续运行时间、故障恢复和模型迁移成本。峰值参数之外，长期可用性与软件生态正在成为客户选择的主轴。" },
    ],
  },
  {
    slug: "agents-deliver",
    eyebrow: "AGENTS",
    title: "软件从会回答进入可交付任务",
    deck: "任务拆解、工具调用、过程修正和成果交付成为智能体的基本链路，评价标准从回答质量转向任务完成度。",
    artwork: { src: "images/editorial/products/tencent-hy3.png", alt: "混元 Hy3 与工作智能体产品视觉", caption: "混元 Hy3 × WorkBuddy · 腾讯" },
    facts: ["交付物取代聊天文本", "工具与权限成为产品核心", "长任务恢复决定可靠性"],
    sections: [
      { heading: "产品变化", body: "百度搭子、腾讯 WorkBuddy、Kimi K2.7 Code、Step AOS、Eigen 和 MatwingsVenus 虽然场景不同，却都在把模型放进一个可执行环境：读取文件和网页、调用应用或专业软件、持续修正，最后交付报告、代码、配置或实验方案。" },
      { heading: "系统构成", body: "一个生产级智能体不只是一种模型。运行环境、记忆、工具接口、身份权限、审计记录和人工接管共同决定它能做什么、出错后怎样恢复，以及企业是否敢让它接触真实数据。" },
      { heading: "价值衡量", body: "报告是否能直接使用、代码是否通过测试、跨应用动作是否正确、工程配置是否可追溯，比一轮对话是否流畅更接近真实生产力。智能体厂商开始用任务成功率和交付时间描述价值。" },
      { heading: "产业观察", body: "智能体的分水岭已经转向多次任务的成功率、平均接管次数、失败恢复、权限控制、调用成本和最终返工量。这些指标决定它是一次精彩演示，还是能够稳定交付的生产工具。" },
    ],
  },
  {
    slug: "robots-work",
    eyebrow: "EMBODIED AI",
    title: "机器人从舞台动作进入生产性作业",
    deck: "工厂、仓储、药房和家庭长时序任务取代单次动作表演，连续运行与故障恢复成为商业化分水岭。",
    artwork: { src: "images/editorial/products/zhiyuan-a3-ultra.png", alt: "智元机器人在 WAIC 2026 场景中执行作业", caption: "远征 A3 Ultra 与场景演示 · 智元" },
    facts: ["连续作业替代单次动作", "跨本体模型受到关注", "垂直岗位率先落地"],
    sections: [
      { heading: "展示变化", body: "智元把仓储和半导体场景搬到现场，蚂蚁让不同构型机器人协同完成智慧药房闭环，赛那德聚焦装卸与码垛，傅利叶则将验证空间扩展到家庭与康养。看点从“能不能动”变成“能不能持续完成岗位任务”。" },
      { heading: "技术重点", body: "长时序任务需要识别环境变化、处理抓取失败、重新规划并安全恢复。Visics、Motubrain、LingBot-VLA 等基础模型又试图让能力跨手、跨臂、跨整机迁移，减少每种硬件都从头训练的成本。" },
      { heading: "落地顺序", body: "药房、仓储和物流的任务边界清晰，效率与回报可以量化，更容易率先规模部署；家庭环境变化更大，却是长期交互、安全和隐私的综合压力测试。两条路线会有不同的商业节奏。" },
      { heading: "产业观察", body: "随机任务比例、连续运行时长、人工接管、电池与维护、岗位节拍和回本周期，共同决定机器人能否从展台走向规模作业。工业岗位边界清晰，因而更可能先形成可复制的商业闭环。" },
    ],
  },
  {
    slug: "personal-ai",
    eyebrow: "AI DEVICES",
    title: "终端争夺个人 AI 的持续入口",
    deck: "手机、眼镜、耳机与陪伴硬件开始组合视觉、语音和个人记忆，竞争焦点是何时感知、如何执行以及能否被信任。",
    artwork: { src: "images/editorial/products/iflytek-glasses.jpeg", alt: "科大讯飞 AI 眼镜现场展示", caption: "AI 眼镜现场体验 · 第一财经" },
    facts: ["系统级智能体跨应用", "贴身设备持续感知", "隐私与续航决定体验"],
    sections: [
      { heading: "入口迁移", body: "STEPX Neo、NaviX Ultra 与荣耀 Robot Phone 把智能体推到操作系统和硬件结构层；讯飞与李未可眼镜、千问与 Bose 耳机则尝试用更自然的视觉和语音入口减少频繁掏出手机。" },
      { heading: "体验链路", body: "真正的 AI 原生终端应在合适时间理解环境，调用系统服务，并把结果反馈给用户，而不是给每台设备增加一个聊天按钮。手机、眼镜和耳机之间的协同，也开始形成连续上下文。" },
      { heading: "成熟度分层", body: "展会同时出现现货、预约、内测、邀请体验和概念机。比较功能之前必须先标明状态，否则“现场能演示”很容易被误读为“现在就能购买并长期使用”。" },
      { heading: "产业观察", body: "重量、续航、离线能力、录制指示、误触发纠正、跨应用权限以及数据保存与删除机制，正在重新定义贴身 AI 的产品门槛。设备越贴近身体、在线越久，可信设计越接近核心功能。" },
    ],
  },
  {
    slug: "industry-proof",
    eyebrow: "INDUSTRY",
    title: "AI4S、能源、工业与安全成为试金石",
    deck: "高专业门槛、高责任行业要求模型连接真实工具、数据与审批流程，成为检验智能体商业价值的更严格场景。",
    artwork: { src: "images/editorial/products/matwings-venus.png", alt: "MatwingsVenus 蛋白质研发智能体流程", caption: "蛋白设计与自动化实验闭环 · 天鹜科技" },
    facts: ["专业工具进入执行链", "结果必须可追溯复核", "实验与业务数据形成闭环"],
    sections: [
      { heading: "专业智能体", body: "Eigen 进入 PLC 编程与系统配置，云睿覆盖配电网诊断、方案、仿真和投资评估，MatwingsVenus 连接蛋白设计与自动化湿实验。它们的共同点是把专业软件和验证环节纳入任务链。" },
      { heading: "商业证据", body: "行业价值不只来自更快生成内容，而是缩短工程或研发周期、减少返工、提高产线稳定性并积累企业数据。因而需要客户、部署时长、效率基线和人工审批等可复核证据。" },
      { heading: "安全边界", body: "模型、智能体、终端和机器人扩大了攻击面。360 的漏洞发现、自动研判和防护组合提醒行业：身份、权限、资产、流量和处置策略必须跟智能体能力同步建设。" },
      { heading: "产业观察", body: "高责任场景的核心不只是平均准确率，还包括最坏情况、权限隔离、操作日志、回滚与责任链。AI 越接近现实决策和物理执行，人工复核、安全停机和事故追溯就越成为产品的一部分。" },
    ],
  },
];

export const chapters: Chapter[] = [
  {
    slug: "panorama",
    number: "02",
    eyebrow: "PANORAMA",
    title: "大会全景：三地四馆，热点迁移",
    deck: "2026 年 7 月 17—20 日，世博、张江和徐汇西岸共同构成一张从底层算力到消费终端的产业地图。",
    artwork: { src: "images/editorial/event-waic.jpg", alt: "WAIC 2026 展馆与观众现场", caption: "WAIC 2026 大会现场 · 官方及媒体资料" },
    sections: [
      { heading: "规模", body: "政府发布口径为展览面积超过 10 万平方米、1100 余家企业、3000 余项技术产品和 300 余款全球首发；闭幕公开数据还包括超过 40 万人次观众，以及上海集中签约 32 个人工智能重点项目、投资额超过 409 亿元。", points: ["7 月 17—20 日", "三地四馆", "1100+ 参展企业", "300+ 全球首发"] },
      { heading: "世博", body: "H1 集中大模型、智能体和行业应用；H2 关注芯片、服务器、超节点、液冷与能源；H3 把具身模型、整机、灵巧手、零部件和真实产线放在同一空间；H4 面向初创、OPC、开发者与投融资。", points: ["H1 模型与智能体", "H2 算力基础设施", "H3 具身智能", "H4 创新生态"] },
      { heading: "张江与西岸", body: "张江更接近芯片、算力和科研基础设施，徐汇西岸则聚集消费级终端、内容生成、AI 眼镜、健康与互动体验。三地分工让参观路线本身就反映产业链分层。", points: ["张江：芯片与科研", "西岸：终端与体验"] },
      { heading: "2025→2026", body: "热点从“百模大战”迁移到 Agent/Agentic OS，从人形机器人表演迁移到生产性作业，从单点芯片迁移到超节点与超集群，也从云端 AI 延伸到端侧和贴身设备。", points: ["模型 → Agent", "动作 → 岗位", "单卡 → 系统", "云端 → 端侧"] },
    ],
  },
  {
    slug: "compute",
    number: "03",
    eyebrow: "COMPUTE & INFRA",
    title: "算力、芯片与 AI 基础设施",
    deck: "超节点成为新竞争单元，国产芯片通过架构、封装、多芯协同和开放解耦寻找系统级突破。",
    artwork: { src: "images/editorial/compute-huawei.png", alt: "Atlas 950 SuperPoD 超节点", caption: "Atlas 950 SuperPoD · 华为" },
    sections: [
      { heading: "超节点", body: "Atlas 950 SuperPoD、曙光 8000、磐久 AL128 与 OEX/Matrix 分别代表千卡统一寻址、十万卡集群、单柜高密度和开放解耦。比较必须同时看卡规模、内存、互联、时延、液冷、软件栈与部署案例。", points: ["华为", "中科曙光", "阿里 / 平头哥", "中兴"] },
      { heading: "国产芯片", body: "DF1000 以软件定义近存计算和 3D 混合键合切入；沐曦、天数智芯、摩尔线程、海光、壁仞、燧原与曦智则从 GPU、互联和多芯协同构建完整矩阵。", points: ["东方算芯", "沐曦", "天数智芯", "摩尔线程", "海光 / 壁仞 / 燧原"] },
      { heading: "绿色算力", body: "冷板式与浸没式液冷、光互联与电互联、算电协同共同决定数据中心扩张上限。国家电网、南方电网和储能企业的角色由供电侧延伸到算力调度与绿色智算。", points: ["液冷", "光互联", "算电协同", "储能"] },
      { heading: "系统竞争", body: "负载、精度和系统边界一致时，吞吐与能效才具有可比性。真实模型训练 / 推理表现、客户规模、长期稳定运行和软件迁移成本，正在把算力竞赛从单模块指标推进到整机与生态能力。", points: ["真实负载", "客户应用", "稳定运行", "生态成熟度"] },
    ],
  },
  {
    slug: "models-agents",
    number: "04",
    eyebrow: "MODELS & AGENTS",
    title: "基础模型、世界模型与智能体",
    deck: "多模态统一模型继续扩边界，通用和专业智能体则开始以可执行工作流证明模型价值。",
    artwork: { src: "images/editorial/products/kimi-k27.png", alt: "Kimi K2.7 Code 模型视觉", caption: "Kimi K2.7 Code · 月之暗面" },
    sections: [
      { heading: "模型前沿", body: "MiniMax M3、SenseNova U1 Pro、Kimi K2.7 Code，以及昆仑万维和智谱的世界模型、视频、音乐、编程与开放平台，代表模型继续向长上下文、原生多模态和 Agentic 任务扩展。", points: ["MiniMax", "商汤", "月之暗面", "昆仑万维", "智谱"] },
      { heading: "通用智能体", body: "百度搭子、腾讯 WorkBuddy、Step AOS/Amoo、零一万物万策和无问芯穹 InfiniClawBox 从不同入口切入，但共同目标是让任务跨网页、文件、应用和企业工具闭环完成。", points: ["百度", "腾讯", "阶跃星辰", "零一万物", "无问芯穹"] },
      { heading: "专业智能体", body: "Eigen、云睿、MatwingsVenus 和 360 安全智能体说明专业知识本身不够，系统还必须调用工程、仿真、实验或安全工具，并把每次动作留在可审计流程中。", points: ["西门子", "南方电网", "天鹜科技", "360"] },
      { heading: "能力分水岭", body: "任务拆解、工具范围、长任务记忆与恢复、云端 / 本地执行、数据隔离、权限审计和结果确认共同构成智能体的完整能力。模型是起点，稳定运行环境和企业治理能力才决定最终交付。", points: ["自主拆解", "工具调用", "失败恢复", "权限审计", "结果确认"] },
    ],
  },
  {
    slug: "embodied",
    number: "05",
    eyebrow: "EMBODIED AI",
    title: "具身智能：从会动到能上岗",
    deck: "整机、世界模型、灵巧手与真实岗位共同进入展台，商业化讨论开始围绕稳定性、维护和回报。",
    artwork: { src: "images/editorial/robot-magiclab.jpg", alt: "WAIC 2026 人形机器人作业展示", caption: "具身智能作业现场 · 中国江苏网" },
    sections: [
      { heading: "全尺寸人形", body: "智元、宇树、银河通用、乐聚、北京人形机器人创新中心和魔法原子展示不同整机路线。竞争点从动作丰富度转向量产能力、维护体系、成本和岗位适配。", points: ["智元", "宇树", "银河通用", "乐聚", "北京人形", "魔法原子"] },
      { heading: "工业物流", body: "半导体、仓储、线束、拆码垛、商超抓取和智能水吧成为高频演示。它石智航、极智嘉、赛那德、RoboScience 与睿尔曼代表不同本体和垂直场景。", points: ["长时序", "动态环境", "故障恢复", "岗位节拍"] },
      { heading: "家庭康养", body: "傅利叶具身之家、千寻智能、心言机器人和启元机器人把任务放进客厅、递水、收纳、陪伴与健康交互。家庭场景价值高，但隐私、安全、误操作和成本约束也最强。", points: ["收纳", "递水", "陪伴", "健康交互"] },
      { heading: "模型与灵巧手", body: "GO-2 / GE-2 / Genie Evolver、Visics / RoboMirage / FingerEye、Motubrain、LingBot-VLA 和 DM0.5 等路线探索跨本体能力、视觉语言动作统一与多形态协作。", points: ["世界模型", "VLA", "触觉", "跨本体", "多机协作"] },
    ],
  },
  {
    slug: "devices",
    number: "06",
    eyebrow: "AI-NATIVE DEVICES",
    title: "AI 原生终端与可穿戴设备",
    deck: "手机、眼镜、耳机和陪伴硬件争夺贴身入口；成熟度、隐私与全天候体验比功能清单更重要。",
    artwork: { src: "images/editorial/products/liweke-x-ai.jpg", alt: "X-AI 记忆眼镜展台", caption: "X-AI 记忆眼镜 · 第一财经" },
    sections: [
      { heading: "智能体手机", body: "STEPX Neo 用 Step AOS 与 Amoo 建立系统原生智能体，NaviX Ultra 让豆包助手跨 App 执行，荣耀 Robot Phone 则用可动物理结构连接感知与 Agentic OS。", points: ["阶跃 STEPX", "努比亚 / 豆包", "荣耀"] },
      { heading: "AI 眼镜", body: "讯飞、千问、李未可、Rokid、心眸、亮亮视野和微光围绕翻译、提词、视觉问答、会议摘要、支付核身与长期记忆竞争。必须同步比较重量、续航、显示、录制提示、价格和现货状态。", points: ["翻译", "视觉问答", "会议摘要", "长期记忆"] },
      { heading: "耳机与陪伴", body: "千问 / Bose 耳机、iMoochi AI 宠物、心言 Bubbo 1 和启元 T1 让 AI 从屏幕迁移到耳边和家庭。主动服务的节奏、人格一致性和长期数据边界成为新问题。", points: ["耳边智能体", "AI 宠物", "家庭陪伴"] },
      { heading: "产品节奏", body: "本届终端横跨已上市现货、已预约或明确上市窗口、内测与邀请体验、展会首秀与概念机四个阶段。现货产品竞争日常体验，概念机则更多展示下一代交互方向。", points: ["现货", "预约", "内测", "概念机"] },
    ],
  },
  {
    slug: "industry",
    number: "07",
    eyebrow: "INDUSTRY APPLICATIONS",
    title: "AI 深入行业：单独成章的应用",
    deck: "科学、工程、能源、医疗教育与安全不只是案例区，而是检验 AI 是否真正进入生产关系的核心章节。",
    artwork: { src: "images/editorial/industry-siemens.jpg", alt: "西门子 Eigen Engineering Agent 资料图", caption: "Eigen Engineering Agent · 西门子" },
    sections: [
      { heading: "AI for Science", body: "MatwingsVenus 把自然语言蛋白设计与自动化湿实验连接，中科曙光用 AI4S 集群支持从 FP64 到低精度工作负载，世界模型与科学仿真继续缩短数字实验周期。", points: ["蛋白设计", "自动化实验", "AI4S 集群", "科学仿真"] },
      { heading: "工业工程", body: "Eigen、半导体产线、线束装配与电池拆解把模型放进工程工具和物理流程。最终应记录工程周期、一次通过率、返工、停线风险与客户验证。", points: ["PLC 编程", "半导体", "线束", "电池拆解"] },
      { heading: "能源基建", body: "云睿覆盖配电网规划闭环，国家电网与算电协同方案则连接绿色智算中心、能源调度和储能。行业价值来自可靠性与长期效率，而不是单次生成速度。", points: ["配电规划", "算电协同", "绿色智算"] },
      { heading: "医疗教育安全", body: "蚂蚁智慧药房、讯飞教育与翻译、米塔视界 AI 科学家 / 裸眼 3D 教学，以及 360 安全产品，分别展示公共服务、专业交互和安全边界。", points: ["智慧药房", "教育翻译", "公共服务", "AI 安全"] },
    ],
  },
  {
    slug: "ecosystem-governance",
    number: "08",
    eyebrow: "ACADEMIC & GOVERNANCE",
    title: "学术、创新生态与全球治理",
    deck: "WAIC Academic、SAIL、H4 初创生态和全球合作议题共同回答：技术之外，创新如何被验证、扩散与约束。",
    artwork: { src: "images/editorial/products/360-security.png", alt: "WAIC 2026 AI 安全与治理主题视觉", caption: "AI 安全与治理主题现场 · 上海普陀" },
    sections: [
      { heading: "WAIC Academic", body: "首届自主国际学术会议由姚期智担任大会主席，强调投稿、同行评审、代码验证和论文出版机制。它把大会从展览与论坛扩展到可复核的学术生产。", points: ["自主国际会议", "同行评审", "代码验证", "论文出版"] },
      { heading: "SAIL 与镇馆之宝", body: "SAIL 更重视创新与影响，“镇馆之宝”强调现场代表性。获奖是重要筛选线索，却不等于价格、交付、客户和长期运行已经成熟。", points: ["奖项定位", "评价维度", "商业成熟度分离"] },
      { heading: "初创与 OPC", body: "H4 Future Tech 与 OPC 生态聚集形界智维、量坤科技、共绩科技、心洲科技、萝博派对等团队。应持续跟踪融资、开源、首发、用户增长与产业合作，而不是只记录展台概念。", points: ["Future Tech", "OPC", "融资", "开源", "产业合作"] },
      { heading: "全球治理", body: "国际人工智能合作组织与合作倡议关注开源、可及性、安全治理和全球南方。最终要比较的不是声明措辞，而是厂商是否把数据、模型、智能体和机器人安全落实为具体产品机制。", points: ["开放合作", "可及性", "安全治理", "全球南方"] },
    ],
  },
];

export const comparisonPages: { title: string; deck: string; matrices: ComparisonMatrix[] }[] = [
  {
    title: "跨厂商对比 / 系统与智能体",
    deck: "从算力系统到通用与专业智能体，把主要路线、交付条件与风险放到同一视野中。",
    matrices: [
      {
        title: "超节点与超集群",
        columns: ["路线", "代表项目", "关键问题"],
        rows: [
          ["统一寻址超节点", "Atlas 950 SuperPoD", "千卡扩展效率与软件迁移"],
          ["十万卡超集群", "曙光 8000", "调度、故障恢复与长期利用率"],
          ["单柜高密度", "磐久 AL128", "互联、散热与云上可用范围"],
          ["开放解耦多芯", "OEX / Matrix", "伙伴兼容与统一软件栈"],
        ],
        note: "同一负载、精度和系统边界下才可比较吞吐、时延与能效。",
      },
      {
        title: "通用 / 专业智能体",
        columns: ["类型", "代表项目", "交付与风险"],
        rows: [
          ["办公 / 研究", "百度搭子、WorkBuddy", "报告、网页、文件；关注权限与返工"],
          ["软件工程", "Kimi K2.7 Code、GLM", "代码仓库；关注测试与长任务恢复"],
          ["工程 / 电网", "Eigen、云睿", "配置与规划；关注审批、仿真与审计"],
          ["AI4S", "MatwingsVenus", "候选与实验；关注湿实验成功率"],
        ],
        note: "工具调用范围越大，身份、权限、日志和回滚要求越高。",
      },
      {
        title: "全球首发证据与成熟度",
        columns: ["状态", "能说明什么", "不能说明什么"],
        rows: [
          ["首发 / 首秀", "发布时间或首次演示", "不能证明可购买或规模交付"],
          ["已上市", "已有入口与用户", "不能证明企业级稳定性"],
          ["量产", "进入批量生产", "仍需订单、良率与交付证据"],
          ["试点", "进入真实场景", "不能直接外推跨场景泛化"],
        ],
        note: "成熟度必须与产品能力分开记录。",
      },
    ],
  },
  {
    title: "跨厂商对比 / 机器人与终端",
    deck: "把可演示性与可持续使用分开；先确认场景和成熟度，再讨论功能强弱。",
    matrices: [
      {
        title: "机器人场景成熟度",
        columns: ["场景", "代表项目", "最关键证据"],
        rows: [
          ["仓储 / 物流", "智元、赛那德、极智嘉", "节拍、无人时长、回本周期"],
          ["药房 / 公共服务", "蚂蚁 LingBot-VLA", "协同成功率、人工接管"],
          ["工业装配", "它石、RoboScience", "随机物体、精度、故障恢复"],
          ["家庭 / 康养", "傅利叶、千寻、心言", "安全、隐私、维护与成本"],
        ],
        note: "一次成功演示不等于可复制的岗位能力。",
      },
      {
        title: "具身模型与世界模型",
        columns: ["方向", "代表", "验证重点"],
        rows: [
          ["VLA / 世界动作", "LingBot-VLA、Motubrain", "跨任务、跨本体与真实闭环"],
          ["一脑多手", "Visics / RoboMirage", "适配速度与随机抓取成功率"],
          ["触觉 / 手眼一体", "FingerEye、灵心巧手", "接触稳定性与精细操作"],
          ["多机协作", "药房、DM0.5", "调度、避碰与异常恢复"],
        ],
        note: "必须区分仿真指标、实验室指标与展会现场指标。",
      },
      {
        title: "手机 / 眼镜 / 耳机",
        columns: ["入口", "优势", "主要约束"],
        rows: [
          ["智能体手机", "跨应用执行与系统权限", "生态适配、误操作、功耗"],
          ["AI 眼镜", "第一视角与即时显示", "重量、续航、录制隐私"],
          ["AI 耳机", "低摩擦语音入口", "无屏反馈、录音提示"],
          ["陪伴硬件", "长期互动与家庭场景", "人格一致性、数据与价格"],
        ],
        note: "同一成熟度层级内再比较体验，避免把概念机与现货混排。",
      },
    ],
  },
];

export const audienceRecommendations = [
  {
    audience: "产业决策者",
    lead: "研究系统路线、可部署性和行业回报。",
    items: ["Atlas 950 SuperPoD", "曙光 8000", "OEX / Matrix", "百度搭子", "腾讯 WorkBuddy", "Eigen", "云睿", "MatwingsVenus", "智元场景作业", "赛那德物流装卸", "蚂蚁智慧药房", "讯飞 AI 眼镜", "WAIC Academic", "AI 安全体系", "H4 / OPC 生态"],
  },
  {
    audience: "技术从业者",
    lead: "深入模型、架构、评测、工具链和论文。",
    items: ["MiniMax M3", "SenseNova U1 Pro", "Kimi K2.7 Code", "混元 Hy3", "Step AOS", "DF1000", "磐久 AL128", "Motubrain", "Visics / RoboMirage", "LingBot-VLA", "FingerEye", "AI4S 集群", "智能体权限审计", "跨本体评测", "WAIC Academic 论文与代码"],
  },
  {
    audience: "普通消费者",
    lead: "优先体验可理解、可购买或有明确上市窗口的产品。",
    items: ["讯飞 AI 眼镜", "X-AI 记忆眼镜", "千问 / Bose 耳机", "STEPX Neo", "NaviX Ultra", "荣耀 Robot Phone", "iMoochi AI 宠物", "Bubbo 1", "启元 T1", "徐汇西岸互动体验"],
  },
];

export const exhibitorIndex = [
  ["华为", "算力与芯片", "Atlas 950 SuperPoD", "正文 + 详情"],
  ["中科曙光", "算力与 AI4S", "曙光 8000", "正文 + 详情"],
  ["阿里巴巴 / 平头哥", "算力与终端", "真武 M890、磐久 AL128、千问终端", "正文 + 详情"],
  ["中兴通讯", "算力与基础设施", "OEX / Matrix 超节点", "正文 + 详情"],
  ["东方算芯", "AI 芯片", "DF1000", "正文 + 详情"],
  ["沐曦", "AI 芯片", "曦景 S、曦索 X", "正文索引"],
  ["天数智芯", "AI 芯片", "天垓、智铠、彤央", "正文索引"],
  ["摩尔线程", "AI 芯片", "大模型训练与 GPU 产品", "正文索引"],
  ["海光 / 壁仞 / 燧原 / 曦智", "AI 芯片与互联", "多芯协同与开放解耦", "正文索引"],
  ["MiniMax", "基础模型", "M3", "正文 + 详情"],
  ["商汤", "基础模型", "SenseNova U1 Pro", "正文 + 详情"],
  ["月之暗面", "基础模型", "Kimi K2.7 Code", "正文 + 详情"],
  ["昆仑万维", "基础 / 世界模型", "视频、音乐、具身模型", "正文索引"],
  ["智谱", "基础模型与 Agent", "GLM 系列、开放平台", "正文索引"],
  ["百度", "通用智能体", "百度搭子", "正文 + 详情"],
  ["腾讯", "模型与智能体", "混元 Hy3、WorkBuddy", "正文 + 详情"],
  ["阶跃星辰 / STEPX", "智能体终端", "Step AOS、Amoo、STEPX Neo", "正文 + 详情"],
  ["零一万物", "企业智能体", "万策决策中枢", "正文索引"],
  ["无问芯穹", "AI Infra / Agent", "InfiniClawBox", "正文索引"],
  ["西门子", "工业智能体", "Eigen", "正文 + 详情"],
  ["南方电网", "能源智能体", "大瓦特·云睿", "正文 + 详情"],
  ["天鹜科技", "AI for Science", "MatwingsVenus", "正文 + 详情"],
  ["360", "AI 安全", "图龙锋、仪天阵、磐石之盾", "正文 + 详情"],
  ["智元机器人", "具身智能", "远征 A3 Ultra 等五款新品", "正文 + 详情"],
  ["宇树科技", "具身智能", "GD01 / 工业演示", "正文索引"],
  ["银河通用", "具身智能", "商超与工业作业", "正文索引"],
  ["乐聚", "具身智能", "全尺寸人形机器人", "正文索引"],
  ["北京人形机器人创新中心", "具身智能", "整机与基础模型", "正文索引"],
  ["魔法原子", "具身智能", "三款战略新品", "正文 + 详情"],
  ["它石智航", "工业机器人", "线束 / 装配任务", "正文索引"],
  ["极智嘉", "仓储机器人", "仓储与物流作业", "正文索引"],
  ["赛那德", "物流机器人", "iLoabot-X 2.0", "正文 + 详情"],
  ["RoboScience", "具身模型", "Visics、RoboMirage、FingerEye", "正文 + 详情"],
  ["睿尔曼", "机器人本体", "轮式双臂与水吧", "正文索引"],
  ["傅利叶", "家庭与康养", "具身之家、GR 系列", "正文 + 详情"],
  ["千寻智能", "家庭机器人", "客厅长时序任务", "正文索引"],
  ["心言机器人", "陪伴硬件", "Bubbo 1", "正文索引"],
  ["启元机器人", "陪伴硬件", "T1", "正文索引"],
  ["生数科技", "世界动作模型", "Motubrain", "正文 + 详情"],
  ["蚂蚁集团", "具身模型 / 药房", "LingBot-VLA 智慧药房", "正文 + 详情"],
  ["原力灵机 / 灵心巧手", "具身模型 / 灵巧手", "DM0.5、多形态协作", "正文索引"],
  ["努比亚 / 字节豆包", "智能体手机", "NaviX Ultra", "正文索引"],
  ["荣耀", "AI 原生终端", "Robot Phone", "正文 + 详情"],
  ["科大讯飞", "AI 眼镜", "讯飞 AI 眼镜", "正文 + 详情"],
  ["千问 / Bose", "AI 耳机", "AI 智能体耳机", "正文 + 详情"],
  ["李未可", "AI 眼镜", "X-AI、WakeeMemory OS", "正文 + 详情"],
  ["Rokid / 心眸 / 亮亮视野 / 微光", "AI 眼镜", "显示、翻译与视觉交互", "正文索引"],
  ["iMoochi", "AI 宠物", "陪伴硬件", "正文索引"],
  ["米塔视界", "教育", "AI 科学家 / 裸眼 3D", "正文索引"],
  ["形界智维 / 量坤 / 共绩 / 心洲 / 萝博派对", "H4 / OPC", "初创与 Future Tech 项目", "生态索引"],
] as const;

export const glossary = [
  ["超节点", "通过高带宽互联与统一软件栈，把多张加速卡组织成近似一台大机器的系统。"],
  ["Scale-up / Scale-out", "前者扩大单节点内部规模，后者通过网络连接更多节点。"],
  ["近存计算", "让计算更靠近数据存储位置，减少数据搬运带来的带宽和能耗。"],
  ["世界模型", "学习环境状态与变化规律，用于预测、生成、规划或控制。"],
  ["世界动作模型", "把环境理解进一步连接到可执行动作与物理反馈。"],
  ["VLA", "视觉—语言—动作模型，把感知、指令理解和机器人控制放在同一框架。"],
  ["Agentic OS", "把智能体能力放到操作系统层，直接获得应用、文件与设备能力。"],
  ["跨本体", "同一模型或技能能在不同机器人形态、机械臂或灵巧手之间迁移。"],
  ["干湿闭环", "计算设计与真实实验互相反馈，常用于生物医药研发。"],
  ["OPC", "One Person Company，以 AI 工具扩大单人或小团队的产品与经营能力。"],
] as const;

export const globalSources = [
  ["大会筹备与整体布局", "上海市政府新闻办", "https://www.shio.gov.cn/TrueCMS/shxwbgs/wxdtt/content/44bee286-669a-48d3-adb0-6d046dc83fdd.htm"],
  ["三地四馆与六大板块", "上海发布", "https://wsb.sh.gov.cn/ywdt/wshd/20260707/04498533adf845bdb38d0746e6e8ee0f.html"],
  ["3000余项展品将亮相", "新华社", "https://www.news.cn/20260617/9af59ae097ef421bb28cab1b72363d32/c.html"],
  ["WAIC 2026 大会专题", "新华网", "https://www.news.cn/zt/waic2026/index.html"],
  ["“数”看 WAIC 2026", "央视网", "https://kepu.cctv.cn/2026/07/16/ARTIIAQAduoim2DPRv3vvtr0260716.shtml"],
  ["你好，AI 新伙伴", "央视新闻", "https://www.cctv.com/2026/07/17/ARTImwptleBoTKk9g4ppnD5q260717.shtml"],
  ["治理、学术、产业多线并进", "第一财经", "https://m.yicai.com/news/103278674.html"],
  ["十大看点：AI 步入产业层", "第一财经", "https://www.yicai.com/news/103278845.html"],
  ["从一场大会看 AI 产业发展新方向", "新华网", "https://www.news.cn/tech/20260719/e6d801e02f1341309006fd6177da8bcb/c.html"],
  ["看见中国 AI 产业链未来的样子", "第一财经", "https://m.yicai.com/news/103282281.html"],
  ["全球线上流量超 30 亿", "人民网", "https://sh.people.com.cn/n2/2026/0720/c134768-41644534.html"],
  ["闭幕：现场观众累计超 40 万人次", "中国日报网", "https://cn.chinadaily.com.cn/a/202607/21/WS6a5eb534a310d709c2fbea57.html"],
] as const;
