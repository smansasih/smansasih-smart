'use client';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <>
    <style>{`
      .logout-img-wrap {
        position: relative;
        display: inline-block;
        overflow: hidden;
        border-radius: 12px;
      }
      .logout-img-wrap::after {
        content: '';
        position: absolute;
        top: -60%;
        left: -60%;
        width: 55%;
        height: 200%;
        background: linear-gradient(
          105deg,
          transparent 30%,
          rgba(255,255,255,0.0) 40%,
          rgba(255,255,255,0.6) 50%,
          rgba(255,255,255,0.0) 60%,
          transparent 70%
        );
        transform: skewX(-15deg);
        animation: shimmerLogout 2s ease-out .2s both;
        pointer-events: none;
        z-index: 10;
      }
      @keyframes shimmerLogout {
        0%   { left: -60%; opacity: 1; }
        100% { left: 160%; opacity: 1; }
      }
    `}</style>
    <div style={{
      display: 'flex', position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
      zIndex: 9000, alignItems: 'center', justifyContent: 'center', padding: 20,
    }}>
      <div style={{
        background: '#fff', borderRadius: 24, padding: '28px 28px 28px',
        maxWidth: 380, width: '90%', textAlign: 'center',
        animation: 'popIn .25s cubic-bezier(.4,0,.2,1)',
        boxShadow: '0 20px 60px rgba(0,0,0,.2)',
      }}>
        <div className="logout-img-wrap" style={{ marginBottom: 12 }}>
          <img src="/logo_keluar.png" style={{ width: 'min(60vw, 280px)', height: 'min(60vw, 280px)', objectFit: 'contain', display: 'block' }} alt="keluar" />
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 900, color: 'var(--text)', marginBottom: 24 }}>Keluar dari Aplikasi?</h3>
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
    </>
  );
}