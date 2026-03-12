'use client';

import { useState } from 'react';
import { Announcement } from '@/hooks/useAnnouncements';

interface AnnouncementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  announcements: Announcement[];
  canManage: boolean;
  onAdd: (data: Omit<Announcement, 'id' | 'date'>) => void;
  onUpdate: (id: number, data: Partial<Omit<Announcement, 'id'>>) => void;
  onDelete: (id: number) => void;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

const EMPTY_FORM = { title: '', body: '', pinned: false };

export function AnnouncementsModal({
  isOpen, onClose, announcements, canManage, onAdd, onUpdate, onDelete,
}: AnnouncementsModalProps) {
  const [view, setView] = useState<'list' | 'detail' | 'form'>('list');
  const [selected, setSelected] = useState<Announcement | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState<number | null>(null);

  if (!isOpen) return null;

  function openDetail(a: Announcement) {
    setSelected(a);
    setView('detail');
  }

  function openAdd() {
    setForm(EMPTY_FORM);
    setEditId(null);
    setView('form');
  }

  function openEdit(a: Announcement) {
    setForm({ title: a.title, body: a.body, pinned: a.pinned });
    setEditId(a.id);
    setView('form');
  }

  function handleSave() {
    if (!form.title.trim() || !form.body.trim()) return;
    if (editId !== null) {
      onUpdate(editId, form);
    } else {
      onAdd(form);
    }
    setView('list');
  }

  function handleDelete(id: number) {
    if (!confirm('Hapus pengumuman ini?')) return;
    onDelete(id);
    setView('list');
  }

  function goBack() {
    setView('list');
    setSelected(null);
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9500,
      background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      padding: '0',
    }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        background: '#fff', borderRadius: '22px 22px 0 0',
        width: '100%', maxWidth: 560,
        maxHeight: '88vh', display: 'flex', flexDirection: 'column',
        animation: 'slideUp .3s cubic-bezier(.4,0,.2,1)',
        boxShadow: '0 -8px 40px rgba(0,0,0,.18)',
      }}>
        {/* Handle bar */}
        <div style={{ width: 40, height: 4, borderRadius: 2, background: 'var(--border)', margin: '12px auto 0' }} />

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 20px 12px', borderBottom: '1px solid var(--border)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {view !== 'list' && (
              <button onClick={goBack} style={{
                width: 32, height: 32, borderRadius: 8, border: 'none',
                background: 'var(--bg)', cursor: 'pointer', fontSize: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>←</button>
            )}
            <span style={{ fontSize: 16, fontWeight: 900, color: 'var(--text)' }}>
              {view === 'list' ? '📢 Pengumuman' : view === 'detail' ? selected?.title : editId ? 'Edit Pengumuman' : 'Tambah Pengumuman'}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {view === 'list' && canManage && (
              <button onClick={openAdd} style={{
                background: 'var(--yellow)', border: 'none', borderRadius: 8,
                padding: '6px 12px', fontFamily: 'Nunito,sans-serif',
                fontSize: 12, fontWeight: 800, cursor: 'pointer',
                color: 'var(--text)',
              }}>+ Tambah</button>
            )}
            {view === 'detail' && canManage && selected && (
              <>
                <button onClick={() => openEdit(selected)} style={{
                  background: 'var(--bg)', border: '1.5px solid var(--border)',
                  borderRadius: 8, padding: '5px 10px',
                  fontFamily: 'Nunito,sans-serif', fontSize: 12, fontWeight: 800,
                  cursor: 'pointer', color: 'var(--text)',
                }}>✏️ Edit</button>
                <button onClick={() => handleDelete(selected.id)} style={{
                  background: 'rgba(239,68,68,0.1)', border: '1.5px solid rgba(239,68,68,0.2)',
                  borderRadius: 8, padding: '5px 10px',
                  fontFamily: 'Nunito,sans-serif', fontSize: 12, fontWeight: 800,
                  cursor: 'pointer', color: '#ef4444',
                }}>🗑️ Hapus</button>
              </>
            )}
            <button onClick={onClose} style={{
              width: 32, height: 32, borderRadius: 8, border: 'none',
              background: 'var(--bg)', cursor: 'pointer', fontSize: 16, color: 'var(--muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>✕</button>
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>

          {/* ── LIST ── */}
          {view === 'list' && (
            <>
              {announcements.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--muted)', fontWeight: 700 }}>
                  Belum ada pengumuman
                </div>
              )}
              {announcements.map(a => (
                <div key={a.id} onClick={() => openDetail(a)} style={{
                  background: a.pinned ? 'var(--yellow-pale)' : '#fff',
                  border: `1.5px solid ${a.pinned ? 'rgba(245,168,0,.3)' : 'var(--border)'}`,
                  borderRadius: 14, padding: '14px 16px', marginBottom: 10,
                  cursor: 'pointer', transition: 'box-shadow .2s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 11, flexShrink: 0,
                      background: a.pinned ? 'var(--yellow)' : 'rgba(26,107,114,.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                    }}>{a.pinned ? '📌' : '📢'}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 900, color: 'var(--text)', marginBottom: 3 }}>{a.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600,
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {a.body}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6, fontWeight: 600 }}>
                        {formatDate(a.date)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* ── DETAIL ── */}
          {view === 'detail' && selected && (
            <div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                {selected.pinned && (
                  <span style={{ background: 'var(--yellow-pale)', color: 'var(--yellow-dark)', fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 20 }}>📌 Disematkan</span>
                )}
                <span style={{ background: 'var(--bg)', color: 'var(--muted)', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>{formatDate(selected.date)}</span>
              </div>
              <p style={{ fontSize: 14, color: 'var(--text)', fontWeight: 600, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                {selected.body}
              </p>
            </div>
          )}

          {/* ── FORM ── */}
          {view === 'form' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 800, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>JUDUL</label>
                <input
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="Judul pengumuman..."
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: 10,
                    border: '1.5px solid var(--border)', fontFamily: 'Nunito,sans-serif',
                    fontSize: 14, fontWeight: 600, outline: 'none', color: 'var(--text)',
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 800, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>ISI PENGUMUMAN</label>
                <textarea
                  value={form.body}
                  onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
                  placeholder="Tulis isi pengumuman..."
                  rows={5}
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: 10,
                    border: '1.5px solid var(--border)', fontFamily: 'Nunito,sans-serif',
                    fontSize: 14, fontWeight: 600, outline: 'none', color: 'var(--text)',
                    resize: 'vertical',
                  }}
                />
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={form.pinned}
                  onChange={e => setForm(f => ({ ...f, pinned: e.target.checked }))}
                  style={{ width: 16, height: 16, accentColor: 'var(--yellow)' }}
                />
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>📌 Sematkan pengumuman ini</span>
              </label>
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <button onClick={goBack} style={{
                  flex: 1, padding: 12, background: 'var(--bg)',
                  border: '1.5px solid var(--border)', borderRadius: 12,
                  fontFamily: 'Nunito,sans-serif', fontSize: 14, fontWeight: 800,
                  color: 'var(--muted)', cursor: 'pointer',
                }}>Batal</button>
                <button onClick={handleSave} disabled={!form.title.trim() || !form.body.trim()} style={{
                  flex: 2, padding: 12, background: 'var(--yellow)', border: 'none',
                  borderRadius: 12, fontFamily: 'Nunito,sans-serif', fontSize: 14,
                  fontWeight: 800, color: 'var(--text)', cursor: 'pointer',
                  opacity: (!form.title.trim() || !form.body.trim()) ? 0.5 : 1,
                }}>
                  {editId ? 'Simpan Perubahan' : 'Tambah Pengumuman'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}