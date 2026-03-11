'use client';

import { App } from '@/types';
import { MEDIA_ITEMS } from '@/lib/constants';

interface DashboardProps {
  apps: App[];
  isEditMode: boolean;
  searchQuery: string;
  canManage: boolean;
  onDeleteApp: (id: number) => void;
  onOpenAddApp: (cat?: string) => void;
}

export function Dashboard({ apps, isEditMode, searchQuery, canManage, onDeleteApp, onOpenAddApp }: DashboardProps) {
  const filtered = searchQuery
    ? apps.filter(a =>
        a.name.toLowerCase().includes(searchQuery) ||
        a.cat.toLowerCase().includes(searchQuery)
      )
    : apps;

  const categories = [...new Set(apps.map(a => a.cat))];
  const showNoResults = filtered.length === 0 && searchQuery !== '';

  return (
    <div>
      {/* Stats Row */}
      <div className="stats-row" style={{
        display: 'none', gap: 12, marginBottom: 20,
      }}>
        {[
          { icon: '📱', iconBg: 'var(--yellow-pale)', num: apps.length, label: 'Total Aplikasi' },
          { icon: '👥', iconBg: 'rgba(26,107,114,.1)', num: 487, label: 'Pengguna Aktif' },
          { icon: '📂', iconBg: '#fff0f0', num: new Set(apps.map(a => a.cat)).size, label: 'Kategori' },
          { icon: '🌐', iconBg: '#f0f4ff', num: 4, label: 'Media Sekolah' },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, background: '#fff', borderRadius: 'var(--radius-sm)',
            padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
            boxShadow: 'var(--shadow)', border: '1px solid var(--border)',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, background: s.iconBg,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0,
            }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)' }}>{s.num}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {showNoResults && (
        <div style={{
          textAlign: 'center', padding: '40px 20px', fontSize: 16,
          color: 'var(--muted)', fontWeight: 700,
        }}>
          😕 Aplikasi tidak ditemukan
        </div>
      )}

      {/* App categories */}
      {categories.map(cat => {
        const list = searchQuery ? filtered.filter(a => a.cat === cat) : apps.filter(a => a.cat === cat);
        if (!list.length) return null;

        return (
          <div key={cat} style={{ marginBottom: 28 }}>
            {/* Section header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <span className="sec-title" style={{ fontSize: 15, fontWeight: 900, color: 'var(--text)' }}>{cat}</span>
              <button style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', gap: 3, padding: 4,
              }}>
                {[0,1,2].map(i => <span key={i} style={{ display: 'block', width: 4, height: 4, borderRadius: '50%', background: 'var(--muted)' }} />)}
              </button>
            </div>

            {/* App grid */}
            <div className="app-grid" style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12,
            }}>
              {list.map((app, i) => (
                <a
                  key={app.id}
                  href={isEditMode ? undefined : app.url}
                  target={isEditMode ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (isEditMode) {
                      e.preventDefault();
                    }
                  }}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                    cursor: 'pointer', textDecoration: 'none',
                    animation: `appIn .4s cubic-bezier(.4,0,.2,1) both`,
                    animationDelay: `${i * 0.04}s`,
                  }}>
                  <div
                    className="app-icon-box"
                    onClick={(e) => {
                      if (isEditMode) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (confirm('Hapus aplikasi ini?')) {
                          onDeleteApp(app.id);
                        }
                      }
                    }}
                    style={{
                      width: 60, height: 60, borderRadius: 16,
                      background: app.iconType === 'image' ? '#f5f5f5' : 'var(--yellow-pale)',
                      border: `2px solid ${isEditMode ? 'rgba(239,68,68,0.3)' : 'transparent'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 28, overflow: 'hidden', position: 'relative',
                      boxShadow: 'var(--shadow)',
                      animation: isEditMode ? 'wiggle .4s ease infinite alternate' : 'none',
                    }}>
                    {app.iconType === 'image'
                      ? <img src={app.icon} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} alt={app.name} />
                      : <span>{app.icon}</span>
                    }
                    {isEditMode && (
                      <div style={{
                        position: 'absolute', inset: 0, background: 'rgba(239,68,68,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 18, borderRadius: 'inherit',
                      }}>🗑️</div>
                    )}
                  </div>
                  <span className="app-label" style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)', textAlign: 'center', lineHeight: 1.3 }}>
                    {app.name}
                  </span>
                </a>
              ))}

              {/* Add button — hanya admin */}
              {canManage && (
                <div
                  onClick={() => onOpenAddApp(cat)}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer',
                  }}>
                  <div style={{
                    width: 60, height: 60, borderRadius: 16,
                    background: 'var(--bg)', border: '2px dashed var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 24, fontWeight: 900, color: 'var(--yellow-dark)',
                  }}>+</div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Tambah</span>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Media Sekolah (only when not searching) */}
      {!searchQuery && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span className="sec-title" style={{ fontSize: 15, fontWeight: 900, color: 'var(--text)' }}>Media Sekolah</span>
          </div>
          <div className="app-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12,
          }}>
            {MEDIA_ITEMS.map((m, i) => (
              <a
                key={m.name}
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  textDecoration: 'none', color: 'inherit',
                  animation: `appIn .4s cubic-bezier(.4,0,.2,1) both`,
                  animationDelay: `${i * 0.04}s`,
                }}>
                <div style={{
                  width: 60, height: 60, borderRadius: 16,
                  background: '#f5f5f5',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden', flexShrink: 0,
                  boxShadow: 'var(--shadow)',
                }}>
                  <img
                    src={m.logo}
                    alt={m.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
                  />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)', textAlign: 'center', lineHeight: 1.3 }}>
                  {m.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Announcement */}
      {!searchQuery && (
        <div style={{
          background: 'linear-gradient(135deg, var(--yellow-pale) 0%, #fff 100%)',
          border: '1.5px solid rgba(245,168,0,0.25)',
          borderRadius: 'var(--radius)', padding: '16px 18px',
          display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14, background: 'var(--yellow)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0,
          }}>📢</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 900, color: 'var(--text)', marginBottom: 3 }}>Pengumuman Sekolah</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>Jadwal ujian semester &amp; kegiatan terbaru</div>
          </div>
        </div>
      )}
    </div>
  );
}