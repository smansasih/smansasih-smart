'use client';

import { useState } from 'react';
import { AuthUser, UserRole, UserAccount } from '@/types';
import { USERS } from '@/lib/constants';

// ── Username per role (source of truth ada di constants.ts) ──
export { ROLE_USERNAMES } from '@/lib/constants';

// ── Deskripsi password per role ───────────────────────
export const PASSWORD_HINT: Record<string, string> = {
  admin:  'Kode admin',
  kepsek: 'NIP Kepala Sekolah',
  guru:   'NIP Anda',
  tendik:   'NIP / NRK Anda',
  siswa:  'NISN Anda',
  tamu:   'Kode akses tamu',
};

// ── Permission helpers ────────────────────────────────
export function canEdit(role: UserRole): boolean {
  return role === 'admin';
}

export function canManage(role: UserRole): boolean {
  return role === 'admin';
}

export function getRoleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    admin:               'Administrator',
    kepala_sekolah:      'Kepala Sekolah',
    pendidik:            'Pendidik',
    tenaga_administrasi: 'Tenaga Administrasi',
    siswa:               'Siswa',
    tamu:                'Tamu',
  };
  return labels[role];
}

// ── Hook ──────────────────────────────────────────────
export function useAuth(users: UserAccount[] = USERS) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function login(username: string, password: string): boolean {
    setLoading(true);
    setError('');

    const normalizedUsername = username.trim().toLowerCase();
    const trimmedPassword    = password.trim();

    // Cari user: username (role-based) + password (nomor identitas) harus cocok keduanya
    const found = users.find(
      (u: UserAccount) =>
        u.username.toLowerCase() === normalizedUsername &&
        u.password === trimmedPassword
    );

    if (found) {
      setUser({
        name:   found.name,
        role:   found.role,
        avatar: found.avatar ?? '👤',
      });
      setLoading(false);
      return true;
    }

    // Pesan error yang informatif sesuai kondisi
    const usernameExists = users.some(
      (u: UserAccount) => u.username.toLowerCase() === normalizedUsername
    );

    if (!usernameExists) {
      setError('Username tidak ditemukan. Gunakan: admin / kepsek / guru / tendik / siswa / tamu');
    } else {
      setError('Password salah. Masukkan nomor identitas Anda (NISN / NIP / NRK).');
    }

    setLoading(false);
    return false;
  }

  function logout() {
    setUser(null);
    setError('');
  }

  return { user, error, loading, login, logout, setError };
}