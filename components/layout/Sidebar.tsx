'use client';

import { LogoStore, AuthUser } from '@/types';
import { getRoleLabel } from '@/hooks/useAuth';

interface SidebarProps {
  logos: LogoStore;
  user: AuthUser;
  canManage: boolean;
  onOpenLogoModal: (target: 'header-logo') => void;
  onOpenAddApp: () => void;
  onOpenImport: () => void;
  onOpenAnnouncements: () => void;
  onToggleEditMode: () => void;
  onLogout: () => void;
}

// ── Shared inner content (dipakai Desktop & Mobile Drawer) ──
interface SidebarContentProps extends SidebarProps {
  onClose?: () => void;
}

function SidebarContent({ logos, user, canManage, onOpenLogoModal, onOpenAddApp, onOpenImport, onOpenAnnouncements, onToggleEditMode, onLogout, onClose }: SidebarContentProps) {
  return (
    <>
      {/* Header logo */}
      <div style={{ padding: '20px 20px 14px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ position: 'relative', cursor: 'pointer' }}
            onClick={() => onOpenLogoModal('header-logo')}
            title="Klik untuk ganti logo"
          >
            {logos['header-logo']
              ? <img src={logos['header-logo']} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--yellow)' }} alt="logo" />
              : <img src="/logo.png" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--yellow)' }} alt="logo sekolah" />
            }
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 900, color: 'var(--text)', marginBottom: 2 }}>
              SMANSASIH <span style={{ background: 'var(--teal)', color: 'var(--yellow)', padding: '1px 8px', borderRadius: 7, fontSize: 12, verticalAlign: 'middle' }}>SMART</span>
            </div>
            <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 600, letterSpacing: '.8px', textTransform: 'uppercase' }}>Aplikasi Edukasi Terintegrasi</div>
          </div>
          {/* Tombol ✕ — hanya di mobile drawer */}
          {onClose && (
            <button onClick={onClose} style={{
              width: 32, height: 32, borderRadius: 8, border: 'none', flexShrink: 0,
              background: 'var(--bg)', cursor: 'pointer', fontSize: 16, color: 'var(--muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>✕</button>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: 12, scrollbarWidth: 'none' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, padding: '8px 10px 4px' }}>Menu Utama</div>
        {[
          { icon: '🏠', label: 'Beranda', onClick: undefined as (() => void) | undefined },
          { icon: '🧭', label: 'Jelajahi', onClick: undefined as (() => void) | undefined },
          { icon: '📢', label: 'Pengumuman', onClick: () => { onOpenAnnouncements(); onClose?.(); } },
          { icon: '🌐', label: 'Media Sekolah', onClick: undefined as (() => void) | undefined },
        ].map((item, i) => (
          <a key={item.label}
            onClick={item.onClick ?? onClose}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 12, cursor: 'pointer',
              fontSize: 13, fontWeight: 700,
              color: i === 0 ? 'var(--text)' : 'var(--muted)',
              background: i === 0 ? 'var(--yellow-pale)' : 'transparent',
              transition: 'all .2s', textDecoration: 'none', marginBottom: 2,
            }}>
            <span style={{ fontSize: 16, width: 20, textAlign: 'center' }}>{item.icon}</span>
            {item.label}
          </a>
        ))}

        {canManage && (<>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, padding: '8px 10px 4px', marginTop: 10 }}>Pengelolaan</div>
          <a onClick={() => { onOpenAddApp(); onClose?.(); }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 12, cursor: 'pointer', fontSize: 13, fontWeight: 700, color: 'var(--muted)', textDecoration: 'none', marginBottom: 2 }}>
            <span style={{ fontSize: 16, width: 20, textAlign: 'center' }}>➕</span>Tambah Aplikasi
          </a>
          <a onClick={() => { onToggleEditMode(); onClose?.(); }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 12, cursor: 'pointer', fontSize: 13, fontWeight: 700, color: 'var(--muted)', textDecoration: 'none', marginBottom: 2 }}>
            <span style={{ fontSize: 16, width: 20, textAlign: 'center' }}>✏️</span>Edit Aplikasi
          </a>
          <a onClick={() => { onOpenImport(); onClose?.(); }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 12, cursor: 'pointer', fontSize: 13, fontWeight: 700, color: 'var(--muted)', textDecoration: 'none', marginBottom: 2 }}>
            <span style={{ fontSize: 16, width: 20, textAlign: 'center' }}>👥</span>Import Pengguna
          </a>
          <a style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 12, cursor: 'pointer', fontSize: 13, fontWeight: 700, color: 'var(--muted)', textDecoration: 'none', marginBottom: 2 }}>
            <span style={{ fontSize: 16, width: 20, textAlign: 'center' }}>⚙️</span>Pengaturan
          </a>
        </>)}
      </nav>

      {/* User footer */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--yellow-pale)', border: '2px solid var(--yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>{user.avatar}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>{user.name}</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>{getRoleLabel(user.role)}</div>
        </div>
        <button onClick={onLogout} title="Keluar" style={{
          width: 34, height: 34, borderRadius: 10,
          background: 'rgba(239,68,68,0.1)', border: '1.5px solid rgba(239,68,68,0.2)',
          cursor: 'pointer', padding: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <img src="/icon_logout.png" style={{ width: 20, height: 20, objectFit: 'contain' }} alt="logout" />
        </button>
      </div>
    </>
  );
}

// ── Desktop Sidebar (hidden on mobile via CSS) ────────
export function Sidebar(props: SidebarProps) {
  return (
    <aside className="sidebar" style={{
      display: 'none',
      position: 'fixed', top: 0, left: 0, bottom: 0,
      width: 'var(--sidebar-w)', background: '#fff',
      borderRight: '1px solid var(--border)',
      flexDirection: 'column', zIndex: 100,
      boxShadow: '2px 0 16px rgba(0,0,0,.05)',
    }}>
      <SidebarContent {...props} />
    </aside>
  );
}

// ── Mobile Drawer (slide in from left) ───────────────
interface MobileDrawerProps extends SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose, ...rest }: MobileDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(3px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity .25s ease',
        }}
      />
      {/* Drawer panel */}
      <div style={{
        position: 'fixed', top: 0, left: 0, bottom: 0,
        width: 'min(280px, 82vw)',
        background: '#fff',
        display: 'flex', flexDirection: 'column',
        zIndex: 201,
        boxShadow: '4px 0 32px rgba(0,0,0,.18)',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform .28s cubic-bezier(.4,0,.2,1)',
        overflowY: 'auto',
      }}>
        <SidebarContent {...rest} onClose={onClose} />
      </div>
    </>
  );
}