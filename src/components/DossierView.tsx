import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Expand,
  Eye,
  MapPin,
  Network,
  ShieldAlert,
} from 'lucide-react';
import type { CityZone, CreatureEntry } from '../types';
import { CREATURES, CREATURE_BY_ID, LINEAGE_GROUPS, getFullUrl } from '../data/creatures';
import { apuAudio } from '../utils/audio';

interface DossierViewProps {
  creature: CreatureEntry;
  plateMode: 'darkroom' | 'raw';
  onPlateModeChange: (mode: 'darkroom' | 'raw') => void;
  onBack: () => void;
  onSelectCreature: (creature: CreatureEntry) => void;
  onOpenLightbox: () => void;
  onOpenRule: (ruleId: string) => void;
  onFilterByZone: (zone: CityZone) => void;
}

export const DossierView: React.FC<DossierViewProps> = ({
  creature,
  plateMode,
  onPlateModeChange,
  onBack,
  onSelectCreature,
  onOpenLightbox,
  onOpenRule,
  onFilterByZone,
}) => {
  // Bespoke 13-Schrodinger observation state: crisp when hovered/observed, drifts when unobserved
  const [plateObserved, setPlateObserved] = useState(true);

  useEffect(() => {
    setPlateObserved(true);
    if (creature.fxType === 'schrodinger') {
      const t = window.setTimeout(() => setPlateObserved(false), 1800);
      return () => window.clearTimeout(t);
    }
  }, [creature.id, creature.fxType]);

  const idx = CREATURES.findIndex((c) => c.id === creature.id);
  const prevCreature = idx > 0 ? CREATURES[idx - 1] : CREATURES[CREATURES.length - 1];
  const nextCreature = idx < CREATURES.length - 1 ? CREATURES[idx + 1] : CREATURES[0];

  const lineageGroup = LINEAGE_GROUPS.find((g) => g.lineageId === creature.lineageId);
  const hasSiblings = lineageGroup && lineageGroup.entries.length > 1;

  const stampClass =
    creature.stamp === 'VERIFIED'
      ? 'is-verified'
      : creature.stamp === 'UNVERIFIED'
      ? 'is-unverified'
      : '';

  return (
    <motion.article
      key={creature.id}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
      aria-label={`${creature.name} 异常档案详情`}
    >
      {/* Top Breadcrumb & Prev/Next Stepper */}
      <div className="dossier-topbar">
        <button type="button" className="back-btn" onClick={onBack}>
          <ArrowLeft size={14} aria-hidden="true" />
          <span>返回档案库</span>
        </button>

        <div className="dossier-step-group">
          <button
            type="button"
            className="nav-step-btn"
            onClick={() => onSelectCreature(prevCreature)}
            title={`上一份：${prevCreature.name}`}
          >
            <ArrowLeft size={13} aria-hidden="true" />
            <span>
              {prevCreature.id} {prevCreature.name}
            </span>
          </button>
          <button
            type="button"
            className="nav-step-btn"
            onClick={() => onSelectCreature(nextCreature)}
            title={`下一份：${nextCreature.name}`}
          >
            <span>
              {nextCreature.id} {nextCreature.name}
            </span>
            <ArrowRight size={13} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Sibling Lineage Switcher Strip (e.g., I 手指系 -> 指节 / 掌心 / 多指 / 海葵) */}
      {hasSiblings && lineageGroup && (
        <nav className="lineage-strip" aria-label="同谱系变体快速切换">
          <span className="lineage-strip-label">
            LINEAGE {lineageGroup.lineageId} // {lineageGroup.lineageName}
          </span>
          {lineageGroup.entries.map((sib) => (
            <button
              key={sib.id}
              type="button"
              className={`lineage-tab ${sib.id === creature.id ? 'is-current' : ''}`}
              onClick={() => {
                if (sib.id !== creature.id) onSelectCreature(sib);
              }}
              aria-current={sib.id === creature.id ? 'page' : undefined}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, opacity: 0.72 }}>
                {sib.romanCode}
              </span>
              <span>{sib.name}</span>
            </button>
          ))}
        </nav>
      )}

      {/* Main Split Dossier Layout */}
      <div className="dossier-layout">
        {/* Left Sticky Visual Evidence Plate */}
        <aside className="plate-column" aria-label="现场物证底片">
          <div
            className={`plate-frame ${creature.fxType === 'faraday' ? 'fx-faraday-frame' : ''}`}
            onMouseEnter={() => {
              if (creature.fxType === 'schrodinger') setPlateObserved(true);
            }}
            onMouseLeave={() => {
              if (creature.fxType === 'schrodinger') setPlateObserved(false);
            }}
          >
            {creature.fxType === 'radiant' && (
              <div className="plate-radiant-halo fx-radiant-halo" aria-hidden="true" />
            )}

            <button
              type="button"
              className={`plate-img-button ${plateMode === 'darkroom' ? 'is-darkroom' : 'is-raw'} ${
                creature.fxType === 'schrodinger' && !plateObserved
                  ? 'fx-schrodinger-unobserved'
                  : ''
              } ${creature.fxType === 'hyaline' ? 'fx-hyaline-shimmer' : ''}`}
              onClick={() => {
                apuAudio.playTick();
                onOpenLightbox();
              }}
              aria-label={`全屏灯箱检视 ${creature.name} 高清影像`}
            >
              <img
                src={getFullUrl(creature.id)}
                alt={`${creature.name}（${creature.englishName}）现场物证影像`}
                width={creature.imageWidth}
                height={creature.imageHeight}
                fetchPriority="high"
              />
              {plateMode === 'darkroom' && (
                <div className="card-scanlines" style={{ opacity: 0.28 }} aria-hidden="true" />
              )}
              {creature.fxType === 'abyss' && plateMode === 'darkroom' && (
                <div className="fx-abyss-vignette" aria-hidden="true" />
              )}
              {creature.fxType === 'ocular' && plateMode === 'darkroom' && (
                <div className="fx-ocular-reticle" aria-hidden="true" />
              )}
              <span className="plate-zoom-hint">
                <Expand size={12} aria-hidden="true" />
                <span>全屏灯箱</span>
              </span>
            </button>
          </div>

          <div className="plate-controls">
            <div className="mode-switch" role="group" aria-label="显影模式切换">
              <button
                type="button"
                className={plateMode === 'darkroom' ? 'is-active' : ''}
                onClick={() => {
                  apuAudio.playTick();
                  onPlateModeChange('darkroom');
                }}
              >
                档案暗房
              </button>
              <button
                type="button"
                className={plateMode === 'raw' ? 'is-active' : ''}
                onClick={() => {
                  apuAudio.playTick();
                  onPlateModeChange('raw');
                }}
              >
                原始底片
              </button>
            </div>

            {creature.fxType === 'schrodinger' && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: plateObserved ? 'var(--risk-b)' : 'var(--amber)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                <Eye size={13} />
                {plateObserved ? '观测锁定：稳定' : '脱离注视：正在消散'}
              </span>
            )}
          </div>

          <div className="plate-caption">
            <span>
              EXHIBIT #{creature.id} · {creature.imageWidth}×{creature.imageHeight}
            </span>
            <span className={`stamp-badge ${stampClass}`}>{creature.stamp}</span>
          </div>
        </aside>

        {/* Right Editorial Dossier Body */}
        <div className="dossier-content">
          <header>
            <div className="dossier-header-meta">
              <span className={`risk-pill risk-${creature.risk}`}>{creature.riskLabel}</span>
              <span className="meta-tag">{creature.code}</span>
              <span className="meta-tag">谱系 {creature.romanCode}</span>
              <span className="meta-tag">
                {creature.stance} · {creature.intelligence}
              </span>
              <span className="meta-tag">{creature.kind}</span>
              {creature.cognitiveHazard && (
                <span
                  className="meta-tag"
                  style={{ borderColor: 'rgba(230, 82, 73, 0.5)', color: '#f2a9a3' }}
                >
                  <ShieldAlert size={11} style={{ marginRight: 5, verticalAlign: '-1px' }} />
                  强认知风险
                </span>
              )}
            </div>

            <h1 className="dossier-title">{creature.name}</h1>
            <div className="dossier-subline">
              <span>{creature.englishName}</span>
              <span>/</span>
              <span>{creature.classificationLine}</span>
            </div>

            {/* Iconic Original Epigraph Blockquote */}
            <motion.blockquote
              className="dossier-epigraph"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="dossier-epigraph-text">“{creature.epigraph}”</p>
              {creature.parentEpigraph && (
                <p className="dossier-parent-epigraph">
                  所属大类题记（{creature.lineageName}）：“{creature.parentEpigraph}”
                </p>
              )}
            </motion.blockquote>
          </header>

          {/* Special Choreographed Litany for 35 The Deus */}
          {creature.specialLitany && (
            <section className="deus-litany-box" aria-label="降神概念实录原文">
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10.5,
                  letterSpacing: '0.18em',
                  color: 'var(--strobe-red)',
                  marginBottom: 4,
                }}
              >
                RECORD R-3074 // VERBATIM CONCEPTUAL STATEMENT
              </div>
              {creature.specialLitany.map((line, i) => {
                const isTurn = i === 4 || i === 8 || i === 9;
                const isFinal = i === creature.specialLitany!.length - 1;
                return (
                  <motion.p
                    key={line}
                    className={`deus-litany-line ${isTurn ? 'is-turn' : ''} ${
                      isFinal ? 'is-final' : ''
                    }`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.14 + i * 0.08, duration: 0.4 }}
                  >
                    {line}
                  </motion.p>
                );
              })}
            </section>
          )}

          {/* Four Core Archive Sections */}
          <div className="dossier-sections">
            <section className="dossier-card">
              <div className="dossier-card-head">
                <h2 className="dossier-card-title">
                  <span className="section-index">01 //</span>
                  <span>外观特征</span>
                </h2>
                <span className="section-en">MORPHOLOGY</span>
              </div>
              <p className="dossier-prose">{creature.appearance}</p>
            </section>

            <section className="dossier-card">
              <div className="dossier-card-head">
                <h2 className="dossier-card-title">
                  <span className="section-index">02 //</span>
                  <span>行为模式</span>
                </h2>
                <span className="section-en">BEHAVIORAL PROFILE</span>
              </div>
              <p className="dossier-prose">{creature.behavior}</p>
            </section>

            <section className="dossier-card">
              <div className="dossier-card-head">
                <h2 className="dossier-card-title">
                  <span className="section-index">03 //</span>
                  <span>相关守则</span>
                </h2>
                <span className="section-en">LINKED PROTOCOLS · CLICK TO INSPECT</span>
              </div>
              <div className="rule-ref-list">
                {creature.ruleRefs.map((ref) => (
                  <button
                    key={`${ref.ruleId}-${ref.label}`}
                    type="button"
                    className="rule-ref-btn"
                    onClick={() => {
                      apuAudio.playTick();
                      onOpenRule(ref.ruleId);
                    }}
                  >
                    <div>
                      <span className="rule-ref-title">
                        <BookOpen size={12} style={{ marginRight: 6, verticalAlign: '-1px' }} />
                        {ref.label}
                      </span>
                      <span className="rule-ref-summary">{ref.summary}</span>
                    </div>
                    <span className="rule-ref-cta">
                      查阅原文
                      <ChevronRight size={14} aria-hidden="true" />
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <section className="dossier-card">
              <div className="dossier-card-head">
                <h2 className="dossier-card-title">
                  <span className="section-index">04 //</span>
                  <span>应对方式</span>
                </h2>
                <span className="section-en">COUNTERMEASURES</span>
              </div>
              <p className="dossier-prose">{creature.countermeasures}</p>
            </section>
          </div>

          {creature.archiveNote && (
            <aside className="dossier-archive-note" aria-label="档案附注">
              <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', marginRight: 8 }}>
                [ARCHIVE NOTE]
              </strong>
              {creature.archiveNote}
            </aside>
          )}

          {/* Cross-Links: Zones + Related Entities */}
          <div className="dossier-cross-grid">
            <section className="dossier-card">
              <div className="dossier-card-head">
                <h2 className="dossier-card-title" style={{ fontSize: 15 }}>
                  <MapPin size={15} style={{ color: 'var(--strobe-blue)' }} />
                  <span>活动区域与目击地点</span>
                </h2>
              </div>
              <div className="tag-cloud" style={{ marginBottom: 12 }}>
                {creature.zones.map((z) => (
                  <button
                    key={z}
                    type="button"
                    className="cross-link-btn"
                    onClick={() => {
                      apuAudio.playTick();
                      onFilterByZone(z);
                    }}
                  >
                    <span>{z}</span>
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--ink-muted)' }}>
                具体目击点：{creature.locations.join(' / ')}
              </div>
            </section>

            {creature.relatedIds.length > 0 && (
              <section className="dossier-card">
                <div className="dossier-card-head">
                  <h2 className="dossier-card-title" style={{ fontSize: 15 }}>
                    <Network size={15} style={{ color: 'var(--strobe-red)' }} />
                    <span>生态与谱系关联</span>
                  </h2>
                </div>
                <div className="tag-cloud">
                  {creature.relatedIds.map((rid) => {
                    const target = CREATURE_BY_ID[rid];
                    if (!target) return null;
                    return (
                      <button
                        key={rid}
                        type="button"
                        className="cross-link-btn"
                        onClick={() => onSelectCreature(target)}
                      >
                        <span className="cross-link-code">{target.code}</span>
                        <span>{target.name}</span>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};
