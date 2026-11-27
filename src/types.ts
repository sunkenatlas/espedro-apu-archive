export type RiskLevel = 'B' | 'C' | 'D' | 'E' | 'X';

export type Stance = '敌对' | '中立' | '未知';

export type Intelligence = '无智慧' | '低智慧' | '中智慧' | '高智慧' | '未知';

export type EntityKind = '异常生物' | '异常实体' | '异常情景' | '概念核心';

export type CityZone =
  | '城市街道与交通要道'
  | '建筑内部与暗室'
  | 'Hudson中学与东城区'
  | '全市空域与云层'
  | '示威热点与人群'
  | '军事哨卡与封锁线'
  | '全域认知渗透';

export type AnomalyFxType =
  | 'none'
  | 'schrodinger'
  | 'faraday'
  | 'ocular'
  | 'radiant'
  | 'hyaline'
  | 'abyss'
  | 'mirror'
  | 'deus';

export interface RuleReference {
  ruleId: string;
  label: string;
  summary: string;
}

export interface CreatureEntry {
  /** Two-digit catalog number matching image filename: "01".."35" */
  id: string;
  /** Official APU code e.g. "APU-01" */
  code: string;
  /** Roman taxonomy code from 《异常名录汇总》 e.g. "I-A", "II", "XVIII-C" */
  romanCode: string;
  /** Parent lineage Roman ID e.g. "I", "II", "XVIII" */
  lineageId: string;
  /** Parent lineage display name e.g. "手指系 · The Finger" */
  lineageName: string;
  /** Chinese name */
  name: string;
  /** English name from the lore */
  englishName: string;
  /** Primary poetic epigraph displayed right under the creature title */
  epigraph: string;
  /** Optional parent epigraph when a variant also has its own epigraph */
  parentEpigraph?: string;
  /** Classification & metadata */
  risk: RiskLevel;
  riskLabel: string;
  stance: Stance;
  intelligence: Intelligence;
  kind: EntityKind;
  classificationLine: string;
  /** Grouped city zones for clean filtering */
  zones: CityZone[];
  /** Specific lore locations */
  locations: string[];
  /** One-sentence archive summary for cards & index */
  summary: string;
  /** Core four sections */
  appearance: string;
  behavior: string;
  ruleRefs: RuleReference[];
  countermeasures: string;
  /** Optional archival addendum note from the original text */
  archiveNote?: string;
  /** Related creature IDs (e.g. ["16", "17"]) */
  relatedIds: string[];
  /** Whether opening this dossier triggers the Cognitive Hazard Intercept */
  cognitiveHazard: boolean;
  /** Specific cognitive anchor shown in the hazard intercept */
  hazardAnchor?: string;
  /** Subtle bespoke visual micro-effect on dossier image plate */
  fxType: AnomalyFxType;
  /** Special full-litany lines (used for 35 降神) */
  specialLitany?: string[];
  /** Intrinsic image dimensions for zero-CLS rendering */
  imageWidth: number;
  imageHeight: number;
  thumbWidth: number;
  thumbHeight: number;
  /** Archive stamp text */
  stamp: 'VERIFIED' | 'RESTRICTED' | 'EYES ONLY' | 'UNVERIFIED';
}

export interface RuleClause {
  clause: string;
  text: string;
  annotation?: string;
}

export interface RuleExcerpt {
  id: string;
  documentTitle: string;
  edition: string;
  shortTitle: string;
  clauseTag: string;
  clauses: RuleClause[];
  relatedEntityIds: string[];
}

export interface EcologyEdge {
  from: string;
  to: string;
  label: string;
  kind: 'catalyst' | 'command' | 'spatial' | 'origin';
}

export interface FactionInfo {
  id: string;
  nameZh: string;
  nameEn: string;
  quoteZh: string;
  quoteEn: string;
  role: string;
}

export type ActiveTab = 'gallery' | 'index' | 'ecology';
