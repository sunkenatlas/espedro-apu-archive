import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ApuSeal } from './ApuSeal';

interface BootSequenceProps {
  onComplete: () => void;
}

const LOG_LINES = [
  { text: 'MOUNTING MUNICIPAL RESEARCH ARCHIVE // REV 2.0', status: 'OK', cls: 'ok' },
  { text: 'VERIFYING 35 ILLUSTRATED ANOMALY EXHIBITS (I–XXIII)', status: 'VERIFIED', cls: 'ok' },
  { text: 'RED-BLUE STROBE COGNITIVE ANCHOR FILTER', status: 'ACTIVE', cls: 'ok' },
  { text: 'INDEXING EXHIBIT R-3074 [THE DEUS] · HUDSON SECTOR', status: 'UNVERIFIED', cls: 'warn' },
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 2750);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onComplete();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="boot-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } }}
      role="status"
      aria-label="APU 机密档案系统启动自检"
    >
      <motion.div
        className="boot-frame"
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="boot-top">
          <motion.div
            initial={{ rotate: -25, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ color: '#ebe2ce' }}
          >
            <ApuSeal size={54} />
          </motion.div>
          <div>
            <div className="boot-dept">CITY OF ESPEDRO · ANOMALOUS PHENOMENA UNIT</div>
            <h1 className="boot-heading">异常生物图鉴终端 · 2.0</h1>
          </div>
        </div>

        <ul className="boot-log">
          {LOG_LINES.map((item, idx) => (
            <motion.li
              key={item.text}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.16 + idx * 0.22, duration: 0.3 }}
            >
              <span>{item.text}</span>
              <span className={item.cls}>[{item.status}]</span>
            </motion.li>
          ))}
        </ul>

        <motion.p
          className="boot-anchor"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.45 }}
        >
          人类只有两只眼睛，两只耳朵。相信红蓝色灯光。Hudson 中学不存在。
        </motion.p>

        <div className="boot-actions">
          <div className="boot-progress-track" aria-hidden="true">
            <motion.div
              className="boot-progress-fill"
              initial={{ scaleX: 0, transformOrigin: 'left center' }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.55, ease: 'linear' }}
            />
          </div>
          <button type="button" className="boot-enter-btn" onClick={onComplete} autoFocus>
            跳过自检 · ENTER
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
