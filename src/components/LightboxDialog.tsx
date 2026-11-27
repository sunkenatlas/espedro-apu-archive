import React, { useEffect, useRef, useState } from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import type { CreatureEntry } from '../types';
import { getFullUrl } from '../data/creatures';

interface LightboxDialogProps {
  creature: CreatureEntry | null;
  plateMode: 'darkroom' | 'raw';
  onPlateModeChange: (mode: 'darkroom' | 'raw') => void;
  onClose: () => void;
}

/**
 * Full-resolution Evidence Lightbox using native <dialog> + closedby="any"
 * with pointerdown/pointerup fallback for Safari (per Modern Web Guidance).
 */
export const LightboxDialog: React.FC<LightboxDialogProps> = ({
  creature,
  plateMode,
  onPlateModeChange,
  onClose,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (creature && !dialog.open) {
      setZoomed(false);
      dialog.showModal();
    } else if (!creature && dialog.open) {
      dialog.close();
    }
  }, [creature]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = '';
      onClose();
    };
    dialog.addEventListener('close', handleClose);

    // Fallback light-dismiss when closedBy is unsupported (Safari)
    let pressedOutside = false;
    const isOutside = (e: PointerEvent) => {
      const r = dialog.getBoundingClientRect();
      return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!('closedBy' in HTMLDialogElement.prototype)) {
        pressedOutside = isOutside(e);
      }
    };
    const onPointerUp = (e: PointerEvent) => {
      if (!('closedBy' in HTMLDialogElement.prototype) && pressedOutside && isOutside(e)) {
        dialog.close();
      }
    };
    dialog.addEventListener('pointerdown', onPointerDown);
    dialog.addEventListener('pointerup', onPointerUp);

    return () => {
      dialog.removeEventListener('close', handleClose);
      dialog.removeEventListener('pointerdown', onPointerDown);
      dialog.removeEventListener('pointerup', onPointerUp);
    };
  }, [onClose]);

  const closeDialog = () => {
    const dialog = dialogRef.current;
    if (dialog && dialog.open) {
      dialog.close();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal-lightbox"
      aria-labelledby="lightbox-title"
      {...({ closedby: 'any' } as Record<string, string>)}
    >
      {creature && (
        <>
          <div className="lightbox-bar">
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-muted)', marginRight: 10 }}>
                {creature.code} // {creature.romanCode}
              </span>
              <h1
                id="lightbox-title"
                style={{
                  display: 'inline',
                  margin: 0,
                  fontFamily: 'var(--font-serif)',
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                {creature.name} · {creature.englishName}
              </h1>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-muted)', marginLeft: 12 }}>
                {creature.imageWidth}×{creature.imageHeight}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div className="mode-switch" role="group" aria-label="影像显影模式">
                <button
                  type="button"
                  className={plateMode === 'darkroom' ? 'is-active' : ''}
                  onClick={() => onPlateModeChange('darkroom')}
                >
                  档案暗房
                </button>
                <button
                  type="button"
                  className={plateMode === 'raw' ? 'is-active' : ''}
                  onClick={() => onPlateModeChange('raw')}
                >
                  原始底片
                </button>
              </div>

              <button
                type="button"
                className="util-btn"
                onClick={() => setZoomed((z) => !z)}
                aria-label={zoomed ? '适应屏幕' : '1:1 放大检视'}
              >
                {zoomed ? <ZoomOut size={14} /> : <ZoomIn size={14} />}
                <span>{zoomed ? '适应屏幕' : '原尺寸放大'}</span>
              </button>

              <button
                type="button"
                className="util-btn"
                onClick={closeDialog}
                aria-label="关闭灯箱"
                autoFocus
              >
                <X size={15} />
                <span>ESC 关闭</span>
              </button>
            </div>
          </div>

          <div
            className="lightbox-stage"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeDialog();
            }}
          >
            <img
              src={getFullUrl(creature.id)}
              alt={`${creature.name}（${creature.englishName}）完整物证底片`}
              width={creature.imageWidth}
              height={creature.imageHeight}
              className={`lightbox-img ${zoomed ? 'is-zoomed' : ''} ${
                plateMode === 'darkroom' ? 'is-darkroom' : ''
              }`}
              onClick={() => setZoomed((z) => !z)}
            />
          </div>
        </>
      )}
    </dialog>
  );
};
