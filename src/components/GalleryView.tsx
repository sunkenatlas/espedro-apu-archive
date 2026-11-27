import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Search, ShieldAlert, X } from 'lucide-react';
import type { CityZone, CreatureEntry, RiskLevel, Stance } from '../types';
import { CREATURES, LINEAGE_GROUPS, getThumbUrl } from '../data/creatures';
import { CITY_ZONES } from '../data/world';
import { apuAudio } from '../utils/audio';

export interface GalleryFilters {
  query: string;
  risk: RiskLevel | 'ALL';
  stance: Stance | 'ALL';
  zone: CityZone | 'ALL';
  lineageId: string;
}

interface GalleryViewProps {
  filters: GalleryFilters;
  onChangeFilters: (next: GalleryFilters) => void;
  onSelectCreature: (creature: CreatureEntry) => void;
}

const RISKS: Array<{ value: RiskLevel | 'ALL'; label: string }> = [
  { value: 'ALL', label: '全部评级' },
  { value: 'B', label: 'B 压制' },
  { value: 'C', label: 'C 致命' },
  { value: 'D', label: 'D 封锁' },
  { value: 'E', label: 'E 灾害' },
  { value: 'X', label: 'X 概念' },
];

const STANCES: Array<{ value: Stance | 'ALL'; label: string }> = [
  { value: 'ALL', label: '全部立场' },
  { value: '敌对', label: '敌对' },
  { value: '中立', label: '中立' },
  { value: '未知', label: '未知' },
];

