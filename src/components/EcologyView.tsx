import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Radio } from 'lucide-react';
import type { CreatureEntry } from '../types';
import { CREATURE_BY_ID } from '../data/creatures';
import { COGNITIVE_ANCHORS, ECOLOGY_EDGES, FACTIONS } from '../data/world';
import { apuAudio } from '../utils/audio';

interface EcologyViewProps {
  onSelectCreature: (creature: CreatureEntry) => void;
}

interface GraphNode {
  id: string;
  x: number;
  y: number;
  cluster: string;
}

/** Curated spatial layout of Espedro's interconnected anomaly chains */
const GRAPH_NODES: GraphNode[] = [
  // Core conceptual axis (center-top)
  { id: '35', x: 500, y: 76, cluster: '概念源核' },
  { id: '34', x: 350, y: 185, cluster: '概念源核' },
  { id: '08', x: 650, y: 175, cluster: '天空与暗影' },

  // Sky & Shadow chain (right)
  { id: '07', x: 825, y: 150, cluster: '天空与暗影' },
  { id: '16', x: 920, y: 270, cluster: '天空与暗影' },
  { id: '17', x: 810, y: 315, cluster: '天空与暗影' },
  { id: '25', x: 695, y: 295, cluster: '翅膀系' },
  { id: '26', x: 575, y: 360, cluster: '翅膀系' },

  // Infiltration & Tactical chain (left)
  { id: '24', x: 95, y: 160, cluster: '武装渗透链' },
  { id: '21', x: 205, y: 260, cluster: '武装渗透链' },
  { id: '22', x: 345, y: 345, cluster: '武装渗透链' },
  { id: '31', x: 185, y: 395, cluster: '武装渗透链' },
  { id: '32', x: 85, y: 470, cluster: '武装渗透链' },

  // Crowd & Broadcast (bottom-center-left)
  { id: '23', x: 295, y: 485, cluster: '群体认知链' },
  { id: '33', x: 430, y: 465, cluster: '群体认知链' },

  // Ocular & Mirror & Grief & Lover clusters (bottom-right)
  { id: '11', x: 655, y: 455, cluster: '观测与镜面' },
  { id: '12', x: 785, y: 435, cluster: '观测与镜面' },
  { id: '13', x: 760, y: 525, cluster: '观测与镜面' },
  { id: '14', x: 530, y: 245, cluster: '悲怆转化' },
  { id: '15', x: 525, y: 170, cluster: '悲怆转化' },
  { id: '09', x: 915, y: 410, cluster: '观测与镜面' },
  { id: '10', x: 915, y: 505, cluster: '观测与镜面' },
  { id: '18', x: 555, y: 525, cluster: '爱人系' },
  { id: '19', x: 445, y: 555, cluster: '爱人系' },
  { id: '20', x: 655, y: 555, cluster: '爱人系' },
];

const NODE_MAP = Object.fromEntries(GRAPH_NODES.map((n) => [n.id, n]));

const EDGE_COLOR: Record<string, string> = {
  origin: '#ebe2ce',
  catalyst: '#cf9e42',
  command: '#c43f35',
  spatial: '#4686b5',
};

