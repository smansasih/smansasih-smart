import { App, MediaItem, UserAccount } from '@/types';

export const DEFAULT_APPS: App[] = [
  { id: 1,  name: 'Presensi',   url: 'https://s.id/absendigital-smansasih/',       icon: '/logo_presensi.png',    iconType: 'image', cat: 'Aplikasi Sekolah' },
  { id: 2,  name: 'Peduli',     url: 'https://pedulismansasih.com/',               icon: '/logo_peduli.png',      iconType: 'image', cat: 'Aplikasi Sekolah' },
  { id: 3,  name: 'Angajih',    url: 'https://angajih-smansasih.vercel.app/',      icon: '/logo_angajih.png',     iconType: 'image', cat: 'Aplikasi Sekolah' },
  { id: 4,  name: 'Gelis',      url: 'https://gelis-smansasih.vercel.app/',        icon: '/logo_gelis.png',       iconType: 'image', cat: 'Aplikasi Sekolah' },
  { id: 5,  name: 'Ramadhan',   url: 'https://s.id/smansasih_ramadhan/',           icon: '/logo_ramadhan.png',    iconType: 'image', cat: 'Aplikasi Sekolah' },
  { id: 6,  name: 'Arsip',      url: '#',                                          icon: '/logo_arsip.png',       iconType: 'image', cat: 'Aplikasi Sekolah' },
  { id: 7,  name: 'Kantin',     url: '#',                                          icon: '/logo_kantin.png',      iconType: 'image', cat: 'Aplikasi Sekolah' },
  { id: 8,  name: 'Artificial', url: 'https://ai-smansasih.vercel.app/',           icon: '/logo_artificial.png',  iconType: 'image', cat: 'Aplikasi Sekolah' },
  { id: 9,  name: 'Asisten',    url: 'https://asistenguru-smansasih.vercel.app/',  icon: '/logo_asisten.png',     iconType: 'image', cat: 'Aplikasi Sekolah' },
  { id: 10, name: 'Manajemen',  url: '#',                                          icon: '/logo_manajemen.png',   iconType: 'image', cat: 'Aplikasi Sekolah' },
  { id: 11, name: 'Sispena',    url: 'https://sispena-smansasih.vercel.app/',      icon: '/logo_sispena.png',     iconType: 'image', cat: 'Aplikasi Sekolah' },
  { id: 12, name: 'Kunjungan',  url: 'https://bkd-smansasih.vercel.app/',          icon: '/logo_kunjungan.png',   iconType: 'image', cat: 'Aplikasi Sekolah' },
];

export const MEDIA_ITEMS: MediaItem[] = [
  { name: 'Website',   icon: '🌐', logo: '/logo_website.png',   url: 'https://sman1sumberasih.sch.id/',               desc: 'SMA Negeri 1 Sumberasih' },
  { name: 'Youtube',   icon: '▶️', logo: '/logo_youtube.png',   url: 'https://www.youtube.com/@smanegeri1sumberasih', desc: 'Channel Resmi' },
  { name: 'Instagram', icon: '📸', logo: '/logo_instagram.png', url: 'https://www.instagram.com/smansasih_jaya/',     desc: '@smansasih' },
  { name: 'TikTok',    icon: '🎵', logo: '/logo_tiktok.png',    url: 'https://www.tiktok.com/@osis_smansasih',                                              desc: '@smansasih' },
];

export const EMOJIS = [
  '📊','💰','👥','📋','🗓️','📦','🚚','🏫','📈','💼',
  '🔧','🛒','📝','🌐','📱','🔒','📧','🎯','⚙️','📂',
  '💳','🎓','🔔','📌','🧾','🖨️','📡','🏆','📰','🔑',
  '🤖','📖',
];

export const LOGO_STORAGE_KEYS = {
  'splash-logo': 'smansasih_logo_splash',
  'mascot':      'smansasih_logo_mascot',
  'header-logo': 'smansasih_logo_header',
} as const;

export const APPS_STORAGE_KEY = 'smansasih_v3';

// ── Akun Pengguna ─────────────────────────────────────
// Sistem login:
//   username = tipe role (sama untuk semua pengguna dalam satu tipe)
//   password = nomor identitas unik masing-masing pengguna
//
// Username per role:
//   admin                → "admin"
//   kepala_sekolah       → "kepsek"
//   pendidik             → "guru"    | password = NIP
//   tenaga_administrasi  → "tendik"    | password = NIP
//   siswa                → "siswa"   | password = NISN
//   tamu                 → "tamu"    | password = kode akses


// ── Username per role (dipakai di useUsers & useAuth) ─
export const ROLE_USERNAMES: Record<string, string> = {
  admin:               'admin',
  kepala_sekolah:      'kepsek',
  pendidik:            'guru',
  tenaga_administrasi: 'tendik',
  siswa:               'siswa',
  tamu:                'tamu',
};

export const USERS: UserAccount[] = [
  // ── Admin ─────────────────────────────────────────
  { username: 'admin',  password: 'adminsmansasih',      name: 'Administrator',          role: 'admin',               avatar: '🛡️' },

  // ── Kepala Sekolah (password = NIP) ───────────────
  { username: 'kepsek', password: '197702142010011013',  name: 'Muhlas Fauzi, S.Pd., M.Pd',   role: 'kepala_sekolah',      avatar: '👨‍💼' },

  // ── Pendidik / Guru (password = NIP) ─────────────
  { username: 'guru',   password: '197702142010011013',  name: 'Budi Santoso, S.Pd',     role: 'pendidik',            avatar: '👨‍🏫' },
  { username: 'guru',   password: '196711202009022021',  name: 'Siti Rahayu, S.Pd',      role: 'pendidik',            avatar: '👩‍🏫' },
  { username: 'guru',   password: '198503052014031002',  name: 'Ahmad Firdaus, M.Pd',    role: 'pendidik',            avatar: '👨‍🏫' },

  // ── Tenaga Administrasi (password = NIP/NRK) ──────
  { username: 'tendik',   password: '198901152015032001',  name: 'Dewi Lestari',           role: 'tenaga_administrasi', avatar: '👩‍💻' },
  { username: 'tendik',   password: '199205202019031005',  name: 'Rian Hidayat',           role: 'tenaga_administrasi', avatar: '👨‍💻' },

  // ── Siswa (password = NISN) ───────────────────────
  { username: 'siswa',  password: '2026894',             name: 'Ahmad Rizky',            role: 'siswa',               avatar: '👦' },
  { username: 'siswa',  password: '2026730',             name: 'Siti Nurhaliza',         role: 'siswa',               avatar: '👧' },
  { username: 'siswa',  password: '2026541',             name: 'Bima Pratama',           role: 'siswa',               avatar: '👦' },
  { username: 'siswa',  password: '2026388',             name: 'Putri Ayu',              role: 'siswa',               avatar: '👧' },

  // ── Tamu (password = kode akses) ─────────────────
  { username: 'tamu',   password: 'tamu',                name: 'Tamu',                   role: 'tamu',                avatar: '👤' },
];