'use client';

import { useState } from 'react';
import { getRoleLabel, ROLE_USERNAMES } from '@/hooks/useAuth';
import { UserRole } from '@/types';

interface LoginModalProps {
  isOpen: boolean;
  error: string;
  loading: boolean;
  onLogin: (username: string, password: string) => void;
  onClearError: () => void;
}

// Daftar role yang ditampilkan sebagai chip petunjuk
const ROLE_CHIPS: { role: UserRole; icon: string }[] = [
  { role: 'admin',               icon: '🛡️' },
  { role: 'kepala_sekolah',      icon: '👨‍💼' },
  { role: 'pendidik',            icon: '👨‍🏫' },
  { role: 'tenaga_administrasi', icon: '👩‍💻' },
  { role: 'siswa',               icon: '👦' },
  { role: 'tamu',                icon: '👤' },
];

export function LoginModal({ isOpen, error, loading, onLogin, onClearError }: LoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;
    onLogin(username.trim(), password.trim());
  }

  // Klik chip → isi username otomatis
  function handleChipClick(role: UserRole) {
    setUsername(ROLE_USERNAMES[role]);
    setPassword('');
    onClearError();
  }

  return (
    <>
      <style>{`
        @keyframes loginSlideUp {
          from { opacity: 0; transform: translateY(32px) scale(.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .login-input {
          width: 100%;
          background: var(--bg, #F4F6F9);
          border: 2px solid var(--border, #E8ECF0);
          border-radius: 12px;
          padding: 11px 14px;
          font-family: 'Nunito', sans-serif;
          font-size: 14px; font-weight: 600;
          color: var(--text, #1A1A2E);
          outline: none;
          transition: border-color .2s;
          box-sizing: border-box;
        }
        .login-input:focus { border-color: var(--yellow, #F5A800); }
        .login-input::placeholder { color: var(--muted, #8A94A6); font-weight: 500; }
        .login-btn {
          width: 100%;
          background: var(--yellow, #F5A800);
          color: var(--text, #1A1A2E);
          font-family: 'Nunito', sans-serif;
          font-size: 15px; font-weight: 900;
          border: none; border-radius: 13px;
          padding: 13px; cursor: pointer;
          box-shadow: 0 6px 24px rgba(245,168,0,.28);
          transition: transform .18s, opacity .18s;
          margin-top: 4px;
        }
        .login-btn:hover:not(:disabled)  { transform: translateY(-1px); }
        .login-btn:active:not(:disabled) { transform: scale(.98); }
        .login-btn:disabled { opacity: .6; cursor: not-allowed; }
        .role-chip {
          display: inline-flex; align-items: center; gap: 4px;
          background: var(--bg, #F4F6F9);
          border: 1.5px solid var(--border, #E8ECF0);
          border-radius: 20px;
          padding: 4px 10px;
          font-size: 11px; font-weight: 800;
          cursor: pointer;
          transition: all .15s;
          color: var(--text, #1A1A2E);
        }
        .role-chip:hover {
          border-color: var(--yellow, #F5A800);
          background: var(--yellow-pale, #FFF8E7);
          color: var(--teal, #1A6B72);
        }
        .role-chip.active {
          border-color: var(--yellow, #F5A800);
          background: var(--yellow, #F5A800);
          color: var(--text, #1A1A2E);
        }
      `}</style>

      {/* Overlay */}
      <div style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
        zIndex: 9100, display: 'flex',
        alignItems: 'center', justifyContent: 'center', padding: 20,
      }}>
        <div style={{
          background: '#fff', borderRadius: 24,
          padding: '32px 28px 28px', maxWidth: 400, width: '100%',
          animation: 'loginSlideUp .3s cubic-bezier(.4,0,.2,1)',
          boxShadow: '0 24px 64px rgba(0,0,0,.18)',
          maxHeight: '90vh', overflowY: 'auto',
        }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'var(--yellow-pale, #FFF8E7)',
              border: '2px solid var(--yellow, #F5A800)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26, margin: '0 auto 12px',
            }}>🔐</div>
            <h3 style={{ fontSize: 20, fontWeight: 900, color: 'var(--text)', margin: 0 }}>
              Masuk ke SMANSASIH
            </h3>
            <p style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600, margin: '4px 0 0' }}>
              Pilih tipe akun dan masukkan password
            </p>
          </div>

          {/* Role chips — klik untuk isi username */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: .5 }}>
              Pilih Tipe Akun
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {ROLE_CHIPS.map(({ role, icon }) => (
                <button
                  key={role}
                  type="button"
                  className={`role-chip${username.toLowerCase() === ROLE_USERNAMES[role] ? ' active' : ''}`}
                  onClick={() => handleChipClick(role)}
                >
                  <span>{icon}</span>
                  {getRoleLabel(role)}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

            {/* Username — diisi otomatis dari chip, bisa juga manual */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: .5 }}>
                Username
              </label>
              <input
                className="login-input"
                type="text"
                placeholder=""
                value={username}
                onChange={e => { setUsername(e.target.value); setPassword(''); onClearError(); }}
                autoComplete="username"
              />
            </div>

            {/* Password — label berubah sesuai username */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: .5 }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  className="login-input"
                  type={showPass ? 'text' : 'password'}
                  placeholder=""
                  value={password}
                  onChange={e => { setPassword(e.target.value); onClearError(); }}
                  autoComplete="current-password"
                  style={{ paddingRight: 44 }}
                  autoFocus={!!username}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, padding: 0,
                  }}>
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background: '#fef2f2', border: '1px solid #fecaca',
                borderRadius: 10, padding: '10px 12px',
                fontSize: 13, fontWeight: 700, color: '#ef4444',
                display: 'flex', alignItems: 'flex-start', gap: 8, lineHeight: 1.4,
              }}>
                <span style={{ flexShrink: 0 }}>❌</span>
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button className="login-btn" type="submit" disabled={loading || !username.trim() || !password.trim()}>
              {loading ? '⏳ Memverifikasi...' : '🚀 Masuk'}
            </button>
          </form>

        </div>
      </div>
    </>
  );
}