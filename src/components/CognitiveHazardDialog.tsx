import React, { useEffect, useRef, useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import type { CreatureEntry } from '../types';

interface CognitiveHazardDialogProps {
  creature: CreatureEntry | null;
  onConfirm: (skipFuture: boolean) => void;
  onCancel: () => void;
}

/**
 * Native <dialog> modal following Modern Web Guidance:
 * - Opened via showModal() (no role="dialog" or aria-modal needed)
 * - Uses closedby="closerequest" so Esc closes and triggers onCancel
 * - Reads & resets dialog.returnValue cleanly on close
 */
export const CognitiveHazardDialog: React.FC<CognitiveHazardDialogProps> = ({
  creature,
  onConfirm,
  onCancel,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [skipSession, setSkipSession] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (creature && !dialog.open) {
      setSkipSession(false);
      dialog.showModal();
    } else if (!creature && dialog.open) {
      dialog.close();
    }
  }, [creature]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => {
      const rv = dialog.returnValue;
      dialog.returnValue = '';
      if (rv !== 'proceed') {
        onCancel();
      }
    };
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [onCancel]);

  const handleProceed = () => {
    const dialog = dialogRef.current;
    if (dialog && dialog.open) {
      dialog.close('proceed');
    }
    onConfirm(skipSession);
  };

  const handleAbort = () => {
    const dialog = dialogRef.current;
    if (dialog && dialog.open) {
      dialog.close('cancel');
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal-hazard"
      aria-labelledby="hazard-dialog-title"
      {...({ closedby: 'closerequest' } as Record<string, string>)}
    >
      {creature && (
        <div className="hazard-box">
          <div className="hazard-header">
            <div className="hazard-icon-wrap hazard-pulse-ring" aria-hidden="true">
              <ShieldAlert size={22} />
            </div>
            <div>
              <div className="hazard-sub">
                APU COGNITIVE FILTER // {creature.code} · {creature.riskLabel}
              </div>
              <h1 id="hazard-dialog-title" className="hazard-title">
                高危认知危害拦截提示
              </h1>
            </div>
          </div>

          <p style={{ margin: '0 0 12px', fontSize: 13.5, color: 'var(--ink-secondary)', lineHeight: 1.75 }}>
            您正尝试调阅 <strong style={{ color: 'var(--ink-primary)' }}>{creature.name}（{creature.englishName}）</strong>
            的机密档案。该条目涉及强认知污染、异常视觉观测畸变或概念级风险。请先默念下方人类认知锚点以确认神智清醒：
          </p>

          <blockquote className="hazard-anchor-quote">
            “{creature.hazardAnchor ?? '人类只有两只并排的眼睛，两只相对的耳朵。天空是蓝色的。我相信红蓝色的灯光。'}”
          </blockquote>

          <label className="hazard-checkbox">
            <input
              type="checkbox"
              checked={skipSession}
              onChange={(e) => setSkipSession(e.target.checked)}
            />
            <span>本次浏览会话中确认认知稳定，不再重复拦截其他高危条目</span>
          </label>

          <div className="hazard-actions">
            <button type="button" className="btn-secondary" onClick={handleAbort} autoFocus>
              返回安全列表
            </button>
            <button type="button" className="btn-danger-proceed" onClick={handleProceed}>
              确认锚点 · 解除滤网查阅
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
};
