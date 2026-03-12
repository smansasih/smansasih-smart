'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'smansasih_announcements_v1';

export interface Announcement {
  id: number;
  title: string;
  body: string;
  date: string;   // ISO string
  pinned: boolean;
}

const DEFAULT_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: 'Jadwal Ujian Semester Genap 2024/2025',
    body: 'Ujian Akhir Semester Genap akan dilaksanakan pada tanggal 10–20 Juni 2025. Seluruh siswa diharapkan mempersiapkan diri dengan baik. Jadwal lengkap tersedia di papan pengumuman sekolah.',
    date: new Date().toISOString(),
    pinned: true,
  },
  {
    id: 2,
    title: 'Libur Idul Adha 1446 H',
    body: 'Sekolah diliburkan pada tanggal 6–7 Juni 2025 dalam rangka Hari Raya Idul Adha 1446 H. Kegiatan belajar mengajar kembali normal pada tanggal 9 Juni 2025.',
    date: new Date(Date.now() - 86400000).toISOString(),
    pinned: false,
  },
];

export function useAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Announcement[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAnnouncements(parsed);
          return;
        }
      }
    } catch { /* ignore */ }
    setAnnouncements(DEFAULT_ANNOUNCEMENTS);
  }, []);

  const save = useCallback((next: Announcement[]) => {
    setAnnouncements(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  }, []);

  const addAnnouncement = useCallback((data: Omit<Announcement, 'id' | 'date'>) => {
    setAnnouncements(prev => {
      const next = [{ ...data, id: Date.now(), date: new Date().toISOString() }, ...prev];
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const updateAnnouncement = useCallback((id: number, data: Partial<Omit<Announcement, 'id'>>) => {
    setAnnouncements(prev => {
      const next = prev.map(a => a.id === id ? { ...a, ...data } : a);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const deleteAnnouncement = useCallback((id: number) => {
    setAnnouncements(prev => {
      const next = prev.filter(a => a.id !== id);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  // Sorted: pinned first, then by date desc
  const sorted = [...announcements].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return { announcements: sorted, addAnnouncement, updateAnnouncement, deleteAnnouncement };
}