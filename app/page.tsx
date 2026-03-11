'use client';

import { useState } from 'react';
import { App, LogoStore } from '@/types';
import { DEFAULT_APPS, LOGO_STORAGE_KEYS, APPS_STORAGE_KEY } from '@/lib/constants';
import { useAuth, canEdit, canManage } from '@/hooks/useAuth';
import { useUsers } from '@/hooks/useUsers';

import { SplashScreen }  from '@/components/ui/SplashScreen';
import { Dashboard }     from '@/components/ui/Dashboard';
import { Sidebar }       from '@/components/layout/Sidebar';
import { Topbar }        from '@/components/layout/Topbar';
import { MobileLayout }  from '@/components/layout/MobileLayout';
import { AddAppModal }   from '@/components/modals/AddAppModal';
import { LogoutModal }   from '@/components/modals/LogoutModal';
import { LoginModal }        from '@/components/modals/LoginModal';
import { ImportUsersModal }  from '@/components/modals/ImportUsersModal';

// ── helpers ──────────────────────────────────────────
function loadApps(): App[] {
  if (typeof window === 'undefined') return DEFAULT_APPS;
  try {
    const stored = localStorage.getItem(APPS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_APPS;
  } catch { return DEFAULT_APPS; }
}

function saveApps(apps: App[]) {
  if (typeof window !== 'undefined')
    localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(apps));
}

function loadLogos(): LogoStore {
  if (typeof window === 'undefined') return {};
  const store: LogoStore = {};
  (Object.entries(LOGO_STORAGE_KEYS) as [keyof LogoStore, string][]).forEach(([key, storageKey]) => {
    const val = localStorage.getItem(storageKey);
    if (val) store[key] = val;
  });
  return store;
}

function saveLogoToStorage(target: keyof LogoStore, data: string) {
  if (typeof window !== 'undefined')
    localStorage.setItem(LOGO_STORAGE_KEYS[target], data);
}

// ── Component ─────────────────────────────────────────
export default function Home() {
  // ── Screen state ──
  const [screen, setScreen] = useState<'splash' | 'login' | 'app'>('splash');

  // ── Users (dinamis, dari localStorage / import CSV) ──
  const { users, importUsers } = useUsers();

  // ── Auth ──
  const { user, error: authError, loading: authLoading, login, logout, setError } = useAuth(users);

  // ── App data ──
  const [apps, setApps]           = useState<App[]>(() => loadApps());
  const [logos, setLogos]         = useState<LogoStore>(() => loadLogos());
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // ── Modal state ──
  const [showAddApp,  setShowAddApp]  = useState(false);
  const [showLogout,  setShowLogout]  = useState(false);
  const [showImport,  setShowImport]  = useState(false);
  const [addAppCat,   setAddAppCat]   = useState('');

  // ── Logo modal ──
  const [logoModal, setLogoModal] = useState<{ open: boolean; target: keyof LogoStore }>({
    open: false, target: 'splash-logo',
  });

  // ── Handlers ──────────────────────────────────────
  function handleGetStarted() {
    setScreen('login');
  }

  function handleLogin(username: string, password: string) {
    const ok = login(username, password);
    if (ok) setScreen('app');
  }

  function handleLogoutConfirm() {
    logout();
    setShowLogout(false);
    setIsEditMode(false);
    setScreen('splash');
  }

  function handleDeleteApp(id: number) {
    const updated = apps.filter(a => a.id !== id);
    setApps(updated);
    saveApps(updated);
  }

  function handleAddApp(app: Omit<App, 'id'>) {
    const updated = [...apps, { ...app, id: Date.now() }];
    setApps(updated);
    saveApps(updated);
  }

  function handleOpenImport() {
    setShowImport(true);
  }

  function handleOpenAddApp(cat = '') {
    setAddAppCat(cat);
    setShowAddApp(true);
  }

  function handleLogoUpload(target: keyof LogoStore, data: string) {
    setLogos(prev => ({ ...prev, [target]: data }));
    saveLogoToStorage(target, data);
  }

  function openLogoModal(target: keyof LogoStore) {
    setLogoModal({ open: true, target });
  }

  // ── Render ────────────────────────────────────────
  return (
    <>
      {/* ── SPLASH ── */}
      {screen === 'splash' && (
        <SplashScreen
          logos={logos}
          onStart={handleGetStarted}
          onOpenLogoModal={openLogoModal}
        />
      )}

      {/* ── LOGIN MODAL (shown over splash bg) ── */}
      {screen === 'login' && (
        <>
          {/* Blur background behind modal */}
          <div style={{
            position: 'fixed', inset: 0, zIndex: 9000,
            background: 'linear-gradient(170deg, #f5f5f5 0%, #eaeaea 100%)',
          }} />
          <LoginModal
            isOpen={true}
            error={authError}
            loading={authLoading}
            onLogin={handleLogin}
            onClearError={() => setError('')}
          />
        </>
      )}

      {/* ── MAIN APP ── */}
      {screen === 'app' && user && (
        <div style={{ minHeight: '100vh' }}>

          {/* Sidebar — hanya tampil tombol Pengelolaan untuk admin */}
          <Sidebar
            logos={logos}
            user={user}
            canManage={canManage(user.role)}
            onOpenAddApp={() => handleOpenAddApp()}
            onOpenImport={handleOpenImport}
            onToggleEditMode={() => setIsEditMode(v => !v)}
            onOpenLogoModal={openLogoModal}
            onLogout={() => setShowLogout(true)}
          />

          {/* Topbar — sembunyikan tombol tambah & edit untuk non-admin */}
          <Topbar
            logos={logos}
            user={user}
            canManage={canManage(user.role)}
            onSearch={v => setSearchQuery(v.toLowerCase())}
            onOpenAddApp={() => handleOpenAddApp()}
            onToggleEditMode={() => setIsEditMode(v => !v)}
            onOpenLogoModal={openLogoModal}
            onLogout={() => setShowLogout(true)}
          />

          {/* Mobile header */}
          <MobileLayout
            logos={logos}
            user={user}
            canManage={canManage(user.role)}
            searchQuery={searchQuery}
            onSearch={v => setSearchQuery(v.toLowerCase())}
            onOpenAddApp={() => handleOpenAddApp()}
            onToggleEditMode={() => setIsEditMode(v => !v)}
            onOpenLogoModal={openLogoModal}
            onLogout={() => setShowLogout(true)}
          />

          {/* Dashboard */}
          <div className="main-wrap">
            <div className="content-area">
              <Dashboard
                apps={apps}
                isEditMode={isEditMode && canEdit(user.role)}
                searchQuery={searchQuery}
                onDeleteApp={handleDeleteApp}
                onOpenAddApp={canManage(user.role) ? handleOpenAddApp : () => {}}
                canManage={canManage(user.role)}
              />
            </div>
          </div>

          {/* Add App Modal — hanya admin */}
          {canManage(user.role) && (
            <AddAppModal
              isOpen={showAddApp}
              defaultCat={addAppCat}
              onClose={() => setShowAddApp(false)}
              onAdd={handleAddApp}
            />
          )}

          {/* Import Users Modal — hanya admin */}
          {canManage(user.role) && (
            <ImportUsersModal
              isOpen={showImport}
              onClose={() => setShowImport(false)}
              onImport={importUsers}
            />
          )}

          {/* Logout Modal */}
          <LogoutModal
            isOpen={showLogout}
            onClose={() => setShowLogout(false)}
            onConfirm={handleLogoutConfirm}
          />
        </div>
      )}
    </>
  );
}