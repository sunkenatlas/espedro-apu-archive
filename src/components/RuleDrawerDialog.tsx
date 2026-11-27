import React, { useEffect, useRef } from 'react';
import { BookOpen, X } from 'lucide-react';
import type { RuleExcerpt } from '../types';
import { CREATURE_BY_ID } from '../data/creatures';

interface RuleDrawerDialogProps {
  rule: RuleExcerpt | null;
  onClose: () => void;
  onSelectEntity: (id: string) => void;
}

/**
 * Slide-over Rulebook Excerpt Drawer built on native <dialog> + showModal().
 * Clicking the dimmed area outside .drawer-panel closes the drawer cleanly.
 */
export const RuleDrawerDialog: React.FC<RuleDrawerDialogProps> = ({
  rule,
  onClose,
  onSelectEntity,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (rule && !dialog.open) {
      dialog.showModal();
    } else if (!rule && dialog.open) {
      dialog.close();
    }
  }, [rule]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = '';
      onClose();
    };
    dialog.addEventListener('close', handleClose);

    // Light dismiss when clicking outside the sheet panel
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        dialog.close();
      }
    };
    dialog.addEventListener('click', handleClick);

    return () => {
      dialog.removeEventListener('close', handleClose);
      dialog.removeEventListener('click', handleClick);
    };
  }, [onClose]);

  const closeDrawer = () => {
    const dialog = dialogRef.current;
    if (dialog && dialog.open) {
      dialog.close();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal-drawer"
      aria-labelledby="rule-drawer-title"
    >
      {rule && (
        <div ref={panelRef} className="drawer-panel">
          <div className="drawer-header">
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  color: '#88badc',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <BookOpen size={13} />
                <span>{rule.edition} // {rule.clauseTag}</span>
              </div>
              <h1 id="rule-drawer-title" className="drawer-doc-title">
                《{rule.documentTitle}》
              </h1>
            </div>
            <button
              type="button"
              className="util-btn"
              onClick={closeDrawer}
              aria-label="关闭守则原文抽屉"
              autoFocus
            >
              <X size={15} />
            </button>
          </div>

          <div className="drawer-body">
            <p style={{ margin: 0, fontSize: 12.5, color: 'var(--ink-muted)' }}>
              以下内容节选自《E市规则类怪谈》原始官方应急手册，供外勤与档案核对参照：
            </p>

            {rule.clauses.map((c) => (
              <article key={c.clause} className="drawer-clause">
                <div className="drawer-clause-num">{c.clause}</div>
                <p className="drawer-clause-text">{c.text}</p>
                {c.annotation && <p className="drawer-annotation">{c.annotation}</p>}
              </article>
            ))}

            {rule.relatedEntityIds.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10.5,
                    letterSpacing: '0.14em',
                    color: 'var(--ink-muted)',
                    marginBottom: 10,
                  }}
                >
                  该守则关联的在档异常实体
                </div>
                <div className="tag-cloud">
                  {rule.relatedEntityIds.map((eid) => {
                    const ent = CREATURE_BY_ID[eid];
                    if (!ent) return null;
                    return (
                      <button
                        key={eid}
                        type="button"
                        className="cross-link-btn"
                        onClick={() => {
                          closeDrawer();
                          onSelectEntity(eid);
                        }}
                      >
                        <span className="cross-link-code">{ent.code}</span>
                        <span>{ent.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
};
