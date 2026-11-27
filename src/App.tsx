import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'motion/react';
import {
  Grid2x2,
  Network,
  PauseCircle,
  PlayCircle,
  TableProperties,
  Volume2,
  VolumeX,
} from 'lucide-react';
import type { ActiveTab, CityZone, CreatureEntry } from './types';
import { CREATURE_BY_ID } from './data/creatures';
import { RULE_EXCERPTS } from './data/rules';
import { apuAudio } from './utils/audio';
import { ApuSeal } from './components/ApuSeal';
import { BootSequence } from './components/BootSequence';
import { GalleryView, type GalleryFilters } from './components/GalleryView';
import { TaxonomyIndexView } from './components/TaxonomyIndexView';
import { DossierView } from './components/DossierView';
import { EcologyView } from './components/EcologyView';
import { CognitiveHazardDialog } from './components/CognitiveHazardDialog';
import { LightboxDialog } from './components/LightboxDialog';
import { RuleDrawerDialog } from './components/RuleDrawerDialog';

const BOOT_STORAGE_KEY = 'espedro-apu-2.0-boot-seen';

function parseHash(): { tab: ActiveTab; entityId: string | null } {
  const raw = window.location.hash.replace(/^#\/?/, '');
  if (raw.startsWith('entity/')) {
    const id = raw.slice('entity/'.length).padStart(2, '0');
    if (CREATURE_BY_ID[id]) {
      return { tab: 'gallery', entityId: id };
    }
  }
  if (raw === 'index') return { tab: 'index', entityId: null };
  if (raw === 'ecology') return { tab: 'ecology', entityId: null };
  return { tab: 'gallery', entityId: null };
}

export const App: React.FC = () => {
  const initialRoute = parseHash();

  const [showBoot, setShowBoot] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(BOOT_STORAGE_KEY) !== '1';
    } catch {
      return true;
    }
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>(initialRoute.tab);
  const [selectedId, setSelectedId] = useState<string | null>(initialRoute.entityId);

  // Cognitive Hazard Intercept state
  const [pendingHazard, setPendingHazard] = useState<CreatureEntry | null>(null);
  const [skipHazardsSession, setSkipHazardsSession] = useState<boolean>(false);
  const [clearedHazardIds, setClearedHazardIds] = useState<Set<string>>(() => new Set());

  // Plate mode & overlays
  const [plateMode, setPlateMode] = useState<'darkroom' | 'raw'>('darkroom');
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [activeRuleId, setActiveRuleId] = useState<string | null>(null);

  // Audio (strictly muted by default) & Ambient FX pause control (WCAG 2.2.2)
  const [audioOn, setAudioOn] = useState<boolean>(false);
  const [fxMode, setFxMode] = useState<'full' | 'calm'>('full');

  // Shared gallery filters (persists across returning from dossiers)
  const [filters, setFilters] = useState<GalleryFilters>({
    query: '',
    risk: 'ALL',
    stance: 'ALL',
    zone: 'ALL',
    lineageId: 'ALL',
  });

  const finishBoot = useCallback(() => {
    setShowBoot(false);
    try {
      sessionStorage.setItem(BOOT_STORAGE_KEY, '1');
    } catch {
      // ignore
    }
  }, []);

  // Sync URL hash changes (browser Back/Forward)
  useEffect(() => {
    const onHashChange = () => {
      const next = parseHash();
      setActiveTab(next.tab);
      setSelectedId(next.entityId);
      setLightboxOpen(false);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Ensure every view/dossier change resets cleanly to the top of the viewport
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [selectedId, activeTab]);

  const navigateHash = useCallback((hash: string) => {
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    }
  }, []);

  const commitOpenCreature = useCallback(
    (creature: CreatureEntry) => {
      apuAudio.playOpenDossier();
      setSelectedId(creature.id);
      setLightboxOpen(false);
      navigateHash(`#/entity/${creature.id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [navigateHash],
  );

  const handleRequestCreature = useCallback(
    (creature: CreatureEntry) => {
      if (
        creature.cognitiveHazard &&
        !skipHazardsSession &&
        !clearedHazardIds.has(creature.id)
      ) {
        apuAudio.playHazardWarning();
        setPendingHazard(creature);
        return;
      }
      commitOpenCreature(creature);
    },
    [clearedHazardIds, commitOpenCreature, skipHazardsSession],
  );

  const handleHazardConfirm = useCallback(
    (skipFuture: boolean) => {
      const target = pendingHazard;
      setPendingHazard(null);
      if (skipFuture) setSkipHazardsSession(true);
      if (target) {
        setClearedHazardIds((prev) => {
          const next = new Set(prev);
          next.add(target.id);
          return next;
        });
        commitOpenCreature(target);
      }
    },
    [commitOpenCreature, pendingHazard],
  );

  const handleHazardCancel = useCallback(() => {
    setPendingHazard(null);
  }, []);

  const handleSwitchTab = useCallback(
    (tab: ActiveTab) => {
      apuAudio.playTick();
      setSelectedId(null);
      setActiveTab(tab);
      setLightboxOpen(false);
      navigateHash(tab === 'gallery' ? '#/' : `#/${tab}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [navigateHash],
  );

  const handleFilterByZone = useCallback(
    (zone: CityZone) => {
      setFilters((prev) => ({
        ...prev,
        zone,
      }));
      setSelectedId(null);
      setActiveTab('gallery');
      navigateHash('#/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [navigateHash],
  );

  const toggleAudio = () => {
    const next = apuAudio.setEnabled(!audioOn);
    setAudioOn(next);
  };

  const toggleFx = () => {
    apuAudio.playTick();
    setFxMode((m) => (m === 'full' ? 'calm' : 'full'));
  };

  const selectedCreature = selectedId ? CREATURE_BY_ID[selectedId] ?? null : null;
  const activeRule = activeRuleId ? RULE_EXCERPTS[activeRuleId] ?? null : null;

  return (
    <MotionConfig reducedMotion={fxMode === 'calm' ? 'always' : 'user'}>
      <div className="app-shell" data-fx={fxMode}>
        {/* Ambient Atmosphere Layer */}
        <div className="ambient-atmosphere" aria-hidden="true">
          <div className="ambient-strobe-red" />
          <div className="ambient-strobe-blue" />
          <div className="ambient-vignette" />
        </div>
        <div className="ambient-grain" aria-hidden="true" />

        {/* Skippable APU Terminal Boot Ceremony */}
        <AnimatePresence>{showBoot && <BootSequence onComplete={finishBoot} />}</AnimatePresence>

        {/* Top Sticky Header */}
        <header className="apu-header">
          <div className="apu-header-inner">
            <button
              type="button"
              className="apu-brand"
              onClick={() => handleSwitchTab('gallery')}
            >
              <ApuSeal size={36} />
              <div className="apu-brand-text">
                <span className="apu-brand-top">
                  <span className="apu-live-dot" aria-hidden="true" />
                  CITY OF ESPEDRO · APU
                </span>
                <span className="apu-brand-title">异常生物图鉴 2.0</span>
              </div>
            </button>

            <nav className="apu-nav" aria-label="主导航">
              <button
                type="button"
                className="apu-nav-btn"
                aria-current={!selectedCreature && activeTab === 'gallery' ? 'page' : undefined}
                onClick={() => handleSwitchTab('gallery')}
              >
                <Grid2x2 size={14} aria-hidden="true" />
                <span>影像图鉴</span>
              </button>
              <button
                type="button"
                className="apu-nav-btn"
                aria-current={!selectedCreature && activeTab === 'index' ? 'page' : undefined}
                onClick={() => handleSwitchTab('index')}
              >
                <TableProperties size={14} aria-hidden="true" />
                <span>谱系目录</span>
              </button>
              <button
                type="button"
                className="apu-nav-btn"
                aria-current={!selectedCreature && activeTab === 'ecology' ? 'page' : undefined}
                onClick={() => handleSwitchTab('ecology')}
              >
                <Network size={14} aria-hidden="true" />
                <span>生态与背景</span>
              </button>
            </nav>

            <div className="apu-utilities">
              <button
                type="button"
                className={`util-btn ${audioOn ? 'is-active' : ''}`}
                onClick={toggleAudio}
                title={audioOn ? '关闭终端环境音与按键声' : '开启合成终端声景（默认静音）'}
                aria-label={audioOn ? '静音音频' : '开启声景'}
              >
                {audioOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
                <span>{audioOn ? '声景开' : '静音'}</span>
              </button>

              <button
                type="button"
                className={`util-btn ${fxMode === 'calm' ? 'is-active' : ''}`}
                onClick={toggleFx}
                title={fxMode === 'full' ? '暂停背景氛围动效' : '恢复完整电影感动效'}
                aria-label={fxMode === 'full' ? '暂停背景氛围动效' : '恢复完整动效'}
              >
                {fxMode === 'full' ? <PauseCircle size={14} /> : <PlayCircle size={14} />}
                <span>{fxMode === 'full' ? '暂停光效' : '恢复光效'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Workspace */}
        <main className="apu-main">
          <AnimatePresence mode="wait">
            {selectedCreature ? (
              <DossierView
                key={`dossier-${selectedCreature.id}`}
                creature={selectedCreature}
                plateMode={plateMode}
                onPlateModeChange={setPlateMode}
                onBack={() => handleSwitchTab(activeTab)}
                onSelectCreature={handleRequestCreature}
                onOpenLightbox={() => setLightboxOpen(true)}
                onOpenRule={(ruleId) => setActiveRuleId(ruleId)}
                onFilterByZone={handleFilterByZone}
              />
            ) : activeTab === 'gallery' ? (
              <GalleryView
                key="tab-gallery"
                filters={filters}
                onChangeFilters={setFilters}
                onSelectCreature={handleRequestCreature}
              />
            ) : activeTab === 'index' ? (
              <TaxonomyIndexView
                key="tab-index"
                onSelectCreature={handleRequestCreature}
              />
            ) : (
              <EcologyView
                key="tab-ecology"
                onSelectCreature={handleRequestCreature}
              />
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="apu-footer">
          <div className="apu-footer-inner">
            <span>
              CITY OF ESPEDRO · MUNICIPAL RESEARCH DIVISION · ANOMALOUS PHENOMENA UNIT (APU)
            </span>
            <span className="footer-strobe-bar">
              <span className="footer-strobe-pip" aria-hidden="true" />
              <span>相信红蓝色灯光 · HUDSON中学不存在</span>
            </span>
          </div>
        </footer>

        {/* Native <dialog> Modals */}
        <CognitiveHazardDialog
          creature={pendingHazard}
          onConfirm={handleHazardConfirm}
          onCancel={handleHazardCancel}
        />

        <LightboxDialog
          creature={lightboxOpen ? selectedCreature : null}
          plateMode={plateMode}
          onPlateModeChange={setPlateMode}
          onClose={() => setLightboxOpen(false)}
        />

        <RuleDrawerDialog
          rule={activeRule}
          onClose={() => setActiveRuleId(null)}
          onSelectEntity={(eid) => {
            const target = CREATURE_BY_ID[eid];
            if (target) handleRequestCreature(target);
          }}
        />
      </div>
    </MotionConfig>
  );
};

export default App;
