import type { CityZone, EcologyEdge, FactionInfo, RiskLevel } from '../types';

export const CITY_ZONES: CityZone[] = [
  '城市街道与交通要道',
  '建筑内部与暗室',
  'Hudson中学与东城区',
  '全市空域与云层',
  '示威热点与人群',
  '军事哨卡与封锁线',
  '全域认知渗透',
];

export const RISK_META: Record<
  RiskLevel,
  { code: RiskLevel; label: string; tag: string; desc: string; colorVar: string }
> = {
  B: {
    code: 'B',
    label: 'B 级 · 压制',
    tag: 'B / 压制',
    desc: '局部威胁或被动认知干扰，常规外勤班组可按规程压制或清除。',
    colorVar: 'var(--risk-b)',
  },
  C: {
    code: 'C',
    label: 'C 级 · 致命',
    tag: 'C / 致命',
    desc: '具备直接致死能力或显著生物扭曲风险，接触需保持警戒并备齐闪光与火力压制。',
    colorVar: 'var(--risk-c)',
  },
  D: {
    code: 'D',
    label: 'D 级 · 封锁',
    tag: 'D / 封锁',
    desc: '涉及区域失控、强认知污染或群体级异常，发现即须上报并实施交通/空域封锁。',
    colorVar: 'var(--risk-d)',
  },
  E: {
    code: 'E',
    label: 'E 级 · 灾害',
    tag: 'E / 灾害',
    desc: '超越单兵常规火力对抗极限的灾害级实体，非经批准严禁主动接敌。',
    colorVar: 'var(--risk-e)',
  },
  X: {
    code: 'X',
    label: 'X 级 · 概念',
    tag: 'X / 概念',
    desc: '不可观测、不可证实、无法以物质手段抹除的概念级异常源核。',
    colorVar: 'var(--risk-x)',
  },
};

export const ECOLOGY_EDGES: EcologyEdge[] = [
  { from: '35', to: '34', label: '认知具象化 / 概念源核', kind: 'origin' },
  { from: '35', to: '08', label: '纯粹认知失真', kind: 'origin' },
  { from: '07', to: '16', label: '遮蔽阳光 · 促发活动', kind: 'catalyst' },
  { from: '07', to: '17', label: '制造极端黑暗', kind: 'catalyst' },
  { from: '07', to: '25', label: '夜间伴生空域异象', kind: 'spatial' },
  { from: '14', to: '15', label: '幼童尸体催化转化', kind: 'catalyst' },
  { from: '24', to: '21', label: '拍摄面容 · 提供伪装样本', kind: 'command' },
  { from: '21', to: '22', label: '下达战术与渗透指令', kind: 'command' },
  { from: '22', to: '31', label: '构筑并驻守军事封锁站', kind: 'spatial' },
  { from: '21', to: '31', label: '在哨卡内协调组织架构', kind: 'command' },
  { from: '23', to: '33', label: '未知语言广播 · 煽动敌对', kind: 'catalyst' },
  { from: '26', to: '22', label: '指挥与战术统筹（推测）', kind: 'command' },
  { from: '26', to: '25', label: '同源高空/低空“翅膀”谱系', kind: 'spatial' },
  { from: '11', to: '12', label: '深度认知失能变种', kind: 'origin' },
  { from: '11', to: '13', label: '观测坍缩变种', kind: 'origin' },
  { from: '09', to: '10', label: '镜面认知扭曲共振', kind: 'spatial' },
  { from: '18', to: '19', label: '复数人体合并升级', kind: 'catalyst' },
  { from: '18', to: '20', label: '固定壁面寄生变种', kind: 'spatial' },
  { from: '32', to: '31', label: '疑似高智慧实体制造干扰', kind: 'command' },
  { from: '34', to: '33', label: '集体认知绑定 · Hudson中学', kind: 'origin' },
];

export const FACTIONS: FactionInfo[] = [
  {
    id: 'muronia',
    nameZh: '穆罗尼亚联邦',
    nameEn: 'United States of Muronia',
    quoteZh: '若是忠诚即荣耀，那么确实不光彩。',
    quoteEn: 'If honor is loyalty, they were dishonorable Indeed.',
    role: '调遣 Bellrona 州国民警卫队、S.T.A.R. 与市政研究部 (APU) 封锁 Espedro 市并执行异常调查与清扫。',
  },
  {
    id: 'wondrous-i',
    nameZh: '1是美妙的',
    nameEn: 'The Wondrous I',
    quoteZh: '大错已铸，无可挽回。',
    quoteEn: "The great mistake has been made, and there's no way to amends.",
    role: '渗透于数字、涂鸦与异常认知链条中的神秘思潮与集体畸变现象，与 Hudson 中学塔楼高度绑定。',
  },
  {
    id: 'wrt-ryan',
    nameZh: 'W.R.T. “Ryan 集团”',
    nameEn: 'W.R.T.–Espedro',
    quoteZh: '我的家乡，多么年轻，美丽而富饶！',
    quoteEn: 'The homeland of mine, how young, beautiful and rich it is!',
    role: 'We Require Truth 激进示威武装派系，占据市区中心医院并破坏通讯设施，在失控的暴动中与异常交织。',
  },
  {
    id: 'wrt-serena',
    nameZh: 'W.R.T. “Serena 集团”',
    nameEn: 'Partisan',
    quoteZh: '我仅存的愿望，就是成为那位善良而理智的战士。',
    quoteEn: 'The last wish of mine, is to become that kind-hearted, and rational fighter.',
    role: '以暗号“Ich hab zulang nur zugeseh n”维系的地下抵抗与寻真网络，试图在封锁与异常之间守住理性底线。',
  },
];

export const COGNITIVE_ANCHORS: { title: string; code: string; lines: string[] }[] = [
  {
    title: '躯体与感官锚定',
    code: 'ANCHOR // 01',
    lines: [
      '人类只有两只并排的眼睛，两只相对的耳朵，一只鼻子，一张小于头且大于眼睛的嘴。',
      '人类只有两只等长的手臂与双腿。我的手指可以交叉，两边数量相等，指甲不会长于手指。',
      '骨骼只在身体内部；人的口腔不会进食人类，也没有超过小臂的东西。',
    ],
  },
  {
    title: '红蓝频闪与光照锚定',
    code: 'ANCHOR // 02',
    lines: [
      '我喜欢红蓝色的灯光。我将会保护红蓝色的灯光。红蓝色的灯光不会在我手中熄灭。',
      '天空是且只是蓝色的，天空中不会有眼睛。我会远离黑暗。',
      '如果遇到危险，请用灯光来照射红蓝色尾页。不得使用录音代替朗读。',
    ],
  },
  {
    title: '地标与信念锚定',
    code: 'ANCHOR // 03',
    lines: [
      'Hudson 中学不存在。Hudson 中学没有塔楼。高大的塔楼只是海市蜃楼。',
      '天使是不存在的，恶魔是不存在的。可以哭，可以尖叫，但绝不要祈祷。',
      '拒绝写下数字。文字是安全的，歌曲是安心的。人类不会一直微笑，也不会一直哭泣。',
    ],
  },
];
