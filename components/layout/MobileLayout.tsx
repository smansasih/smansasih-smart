'use client';

import { useState, useRef, useEffect } from 'react';
import { LogoStore, AuthUser } from '@/types';
import { getRoleLabel } from '@/hooks/useAuth';
import { MobileDrawer } from '@/components/layout/Sidebar';
import { type ActiveMenu } from '@/components/ui/Dashboard';

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

      {/* Baris 1: Hamburger KIRI + Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16 }}>
        {/* Hamburger button — pojok kiri */}
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

        {/* Brand: logo + nama aplikasi */}
        <div
          onClick={() => onOpenLogoModal('header-logo')}
          style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', flex: 1 }}
        >
          {logos['header-logo']
            ? <img src={logos['header-logo']} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.7)' }} alt="logo" />
            : <img src="/logo.png" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.7)' }} alt="logo sekolah" />
          }
          <div>
            <div style={{ fontSize: 17, fontWeight: 900, color: '#fff' }}>
              SMANSASIH <span style={{ background: 'var(--yellow)', color: 'var(--teal)', padding: '1px 7px', borderRadius: 7, fontSize: 12 }}>SMART</span>
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: 600, letterSpacing: '.8px', textTransform: 'uppercase' }}>Aplikasi Edukasi Terintegrasi</div>
          </div>
        </div>
      </div>

      {/* Baris 2: Avatar + nama pengguna + action buttons */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{user.avatar}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>Hello, {user.name}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>{getRoleLabel(user.role)}</div>
          </div>
        </div>

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
            cursor: 'pointer', border: 'none', backdropFilter: 'blur(6px)', padding: 0,
          }}>
            <img src="/icon_logout.png" style={{ width: 22, height: 22, objectFit: 'contain' }} alt="logout" />
          </button>
        </div>
      </div>
    </div>
  );
}

interface BottomNavProps {
  onOpenAddApp: () => void;
  canManage: boolean;
  onOpenDrawer: () => void;
  onFocusSearch: () => void;
  onToggleDark: () => void;
  isDark: boolean;
}

export function BottomNav({ onOpenAddApp, canManage, onOpenDrawer, onFocusSearch, onToggleDark, isDark }: BottomNavProps) {
  const WA_URL = "https://wa.me/6285258607252?text=Halo%21%20Selamat%20datang%20di%20layanan%20asisten%20virtual%20SMANSASIH%20SMART%2C%20Aplikasi%20Edukasi%20Terintegrasi%20SMA%20Negeri%201%20Sumberasih.%20Silakan%20sampaikan%20pertanyaan%20untuk%20mendapatkan%20informasi%20dari%20kami%20dengan%20mengirimkan%20pesan%20ini.%20Terima%20Kasih.";
  const items = [
    { icon: '🏠', label: 'Beranda', onClick: undefined, isHome: true },
    { icon: 'search', label: 'Cari', onClick: onFocusSearch, isSearch: true },
    ...(canManage ? [{ icon: '+', label: 'Tambah', onClick: onOpenAddApp, isAdd: true }] : []),
    { icon: 'wa', label: 'Admin', onClick: () => window.open(WA_URL, '_blank'), isWa: true },
    { icon: 'theme', label: 'Tema', onClick: onToggleDark, isTheme: true },
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
            width: item.isAdd ? 36 : 22,
            height: item.isAdd ? 36 : 22,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: item.isAdd ? 'var(--yellow-dark)' : 'inherit',
          }}>
            {item.isWa ? (
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M16 2C8.268 2 2 8.268 2 16c0 2.425.638 4.7 1.756 6.672L2 30l7.528-1.724A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2z" fill="#25D366"/>
                <path d="M22.003 19.178c-.306-.153-1.812-.894-2.092-.996-.28-.102-.484-.153-.687.153-.203.306-.789.996-.967 1.2-.178.204-.356.23-.662.077-1.812-.906-3-1.608-4.193-3.647-.317-.544.317-.506.908-1.684.102-.204.05-.382-.026-.535-.077-.153-.687-1.657-.94-2.269-.248-.596-.5-.514-.688-.524-.178-.009-.382-.01-.586-.01-.204 0-.535.076-.815.382-.28.306-1.07 1.046-1.07 2.55 0 1.505 1.096 2.959 1.249 3.163.153.204 2.155 3.29 5.224 4.618 1.94.838 2.7.91 3.67.766.59-.088 1.812-.74 2.067-1.456.255-.715.255-1.328.178-1.456-.076-.128-.28-.204-.586-.357z" fill="white"/>
              </svg>
            ) : item.isSearch ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="7" fill="#3B82F6" opacity="0.15"/>
                <circle cx="11" cy="11" r="7" stroke="#3B82F6" strokeWidth="2.5"/>
                <line x1="20" y1="20" x2="15.5" y2="15.5" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            ) : item.isTheme ? (
              isDark ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="5" fill="#F5A800" opacity="0.25"/>
                  <circle cx="12" cy="12" r="5" stroke="#F5A800" strokeWidth="2"/>
                  <line x1="12" y1="1" x2="12" y2="3" stroke="#F5A800" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="12" y1="21" x2="12" y2="23" stroke="#F5A800" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="#F5A800" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="#F5A800" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="1" y1="12" x2="3" y2="12" stroke="#F5A800" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="21" y1="12" x2="23" y2="12" stroke="#F5A800" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="#F5A800" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="#F5A800" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="#6366F1" opacity="0.2"/>
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )
            ) : item.icon}
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
  onOpenImport: () => void;
  onOpenAnnouncements: () => void;
  onSetMenu: (menu: ActiveMenu) => void;
  activeMenu: ActiveMenu;
  onToggleEditMode: () => void;
  onOpenLogoModal: (target: 'header-logo') => void;
  onLogout: () => void;
}

export function MobileLayout({
  logos, user, canManage, searchQuery,
  onSearch, onOpenAddApp, onOpenImport, onOpenAnnouncements, onSetMenu, activeMenu, onToggleEditMode, onOpenLogoModal, onLogout
}: MobileLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
  }, [isDark]);

  function focusSearch() {
    searchRef.current?.focus();
    searchRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

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

      {/* Search bar — muncul hanya saat fokus dari bottom nav */}
      <div className="search-float-mob" style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'var(--bg)', border: '1.5px solid var(--border)',
        borderRadius: 12, padding: '10px 14px', margin: '8px 16px',
      }}>
        <span style={{ fontSize: 17, color: 'var(--yellow)' }}>🔍</span>
        <input
          ref={searchRef}
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
        onFocusSearch={focusSearch}
        onToggleDark={() => setIsDark(v => !v)}
        isDark={isDark}
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
        onOpenImport={onOpenImport}
        onOpenAnnouncements={onOpenAnnouncements}
        onSetMenu={onSetMenu}
        activeMenu={activeMenu}
        onToggleEditMode={onToggleEditMode}
        onLogout={onLogout}
      />
    </>
  );
}