export const GalleryView: React.FC<GalleryViewProps> = ({
  filters,
  onChangeFilters,
  onSelectCreature,
}) => {
  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return CREATURES.filter((c) => {
      if (filters.risk !== 'ALL' && c.risk !== filters.risk) return false;
      if (filters.stance !== 'ALL' && c.stance !== filters.stance) return false;
      if (filters.zone !== 'ALL' && !c.zones.includes(filters.zone)) return false;
      if (filters.lineageId !== 'ALL' && c.lineageId !== filters.lineageId) return false;
      if (!q) return true;
      const haystack = [
        c.code,
        c.romanCode,
        c.name,
        c.englishName,
        c.lineageName,
        c.epigraph,
        c.summary,
        c.appearance,
        c.behavior,
        ...c.locations,
        ...c.ruleRefs.map((r) => r.label),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [filters]);

  const hasActiveFilter =
    filters.query.trim() !== '' ||
    filters.risk !== 'ALL' ||
    filters.stance !== 'ALL' ||
    filters.zone !== 'ALL' ||
    filters.lineageId !== 'ALL';

  const highRiskCount = useMemo(
    () => CREATURES.filter((c) => c.risk === 'D' || c.risk === 'E' || c.risk === 'X').length,
    [],
  );

  const resetFilters = () => {
    apuAudio.playTick();
    onChangeFilters({
      query: '',
      risk: 'ALL',
      stance: 'ALL',
      zone: 'ALL',
      lineageId: 'ALL',
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Espedro 异常生物影像图鉴"
    >
      {/* Editorial Hero Strip */}
      <header className="atlas-hero">
        <div>
          <div className="atlas-kicker">
            <span>MUNICIPAL RESEARCH DIVISION // APU ARCHIVE 2.0</span>
            <span className="stamp-badge is-verified">35 EXHIBITS ON FILE</span>
          </div>
          <h1 className="atlas-title">Espedro 异常生物图鉴</h1>
          <p className="atlas-subtitle">
            “我们认为异常想要获得存在。于是我们想要消灭异常。于是异常想要存在。”
          </p>
        </div>

        <div className="atlas-stats" aria-label="档案库统计">
          <div className="atlas-stat">
            <span className="atlas-stat-num">{CREATURES.length}</span>
            <span className="atlas-stat-label">在档影像</span>
          </div>
          <div className="atlas-stat">
            <span className="atlas-stat-num">{LINEAGE_GROUPS.length}</span>
            <span className="atlas-stat-label">罗马谱系</span>
          </div>
          <div className="atlas-stat">
            <span className="atlas-stat-num is-alert">{highRiskCount}</span>
            <span className="atlas-stat-label">D–X 高危</span>
          </div>
        </div>
      </header>

      {/* Refined Filter Console */}
      <div className="filter-console" role="search" aria-label="档案检索与筛选">
        <div className="filter-top-row">
          <div className="search-box">
            <Search size={15} aria-hidden="true" />
            <input
              type="search"
              className="search-input"
              placeholder="检索代号、名称、英文名、题记、守则或出没地点…"
              value={filters.query}
              onChange={(e) => onChangeFilters({ ...filters, query: e.target.value })}
              aria-label="检索异常档案"
            />
            {filters.query && (
              <button
                type="button"
                className="search-clear"
                onClick={() => onChangeFilters({ ...filters, query: '' })}
                aria-label="清空搜索词"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <select
            className="filter-select"
            aria-label="按城市区域筛选"
            value={filters.zone}
            onChange={(e) => {
              apuAudio.playTick();
              onChangeFilters({ ...filters, zone: e.target.value as CityZone | 'ALL' });
            }}
          >
            <option value="ALL">全部城区与环境</option>
            {CITY_ZONES.map((z) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            aria-label="按罗马谱系筛选"
            value={filters.lineageId}
            onChange={(e) => {
              apuAudio.playTick();
              onChangeFilters({ ...filters, lineageId: e.target.value });
            }}
          >
            <option value="ALL">全部 I–XXIII 谱系</option>
            {LINEAGE_GROUPS.map((g) => (
              <option key={g.lineageId} value={g.lineageId}>
                {g.lineageId}. {g.lineageName} ({g.entries.length})
              </option>
            ))}
          </select>

          <button
            type="button"
            className="filter-reset-btn"
            disabled={!hasActiveFilter}
            onClick={resetFilters}
          >
            重置筛选
          </button>
        </div>

        <div className="filter-pills-row">
          <div className="pill-group" role="group" aria-label="危害等级筛选">
            <span className="pill-group-label">RISK</span>
            {RISKS.map((r) => (
              <button
                key={r.value}
                type="button"
                className={`chip-btn chip-risk-${r.value} ${
                  filters.risk === r.value ? 'is-active' : ''
                }`}
                onClick={() => {
                  apuAudio.playTick();
                  onChangeFilters({ ...filters, risk: r.value });
                }}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className="pill-group" role="group" aria-label="立场筛选">
            <span className="pill-group-label">STANCE</span>
            {STANCES.map((s) => (
              <button
                key={s.value}
                type="button"
                className={`chip-btn ${filters.stance === s.value ? 'is-active' : ''}`}
                onClick={() => {
                  apuAudio.playTick();
                  onChangeFilters({ ...filters, stance: s.value });
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="filter-result-meta">
            DISPLAYING {filtered.length} / {CREATURES.length}
          </div>
        </div>
      </div>

      {/* Adaptive Editorial Masonry Evidence Wall */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <h3>未检索到匹配的在档异常</h3>
          <p>当前筛选条件下暂无对应记录，请尝试放宽危害等级、区域或关键词条件。</p>
          <button type="button" className="btn-secondary" onClick={resetFilters}>
            恢复全部 35 份档案
          </button>
        </div>
      ) : (
        <div className="evidence-masonry">
          {filtered.map((creature, idx) => {
            // Per Modern Web Guidance (optimize-image-priority):
            // Elevate LCP candidate (first 2 images) with fetchPriority="high" & no lazy;
            // Below-the-fold images use loading="lazy" ALONE (never fetchPriority="low").
            const isPrimaryLcp = idx < 2;
            return (
              <motion.button
                key={creature.id}
                type="button"
                className={`evidence-card ${creature.cognitiveHazard ? 'is-hazard' : ''}`}
                onClick={() => onSelectCreature(creature)}
                onMouseEnter={() => apuAudio.playHover()}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.36,
                  delay: Math.min(idx * 0.025, 0.35),
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="card-media">
                  <img
                    src={getThumbUrl(creature.id)}
                    alt={`${creature.name}（${creature.englishName}）现场档案影像`}
                    width={creature.thumbWidth}
                    height={creature.thumbHeight}
                    loading={isPrimaryLcp ? undefined : 'lazy'}
                    decoding="async"
                    {...(isPrimaryLcp ? { fetchPriority: 'high' as const } : {})}
                  />
                  <div className="card-scanlines" aria-hidden="true" />
                  <div className="card-media-vignette" aria-hidden="true" />

                  <div className="card-overlay-top">
                    <span className="card-code-tag">
                      {creature.code} · {creature.romanCode}
                    </span>
                    <span className={`risk-pill risk-${creature.risk}`}>
                      {creature.risk} 级
                    </span>
                  </div>

                  {creature.cognitiveHazard && (
                    <span className="card-hazard-chip">
                      <ShieldAlert size={11} aria-hidden="true" />
                      <span>认知滤网</span>
                    </span>
                  )}
                </div>

                <div className="card-body">
                  <div className="card-title-row">
                    <h2 className="card-name">{creature.name}</h2>
                    <span className="card-english">{creature.englishName}</span>
                  </div>

                  <p className="card-epigraph">“{creature.epigraph}”</p>
                  <p className="card-summary">{creature.summary}</p>

                  <div className="card-footer">
                    <span>
                      {creature.stance} · {creature.intelligence} · {creature.zones[0]}
                    </span>
                    <span className="card-open-cue">
                      调阅
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      )}
    </motion.section>
  );
};