export const EcologyView: React.FC<EcologyViewProps> = ({ onSelectCreature }) => {
  const [activeNodeId, setActiveNodeId] = useState<string | null>('35');

  const activeCreature = activeNodeId ? CREATURE_BY_ID[activeNodeId] : null;
  const activeEdges = activeNodeId
    ? ECOLOGY_EDGES.filter((e) => e.from === activeNodeId || e.to === activeNodeId)
    : [];

  return (
    <motion.div
      className="ecology-stack"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Interactive Ecological Relationship Graph */}
      <section className="ecology-graph-panel" aria-label="Espedro 异常生态关联图谱">
        <div className="ecology-panel-head">
          <div>
            <div className="atlas-kicker" style={{ marginBottom: 4 }}>
              <span>ANOMALY ECOLOGY // INTERACTION MATRIX</span>
            </div>
            <h1 className="atlas-title" style={{ fontSize: 'clamp(26px, 3.6vw, 38px)' }}>
              Espedro 异常生态与认知链条
            </h1>
          </div>

          <div className="ecology-legend">
            <span className="legend-item">
              <span className="legend-swatch" style={{ background: EDGE_COLOR.origin }} />
              概念源核 / 变种
            </span>
            <span className="legend-item">
              <span className="legend-swatch" style={{ background: EDGE_COLOR.command }} />
              情报 / 指挥协同
            </span>
            <span className="legend-item">
              <span className="legend-swatch" style={{ background: EDGE_COLOR.catalyst }} />
              环境催化 / 转化
            </span>
            <span className="legend-item">
              <span className="legend-swatch" style={{ background: EDGE_COLOR.spatial }} />
              伴生 / 共存空间
            </span>
          </div>
        </div>

        <div className="ecology-svg-wrap">
          <svg
            viewBox="0 0 1000 600"
            className="ecology-svg"
            role="img"
            aria-label="Espedro 异常实体关系网络图，悬停节点可高亮关联，点击节点可打开对应档案"
          >
            {/* Subtle Coordinate Crosshairs */}
            <g stroke="rgba(235,226,206,0.05)" strokeWidth="1">
              <line x1="0" y1="300" x2="1000" y2="300" />
              <line x1="500" y1="0" x2="500" y2="600" />
              <circle cx="500" cy="300" r="220" fill="none" strokeDasharray="4 6" />
            </g>

            {/* Edges */}
            {ECOLOGY_EDGES.map((edge) => {
              const a = NODE_MAP[edge.from];
              const b = NODE_MAP[edge.to];
              if (!a || !b) return null;
              const isHighlighted =
                !activeNodeId || edge.from === activeNodeId || edge.to === activeNodeId;
              const mx = (a.x + b.x) / 2;
              const my = (a.y + b.y) / 2;
              return (
                <g key={`${edge.from}-${edge.to}`}>
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={EDGE_COLOR[edge.kind]}
                    strokeWidth={isHighlighted ? 1.8 : 1}
                    strokeOpacity={isHighlighted ? 0.78 : 0.14}
                    strokeDasharray={edge.kind === 'spatial' ? '4 4' : undefined}
                  />
                  {activeNodeId && isHighlighted && (
                    <text
                      x={mx}
                      y={my - 5}
                      textAnchor="middle"
                      fill="#ebe2ce"
                      fontSize="10"
                      fontFamily="var(--font-sans)"
                      style={{ paintOrder: 'stroke', stroke: '#080907', strokeWidth: 4 }}
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {GRAPH_NODES.map((node) => {
              const creature = CREATURE_BY_ID[node.id];
              if (!creature) return null;
              const isSelected = activeNodeId === node.id;
              const isNeighbor =
                !activeNodeId ||
                isSelected ||
                ECOLOGY_EDGES.some(
                  (e) =>
                    (e.from === activeNodeId && e.to === node.id) ||
                    (e.to === activeNodeId && e.from === node.id),
                );
              const isApex = node.id === '35' || node.id === '34';
              const r = isApex ? 26 : 20;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  style={{ cursor: 'pointer', opacity: isNeighbor ? 1 : 0.28 }}
                  onMouseEnter={() => {
                    setActiveNodeId(node.id);
                    apuAudio.playHover();
                  }}
                  onClick={() => onSelectCreature(creature)}
                  role="button"
                  tabIndex={0}
                  aria-label={`打开 ${creature.code} ${creature.name} 档案`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectCreature(creature);
                    }
                  }}
                >
                  {isSelected && (
                    <circle
                      r={r + 7}
                      fill="none"
                      stroke={creature.risk === 'X' ? '#ebe2ce' : '#c43f35'}
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                  )}
                  <circle
                    r={r}
                    fill={isSelected ? '#1f1614' : '#11120f'}
                    stroke={
                      isSelected
                        ? '#e65249'
                        : creature.risk === 'E' || creature.risk === 'X'
                        ? 'rgba(230,82,73,0.75)'
                        : 'rgba(235,226,206,0.34)'
                    }
                    strokeWidth={isSelected ? 2 : 1.2}
                  />
                  <text
                    y="-2"
                    textAnchor="middle"
                    fill="#ebe2ce"
                    fontSize={isApex ? '13' : '11.5'}
                    fontWeight="700"
                    fontFamily="var(--font-serif)"
                  >
                    {creature.name}
                  </text>
                  <text
                    y="11"
                    textAnchor="middle"
                    fill="#8c8678"
                    fontSize="8.5"
                    fontFamily="var(--font-mono)"
                  >
                    {creature.id}·{creature.risk}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Active Node Status Strip */}
        {activeCreature && (
          <div className="ecology-info-bar">
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--amber)', marginRight: 10 }}>
                {activeCreature.code} // {activeCreature.romanCode}
              </span>
              <strong style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--ink-primary)', marginRight: 12 }}>
                {activeCreature.name}
              </strong>
              <span>
                {activeEdges.length > 0
                  ? activeEdges
                      .map((e) => {
                        const otherId = e.from === activeCreature.id ? e.to : e.from;
                        const other = CREATURE_BY_ID[otherId];
                        return other ? `↔ ${other.name}（${e.label}）` : '';
                      })
                      .filter(Boolean)
                      .join(' · ')
                  : activeCreature.summary}
              </span>
            </div>
            <button
              type="button"
              className="nav-step-btn"
              onClick={() => onSelectCreature(activeCreature)}
            >
              <span>打开 {activeCreature.name} 档案</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        )}
      </section>

      {/* Red-Blue Reflective Tail Page Cognitive Anchors */}
      <section className="tailpage-panel" aria-label="外勤守则红蓝尾页认知锚点">
        <div className="atlas-kicker" style={{ marginBottom: 6 }}>
          <Radio size={13} style={{ color: 'var(--strobe-blue)' }} />
          <span>TAIL PAGE // RED-BLUE COGNITIVE ANCHOR PROTOCOL</span>
        </div>
        <h2 style={{ margin: '0 0 6px', fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 700 }}>
          红蓝尾页 · 人类认知锚点
        </h2>
        <p style={{ margin: 0, fontSize: 13.5, color: 'var(--ink-secondary)' }}>
          节选自《执勤警员守则 第17版》及《国民警卫队外勤守则 第28版》尾页。危险状态下须每小时朗读一次或在极端情况下大声朗读三次；不得使用录音代替。
        </p>

        <div className="anchors-grid">
          {COGNITIVE_ANCHORS.map((anchor) => (
            <article key={anchor.code} className="anchor-card">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: '#88badc', letterSpacing: '0.14em' }}>
                {anchor.code}
              </div>
              <h4>{anchor.title}</h4>
              <ul>
                {anchor.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Espedro Factions Summary from Lore Endplate */}
      <section aria-label="Espedro 各阵营汇总">
        <div className="atlas-kicker" style={{ marginBottom: 6 }}>
          <span>FACTIONS DOSSIER // ESPEDRO INCIDENT</span>
        </div>
        <h2 style={{ margin: '0 0 18px', fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 700 }}>
          各阵营汇总
        </h2>
        <div className="factions-grid">
          {FACTIONS.map((f) => (
            <article key={f.id} className="faction-card">
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700 }}>
                  {f.nameZh}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-muted)' }}>
                  {f.nameEn}
                </div>
              </div>
              <blockquote style={{ margin: 0, borderLeft: '2px solid var(--line-mid)', paddingLeft: 12 }}>
                <p className="faction-quote-zh">“{f.quoteZh}”</p>
                <p className="faction-quote-en">"{f.quoteEn}"</p>
              </blockquote>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-secondary)', lineHeight: 1.7 }}>
                {f.role}
              </p>
            </article>
          ))}
        </div>
      </section>
    </motion.div>
  );
};
