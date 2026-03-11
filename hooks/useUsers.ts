'use client';

import { useState, useEffect, useCallback } from 'react';
import { UserAccount, UserRole } from '@/types';
import { USERS as DEFAULT_USERS, ROLE_USERNAMES } from '@/lib/constants';

const USERS_STORAGE_KEY = 'smansasih_users_v1';

// ── Avatar otomatis berdasarkan role ──────────────────
const ROLE_AVATARS: Record<UserRole, string[]> = {
  admin:               ['🛡️'],
  kepala_sekolah:      ['👨‍💼', '👩‍💼'],
  pendidik:            ['👨‍🏫', '👩‍🏫'],
  tenaga_administrasi: ['👨‍💻', '👩‍💻'],
  siswa:               ['👦', '👧', '🧑'],
  tamu:                ['👤'],
};

function getAvatar(role: UserRole, name: string): string {
  const pool = ROLE_AVATARS[role] ?? ['👤'];
  // Deterministic berdasarkan nama agar konsisten
  const idx = name.charCodeAt(0) % pool.length;
  return pool[idx];
}

// ── Validasi role dari string CSV ────────────────────
const ROLE_ALIASES: Record<string, UserRole> = {
  admin:               'admin',
  administrator:       'admin',
  kepsek:              'kepala_sekolah',
  kepala_sekolah:      'kepala_sekolah',
  'kepala sekolah':    'kepala_sekolah',
  guru:                'pendidik',
  pendidik:            'pendidik',
  tendik:              'tenaga_administrasi',
  tata:                'tenaga_administrasi',
  tenaga_administrasi: 'tenaga_administrasi',
  'tenaga administrasi': 'tenaga_administrasi',
  siswa:               'siswa',
  murid:               'siswa',
  peserta_didik:       'siswa',
  tamu:                'tamu',
  guest:               'tamu',
};

export function parseRole(raw: string): UserRole | null {
  const key = raw.trim().toLowerCase().replace(/\s+/g, ' ');
  return ROLE_ALIASES[key] ?? null;
}

// ── Tipe hasil parse CSV ──────────────────────────────
export interface ParsedUser {
  name: string;
  role: UserRole;
  password: string;
  valid: boolean;
  error?: string;
}

// ── Parse CSV / Excel-exported CSV ───────────────────
// Format kolom: nama, role, password  (header opsional)
export function parseCSV(text: string): ParsedUser[] {
  const lines = text
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean);

  if (!lines.length) return [];

  // Deteksi apakah baris pertama adalah header
  const firstLower = lines[0].toLowerCase();
  const isHeader =
    firstLower.includes('nama') ||
    firstLower.includes('name') ||
    firstLower.includes('role') ||
    firstLower.includes('password');

  const dataLines = isHeader ? lines.slice(1) : lines;

  return dataLines.map((line, i) => {
    // Handle kutip (Excel CSV)
    const cols = line
      .split(',')
      .map(c => c.replace(/^"|"$/g, '').trim());

    if (cols.length < 3) {
      return { name: '', role: 'tamu', password: '', valid: false, error: `Baris ${i + 1}: kolom kurang dari 3` };
    }

    const [rawName, rawRole, rawPassword] = cols;

    if (!rawName) {
      return { name: '', role: 'tamu', password: '', valid: false, error: `Baris ${i + 1}: nama kosong` };
    }

    const role = parseRole(rawRole);
    if (!role) {
      return { name: rawName, role: 'tamu', password: rawPassword, valid: false, error: `Baris ${i + 1}: role "${rawRole}" tidak dikenal` };
    }

    if (!rawPassword) {
      return { name: rawName, role, password: '', valid: false, error: `Baris ${i + 1}: password kosong` };
    }

    return { name: rawName, role, password: rawPassword, valid: true };
  });
}

// ── Convert ParsedUser → UserAccount ─────────────────
export function toUserAccount(p: ParsedUser): UserAccount {
  return {
    username: ROLE_USERNAMES[p.role],
    password: p.password,
    name:     p.name,
    role:     p.role,
    avatar:   getAvatar(p.role, p.name),
  };
}

// ── Hook ──────────────────────────────────────────────
export function useUsers() {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load dari localStorage, fallback ke DEFAULT_USERS
  useEffect(() => {
    try {
      const stored = localStorage.getItem(USERS_STORAGE_KEY);
      if (stored) {
        const parsed: UserAccount[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setUsers(parsed);
          setLoaded(true);
          return;
        }
      }
    } catch { /* ignore */ }
    setUsers(DEFAULT_USERS);
    setLoaded(true);
  }, []);

  // Simpan ke localStorage setiap ada perubahan
  const save = useCallback((next: UserAccount[]) => {
    setUsers(next);
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(next));
    } catch { /* ignore */ }
  }, []);

  // Import: replace semua non-admin, pertahankan admin
  const importUsers = useCallback((incoming: UserAccount[], mode: 'replace' | 'append') => {
    setUsers(prev => {
      const admins = prev.filter(u => u.role === 'admin');
      const nonAdmins = incoming.filter(u => u.role !== 'admin');
      const next = mode === 'replace'
        ? [...admins, ...nonAdmins]
        : [...prev, ...nonAdmins];
      try {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(next));
      } catch { /* ignore */ }
      return next;
    });
  }, []);

  // Reset ke default
  const resetToDefault = useCallback(() => {
    save(DEFAULT_USERS);
  }, [save]);

  return { users, loaded, importUsers, resetToDefault };
}