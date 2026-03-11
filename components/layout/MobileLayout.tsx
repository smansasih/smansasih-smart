'use client';

import { useState } from 'react';
import { LogoStore, AuthUser } from '@/types';
import { getRoleLabel } from '@/hooks/useAuth';
import { MobileDrawer } from '@/components/layout/Sidebar';

interface MobileHeaderProps {
  logos: LogoStore;
  user: AuthUser;
  canManage: boolean;
  onOpenLogoModal: (target: 'header-logo') => void;
  onToggleEditMode: () => void;
  onLogout: () => void;
  onOpenDrawer: () => void;
}

export function MobileHeader({ logos, user, canManage, onOpenLogoModal, onToggleEditMode, onLogout, onOpenDrawer }: MobileHeaderProps) {
  return (
    <div className="mobile-header" style={{
      position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(135deg, var(--teal) 0%, var(--teal-light) 100%)',
      padding: '0 18px 20px',
    }}>
      {/* Background circles */}
      <div style={{ position: 'absolute', top: -40, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
      <div style={{ position: 'absolute', top: 20, right: 40, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />

      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16 }}>
        {/* Hamburger + user info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Hamburger button */}
          <button onClick={onOpenDrawer} style={{
            width: 38, height: 38, background: 'rgba(255,255,255,0.2)',
            borderRadius: 11, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 5,
            cursor: 'pointer', border: 'none', padding: '9px 8px', flexShrink: 0,
          }}>
            <span style={{ display: 'block', width: 18, height: 2, background: '#fff', borderRadius: 2 }} />
            <span style={{ display: 'block', width: 14, height: 2, background: 'rgba(255,255,255,0.7)', borderRadius: 2 }} />
            <span style={{ display: 'block', width: 18, height: 2, background: '#fff', borderRadius: 2 }} />
          </button>

          {/* Avatar + nama */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{user.avatar}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>Hello {user.name},</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>{getRoleLabel(user.role)}</div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onToggleEditMode} style={{
            position: 'relative', width: 38, height: 38, background: 'rgba(255,255,255,0.2)',
            borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, cursor: 'pointer', border: 'none',
          }}>
            🔔
            <div style={{
              position: 'absolute', top: -3, right: -3, width: 16, height: 16,
              borderRadius: '50%', background: '#ef4444', color: '#fff', fontSize: 9,
              fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1.5px solid rgba(0,0,0,0.15)',
            }}>2</div>
          </button>
          <button onClick={onLogout} style={{
            width: 38, height: 38, background: 'rgba(255,255,255,0.25)',
            borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, cursor: 'pointer', border: 'none', backdropFilter: 'blur(6px)',
          }}>🚪</button>
        </div>
      </div>

      {/* Brand */}
      <div
        onClick={() => onOpenLogoModal('header-logo')}
        style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginTop: 16 }}
      >
        {logos['header-logo']
          ? <img src={logos['header-logo']} style={{ width: 36, height: 36, borderRadius: 10, objectFit: 'cover', border: '2px solid rgba(255,255,255,0.7)' }} alt="logo" />
          : <span style={{ fontSize: 24 }}>🦅</span>
        }
        <div>
          <div style={{ fontSize: 17, fontWeight: 900, color: '#fff' }}>
            SMANSASIH <span style={{ background: 'var(--yellow)', color: 'var(--teal)', padding: '1px 7px', borderRadius: 7, fontSize: 12 }}>SMART</span>
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: 600, letterSpacing: '.8px', textTransform: 'uppercase' }}>Aplikasi Edukasi Terintegrasi</div>
        </div>
      </div>
    </div>
  );
}

interface BottomNavProps {
  onOpenAddApp: () => void;
  canManage: boolean;
  onOpenDrawer: () => void;
}

export function BottomNav({ onOpenAddApp, canManage, onOpenDrawer }: BottomNavProps) {
  const items = [
    { icon: '🏠', label: 'Home', onClick: undefined },
    { icon: '☰', label: 'Menu', onClick: onOpenDrawer, isMenu: true },
    ...(canManage ? [{ icon: '+', label: 'Tambah', onClick: onOpenAddApp, isAdd: true }] : []),
    { icon: '💬', label: 'Admin', onClick: undefined },
    { icon: '👤', label: 'Profil', onClick: undefined },
  ];

  return (
    <nav className="bottom-nav" style={{
      display: 'flex',
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: '#fff', borderTop: '1px solid var(--border)',
      padding: '8px 0 max(8px, env(safe-area-inset-bottom))',
      zIndex: 99, justifyContent: 'space-around',
      boxShadow: '0 -4px 20px rgba(0,0,0,.06)',
    }}>
      {items.map((item, i) => (
        <div
          key={i}
          onClick={item.onClick}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            padding: '2px 12px', cursor: 'pointer',
            color: i === 0 ? 'var(--yellow-dark)' : 'var(--muted)',
          }}>
          <div style={{
            fontSize: 22, fontWeight: item.isAdd ? 900 : 'normal',
            background: item.isAdd ? 'var(--yellow-pale)' : 'transparent',
            borderRadius: item.isAdd ? '50%' : 0,
            width: item.isAdd ? 36 : 'auto',
            height: item.isAdd ? 36 : 'auto',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: item.isAdd ? 'var(--yellow-dark)' : 'inherit',
          }}>
            {item.icon}
          </div>
          <div style={{ fontSize: 10, fontWeight: 700 }}>{item.label}</div>
        </div>
      ))}
    </nav>
  );
}

// ── MobileLayout wrapper ──────────────────────────────
interface MobileLayoutProps {
  logos: LogoStore;
  user: AuthUser;
  canManage: boolean;
  searchQuery: string;
  onSearch: (val: string) => void;
  onOpenAddApp: () => void;
  onToggleEditMode: () => void;
  onOpenLogoModal: (target: 'header-logo') => void;
  onLogout: () => void;
}

export function MobileLayout({
  logos, user, canManage, searchQuery,
  onSearch, onOpenAddApp, onToggleEditMode, onOpenLogoModal, onLogout
}: MobileLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <MobileHeader
        logos={logos}
        user={user}
        canManage={canManage}
        onOpenLogoModal={onOpenLogoModal}
        onToggleEditMode={onToggleEditMode}
        onLogout={onLogout}
        onOpenDrawer={() => setDrawerOpen(true)}
      />

      {/* Search bar */}
      <div className="search-float-mob" style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: '#fff', border: '1.5px solid var(--border)',
        borderRadius: 12, padding: '10px 14px', margin: '8px 16px',
      }}>
        <span style={{ fontSize: 17, color: 'var(--yellow)' }}>🔍</span>
        <input
          type="text"
          placeholder="Cari aplikasi..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.target.value)}
          style={{
            border: 'none', outline: 'none', background: 'none',
            fontFamily: 'Nunito,sans-serif', fontSize: 14, fontWeight: 600,
            color: 'var(--text)', width: '100%',
          }}
        />
      </div>

      {/* Bottom nav */}
      <BottomNav
        onOpenAddApp={onOpenAddApp}
        canManage={canManage}
        onOpenDrawer={() => setDrawerOpen(true)}
      />

      {/* Mobile drawer */}
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        logos={logos}
        user={user}
        canManage={canManage}
        onOpenLogoModal={onOpenLogoModal}
        onOpenAddApp={onOpenAddApp}
        onToggleEditMode={onToggleEditMode}
        onLogout={onLogout}
      />
    </>
  );
}