'use client';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div style={{
      display: 'flex', position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
      zIndex: 9000, alignItems: 'center', justifyContent: 'center', padding: 20,
    }}>
      <div style={{
        background: '#fff', borderRadius: 24, padding: '32px 28px 28px',
        maxWidth: 340, width: '100%', textAlign: 'center',
        animation: 'popIn .25s cubic-bezier(.4,0,.2,1)',
        boxShadow: '0 20px 60px rgba(0,0,0,.2)',
      }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🚪</div>
        <h3 style={{ fontSize: 18, fontWeight: 900, color: 'var(--text)', marginBottom: 8 }}>Keluar dari Aplikasi?</h3>
        <p style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 600, marginBottom: 24, lineHeight: 1.5 }}>
          Yakin ingin keluar?
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: 12, background: 'var(--bg)', border: '1.5px solid var(--border)',
            borderRadius: 12, fontFamily: 'Nunito,sans-serif', fontSize: 14,
            fontWeight: 800, color: 'var(--muted)', cursor: 'pointer',
          }}>
            Batal
          </button>
          <button onClick={onConfirm} style={{
            flex: 1, padding: 12, background: '#ef4444', border: 'none',
            borderRadius: 12, fontFamily: 'Nunito,sans-serif', fontSize: 14,
            fontWeight: 800, color: '#fff', cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(239,68,68,0.35)',
          }}>
            Ya, Keluar
          </button>
        </div>
      </div>
    </div>
  );
}