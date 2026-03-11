'use client';

import { useRef, useState } from 'react';
import { LogoTarget, LogoStore } from '@/types';

interface LogoModalProps {
  isOpen: boolean;
  initialTarget: LogoTarget;
  logos: LogoStore;
  onClose: () => void;
  onSave: (target: LogoTarget, dataUrl: string) => void;
  onReset: (target: LogoTarget) => void;
}

const TARGETS: { key: LogoTarget; label: string; sub: string; shape: 'circle' | 'rect' }[] = [
  { key: 'splash-logo', label: 'Logo Splash',    sub: 'Bulat, atas get started', shape: 'circle' },
  { key: 'mascot',      label: 'Gambar Tengah',  sub: 'Maskot / ilustrasi',      shape: 'rect'   },
  { key: 'header-logo', label: 'Logo Header',    sub: 'Sidebar & topbar',        shape: 'rect'   },
];

const DEFAULT_ICONS: Record<LogoTarget, string> = {
  'splash-logo': '🦅',
  'mascot':      '🦉',
  'header-logo': '🦅',
};

export function LogoModal({ isOpen, initialTarget, logos, onClose, onSave, onReset }: LogoModalProps) {
  const [currentTarget, setCurrentTarget] = useState<LogoTarget>(initialTarget);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const data = ev.target?.result as string;
      onSave(currentTarget, data);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        display: 'flex', position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
        zIndex: 9500, alignItems: 'flex-end', justifyContent: 'center',
      }}
    >
      <div style={{
        background: '#fff', borderRadius: '28px 28px 0 0',
        padding: '20px 24px 44px', width: '100%', maxWidth: 480,
        animation: 'slideUp .3s cubic-bezier(.4,0,.2,1)',
      }}>
        <div style={{ width: 40, height: 4, background: '#e0e0e0', borderRadius: 2, margin: '0 auto 18px' }} />
        <h3 style={{ fontSize: 17, fontWeight: 900, marginBottom: 18, color: 'var(--text)' }}>✏️ Ganti Logo / Ikon</h3>

        {/* Target cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
          {TARGETS.map(t => {
            const isSelected = currentTarget === t.key;
            const logoSrc = logos[t.key];
            return (
              <div key={t.key} onClick={() => setCurrentTarget(t.key)}
                style={{
                  background: isSelected ? 'var(--yellow-pale)' : 'var(--bg)',
                  border: `2px solid ${isSelected ? 'var(--yellow)' : 'var(--border)'}`,
                  borderRadius: 14, padding: '16px 12px', textAlign: 'center', cursor: 'pointer',
                }}>
                <div style={{
                  width: 48, height: 48, margin: '0 auto 8px',
                  borderRadius: t.shape === 'circle' ? '50%' : 10,
                  border: '2px solid var(--yellow)', background: '#fff',
                  overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                }}>
                  {logoSrc
                    ? <img src={logoSrc} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                    : <span>{DEFAULT_ICONS[t.key]}</span>
                  }
                </div>
                <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text)' }}>{t.label}</div>
                <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 600, marginTop: 2 }}>{t.sub}</div>
              </div>
            );
          })}
        </div>

        {/* Upload zone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: '2px dashed var(--border)', borderRadius: 14,
            padding: 24, textAlign: 'center', cursor: 'pointer',
          }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>📁</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>Klik untuk pilih gambar</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>PNG, JPG, WebP, SVG — Disarankan ukuran persegi (1:1)</div>
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />
        </div>

        {/* Tip */}
        <div style={{
          background: 'var(--yellow-pale)', border: '1px solid rgba(245,168,0,0.3)',
          borderRadius: 10, padding: '10px 12px', marginTop: 12,
          fontSize: 11, fontWeight: 600, color: 'var(--teal)', lineHeight: 1.5,
        }}>
          💡 <strong>Tips:</strong> Gunakan logo sekolah format PNG transparan untuk hasil terbaik.<br />
          Ukuran ideal: <strong>200×200px</strong> untuk logo bulat, <strong>400×400px</strong> untuk maskot.
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <button onClick={() => onReset(currentTarget)} style={{
            background: '#ef4444', color: '#fff', fontFamily: 'Nunito,sans-serif',
            fontSize: 15, fontWeight: 900, border: 'none', borderRadius: 13,
            padding: '12px 20px', cursor: 'pointer', flexShrink: 0,
          }}>
            🗑️ Reset
          </button>
          <button onClick={onClose} style={{
            flex: 1, background: 'var(--yellow)', color: 'var(--text)',
            fontFamily: 'Nunito,sans-serif', fontSize: 15, fontWeight: 900,
            border: 'none', borderRadius: 13, padding: 13, cursor: 'pointer',
            boxShadow: 'var(--shadow-yellow)',
          }}>
            ✅ Selesai
          </button>
        </div>
      </div>
    </div>
  );
}