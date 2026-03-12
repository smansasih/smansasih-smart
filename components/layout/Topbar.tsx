'use client';

import { LogoStore, AuthUser } from '@/types';
import { getRoleLabel } from '@/hooks/useAuth';

interface TopbarProps {
  logos: LogoStore;
  user: AuthUser;
  canManage: boolean;
  onSearch: (val: string) => void;
  onOpenAddApp: () => void;
  onToggleEditMode: () => void;
  onOpenLogoModal: (target: 'header-logo') => void;
  onLogout: () => void;
}

export function Topbar({ logos, user, canManage, onSearch, onOpenAddApp, onToggleEditMode, onOpenLogoModal, onLogout }: TopbarProps) {
  return (
    <header className="topbar" style={{
      display: 'none',
      position: 'fixed', top: 0, left: 0, right: 0,
      height: 'var(--header-h)',
      background: '#fff', borderBottom: '1px solid var(--border)',
      alignItems: 'center', padding: '0 20px', gap: 14,
      zIndex: 99, boxShadow: 'var(--shadow)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 0 }}>
        {/* Brand */}
        <div
          onClick={() => onOpenLogoModal('header-logo')}
          style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', flexShrink: 0 }}
          title="Klik untuk ganti logo"
        >
          {logos['header-logo']
            ? <img src={logos['header-logo']} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--yellow)' }} alt="logo" />
            : <img src="/logo.png" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--yellow)' }} alt="logo sekolah" />
          }
          <div className="tb-brand" style={{ fontSize: 15, fontWeight: 900, color: 'var(--text)', whiteSpace: 'nowrap' }}>
            SMANSASIH <span style={{ background: 'var(--teal)', color: 'var(--yellow)', padding: '1px 7px', borderRadius: 7, fontSize: 12, verticalAlign: 'middle' }}>SMART</span>
          </div>
        </div>

        {/* Search */}
        <div style={{
          flex: 1, maxWidth: 400,
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'var(--bg)', border: '1.5px solid var(--border)', borderRadius: 12,
          padding: '8px 13px',
        }}>
          <span style={{ fontSize: 16, color: 'var(--yellow)', flexShrink: 0 }}>🔍</span>
          <input
            type="text"
            placeholder="Cari aplikasi..."
            onChange={e => onSearch(e.target.value)}
            style={{
              border: 'none', outline: 'none', background: 'none',
              fontFamily: 'Nunito,sans-serif', fontSize: 14, fontWeight: 600,
              color: 'var(--text)', width: '100%',
            }}
          />
        </div>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
        {canManage && (
          <button onClick={onOpenAddApp} style={{
            background: 'var(--yellow)', color: 'var(--text)', fontFamily: 'Nunito,sans-serif',
            fontSize: 13, fontWeight: 800, border: 'none', borderRadius: 10, padding: '8px 15px',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
            boxShadow: 'var(--shadow-yellow)', whiteSpace: 'nowrap',
          }}>➕ Tambah App</button>
        )}

        <div
          onClick={onToggleEditMode}
          style={{
            position: 'relative', width: 38, height: 38,
            background: 'var(--bg)', border: '1.5px solid var(--border)', borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, cursor: 'pointer',
          }}>
          🔔
          <div style={{
            position: 'absolute', top: -4, right: -4, width: 17, height: 17, borderRadius: '50%',
            background: '#ef4444', color: '#fff', fontSize: 9, fontWeight: 900,
            display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff',
          }}>2</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--yellow-pale)', border: '2px solid var(--yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{user.avatar}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800 }}>{user.name}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>{getRoleLabel(user.role)}</div>
          </div>
        </div>

        <button onClick={onLogout} title="Keluar" style={{
          width: 38, height: 38, background: 'rgba(239,68,68,0.08)',
          border: '1.5px solid rgba(239,68,68,0.2)', borderRadius: 10,
          cursor: 'pointer', padding: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <img src="/icon_logout.png" style={{ width: 20, height: 20, objectFit: 'contain' }} alt="logout" />
        </button>
      </div>
    </header>
  );
}