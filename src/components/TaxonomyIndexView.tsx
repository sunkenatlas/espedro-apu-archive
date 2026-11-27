import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ShieldAlert } from 'lucide-react';
import type { CreatureEntry } from '../types';
import { CREATURES, getThumbUrl } from '../data/creatures';
import { apuAudio } from '../utils/audio';

interface TaxonomyIndexViewProps {
  onSelectCreature: (creature: CreatureEntry) => void;
}

type SortKey = 'id' | 'risk' | 'stance';

const RISK_ORDER: Record<string, number> = { X: 5, E: 4, D: 3, C: 2, B: 1 };

export const TaxonomyIndexView: React.FC<TaxonomyIndexViewProps> = ({ onSelectCreature }) => {
  const [sortBy, setSortBy] = useState<SortKey>('id');
  const [hovered, setHovered] = useState<CreatureEntry>(CREATURES[0]);

  const sorted = useMemo(() => {
    const arr = [...CREATURES];
    if (sortBy === 'risk') {
      arr.sort((a, b) => RISK_ORDER[b.risk] - RISK_ORDER[a.risk] || a.id.localeCompare(b.id));
    } else if (sortBy === 'stance') {
      arr.sort((a, b) => a.stance.localeCompare(b.stance, 'zh') || a.id.localeCompare(b.id));
    }
    return arr;
  }, [sortBy]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      aria-label="异常谱系机密目录"
    >
      <header className="atlas-hero" style={{ marginBottom: 22 }}>
        <div>
          <div className="atlas-kicker">
            <span>TAXONOMY LEDGER // ROMAN SERIES I–XXIII</span>
            <span className="stamp-badge">CLASSIFIED INDEX</span>
          </div>
          <h1 className="atlas-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
            谱系机密总目
          </h1>
          <p className="atlas-subtitle">
            依《异常名录汇总》一级罗马谱系与二级变种编号完整列档（已剔除无现场影像实证之 I-B 拇指）。
          </p>
        </div>

        <div className="pill-group" role="group" aria-label="目录排序方式">
          <span className="pill-group-label">SORT</span>
          <button
            type="button"
            className={`chip-btn ${sortBy === 'id' ? 'is-active' : ''}`}
            onClick={() => {
              apuAudio.playTick();
              setSortBy('id');
            }}
          >
            按原谱系编号
          </button>
          <button
            type="button"
            className={`chip-btn ${sortBy === 'risk' ? 'is-active' : ''}`}
            onClick={() => {
              apuAudio.playTick();
              setSortBy('risk');
            }}
          >
            按危害等级 (X→B)
          </button>
          <button
            type="button"
            className={`chip-btn ${sortBy === 'stance' ? 'is-active' : ''}`}
            onClick={() => {
              apuAudio.playTick();
              setSortBy('stance');
            }}
          >
            按立场分组
          </button>
        </div>
      </header>

      <div className="ledger-shell">
        {/* Accessible responsive table container per Modern Web Guidance */}
        <div
          tabIndex={0}
          role="region"
          aria-labelledby="taxonomy-table-caption"
          className="ledger-wrapper"
        >
          <table className="ledger-table">
            <caption id="taxonomy-table-caption">
              CITY OF ESPEDRO · APU 在档异常实体清单（共 35 项 · 点击任意行调阅完整档案）
            </caption>
            <thead>
              <tr>
                <th scope="col">档案编号</th>
                <th scope="col">罗马谱系</th>
                <th scope="col">名称 / 英文代号</th>
                <th scope="col">危害评级</th>
                <th scope="col">立场 / 智慧</th>
                <th scope="col">主要出没区域</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((c) => (
                <tr
                  key={c.id}
                  onMouseEnter={() => {
                    setHovered(c);
                    apuAudio.playHover();
                  }}
                  onClick={() => onSelectCreature(c)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectCreature(c);
                    }
                  }}
                  tabIndex={0}
                >
                  <th scope="row">
                    {c.code}
                    {c.cognitiveHazard && (
                      <ShieldAlert
                        size={12}
                        style={{ marginLeft: 6, color: '#e65249', verticalAlign: '-1px' }}
                        aria-label="高危认知危害"
                      />
                    )}
                  </th>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-secondary)' }}>
                    {c.romanCode} · {c.lineageName.split('·')[0].trim()}
                  </td>
                  <td>
                    <div className="ledger-name-cell">
                      <span className="ledger-name-zh">{c.name}</span>
                      <span className="ledger-name-en">{c.englishName}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`risk-pill risk-${c.risk}`}>{c.riskLabel}</span>
                  </td>
                  <td style={{ color: 'var(--ink-secondary)', whiteSpace: 'nowrap' }}>
                    {c.stance} / {c.intelligence}
                  </td>
                  <td style={{ color: 'var(--ink-muted)', fontSize: 12.5 }}>{c.zones.join(' · ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sticky Live Evidence Plate Preview */}
        <aside className="ledger-preview-panel" aria-label="档案底片快速预览">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-muted)' }}>
              {hovered.code} // {hovered.romanCode}
            </span>
            <span className={`risk-pill risk-${hovered.risk}`}>{hovered.risk} 级</span>
          </div>

          <div className="ledger-preview-img-wrap">
            <img
              src={getThumbUrl(hovered.id)}
              alt={`${hovered.name} 预览底片`}
              width={hovered.thumbWidth}
              height={hovered.thumbHeight}
            />
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 700 }}>
              {hovered.name}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-muted)' }}>
              {hovered.englishName}
            </div>
          </div>

          <p className="card-epigraph" style={{ fontSize: 12.5 }}>
            “{hovered.epigraph}”
          </p>

          <button
            type="button"
            className="nav-step-btn"
            style={{ justifyContent: 'center', width: '100%' }}
            onClick={() => onSelectCreature(hovered)}
          >
            <span>调阅完整卷宗</span>
            <ArrowUpRight size={14} />
          </button>
        </aside>
      </div>
    </motion.section>
  );
};
