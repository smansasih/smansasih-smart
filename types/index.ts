export interface App {
  id: number;
  name: string;
  url: string;
  icon: string;
  iconType: 'emoji' | 'image';
  cat: string;
}

export interface MediaItem {
  name: string;
  icon: string;
  logo: string;
  url: string;
  desc: string;
}

export type LogoTarget = 'splash-logo' | 'mascot' | 'header-logo';

export interface LogoStore {
  'splash-logo'?: string;
  'mascot'?: string;
  'header-logo'?: string;
}

export type IconTab = 'upload' | 'emoji';

// ── Auth ──────────────────────────────────────────────
export type UserRole =
  | 'admin'
  | 'kepala_sekolah'
  | 'pendidik'
  | 'tenaga_administrasi'
  | 'siswa'
  | 'tamu';

export interface UserAccount {
  username: string;
  password: string;
  name: string;
  role: UserRole;
  avatar?: string; // emoji avatar
}

export interface AuthUser {
  name: string;
  role: UserRole;
  avatar: string;
}