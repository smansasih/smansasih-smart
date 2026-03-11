'use client';

import { useState, useRef } from 'react';
import { App, IconTab } from '@/types';
import { EMOJIS } from '@/lib/constants';

interface AddAppModalProps {
  isOpen: boolean;
  defaultCat?: string;
  onClose: () => void;
  onAdd: (app: Omit<App, 'id'>) => void;
}

export function AddAppModal({ isOpen, defaultCat = '', onClose, onAdd }: AddAppModalProps) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [cat, setCat] = useState(defaultCat);
  const [iconTab, setIconTab] = useState<IconTab>('upload');
  const [selEmoji, setSelEmoji] = useState('📊');
  const [iconData, setIconData] = useState('');
  const [iconPreview, setIconPreview] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  function handleSave() {
    if (!name.trim() || !url.trim()) {
      alert('Nama dan URL wajib diisi!');
      return;
    }
    const isImage = iconTab === 'upload' && iconData;
    onAdd({
      name: name.trim(),
      url: url.trim(),
      icon: isImage ? iconData : selEmoji,
      iconType: isImage ? 'image' : 'emoji',
      cat: cat.trim() || 'Aplikasi Sekolah',
    });
    // Reset form
    setName(''); setUrl(''); setCat(''); setIconData(''); setIconPreview('');
    setIconTab('upload'); setSelEmoji('📊');
    onClose();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setIconData(result);
      setIconPreview(result);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  return (
    <div
      className="modal-overlay open"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        display: 'flex', position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
        zIndex: 9000, alignItems: 'flex-end', justifyContent: 'center',
      }}
    >
      <div className="modal-sheet" style={{
        background: '#fff', borderRadius: '26px 26px 0 0',
        padding: '20px 22px 44px', width: '100%', maxWidth: 560,
        maxHeight: '92vh', overflowY: 'auto',
        animation: 'slideUp .3s cubic-bezier(.4,0,.2,1)',
      }}>
        {/* Handle */}
        <div style={{ width: 40, height: 4, background: '#e0e0e0', borderRadius: 2, margin: '0 auto 18px' }} />
        <h3 style={{ fontSize: 17, fontWeight: 900, marginBottom: 16, color: 'var(--text)' }}>➕ Tambah Aplikasi Baru</h3>

        {/* Nama */}
        <div style={{ marginBottom: 13 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: .5 }}>Nama Aplikasi</label>
          <input
            value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            placeholder="contoh: Sistem Absensi"
            style={{ width: '100%', background: 'var(--bg)', border: '2px solid var(--border)', borderRadius: 11, padding: '10px 13px', fontFamily: 'Nunito,sans-serif', fontSize: 14, fontWeight: 600, color: 'var(--text)', outline: 'none' }}
          />
        </div>

        {/* URL */}
        <div style={{ marginBottom: 13 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: .5 }}>Link / URL</label>
          <input
            value={url} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
            type="url" placeholder="https://..."
            style={{ width: '100%', background: 'var(--bg)', border: '2px solid var(--border)', borderRadius: 11, padding: '10px 13px', fontFamily: 'Nunito,sans-serif', fontSize: 14, fontWeight: 600, color: 'var(--text)', outline: 'none' }}
          />
        </div>

        {/* Kategori */}
        <div style={{ marginBottom: 13 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: .5 }}>Kategori</label>
          <input
            value={cat} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCat(e.target.value)}
            placeholder="contoh: Akademik, Keuangan, HR"
            style={{ width: '100%', background: 'var(--bg)', border: '2px solid var(--border)', borderRadius: 11, padding: '10px 13px', fontFamily: 'Nunito,sans-serif', fontSize: 14, fontWeight: 600, color: 'var(--text)', outline: 'none' }}
          />
        </div>

        {/* Icon Section */}
        <div style={{ marginBottom: 13 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: .5 }}>Ikon Aplikasi</label>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 8, margin: '8px 0 10px' }}>
            {(['upload', 'emoji'] as IconTab[]).map(tab => (
              <button key={tab} onClick={() => setIconTab(tab)}
                style={{
                  flex: 1, padding: '8px 10px', borderRadius: 10,
                  border: `1.5px solid ${iconTab === tab ? 'var(--yellow)' : 'var(--border)'}`,
                  background: iconTab === tab ? 'var(--yellow)' : 'transparent',
                  fontFamily: 'Nunito,sans-serif', fontSize: 12, fontWeight: 800,
                  color: iconTab === tab ? 'var(--text)' : 'var(--muted)', cursor: 'pointer',
                }}>
                {tab === 'upload' ? '📁 Upload Gambar' : '😀 Pilih Emoji'}
              </button>
            ))}
          </div>

          {/* Upload Tab */}
          {iconTab === 'upload' && (
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: `2px dashed ${iconPreview ? 'var(--yellow)' : 'var(--border)'}`,
                borderRadius: 16, padding: 20, textAlign: 'center', cursor: 'pointer',
                background: iconPreview ? 'var(--yellow-pale)' : 'var(--bg)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              }}>
              {iconPreview ? (
                <>
                  <img src={iconPreview} style={{ width: 64, height: 64, borderRadius: 14, objectFit: 'cover', boxShadow: '0 4px 12px rgba(0,0,0,.15)' }} alt="preview" />
                  <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600, marginTop: 6 }}>Klik untuk ganti</div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 32 }}>🖼️</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)' }}>Klik untuk pilih gambar</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>PNG, JPG, WebP — Disarankan 256×256px</div>
                </>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
            </div>
          )}

          {/* Emoji Tab */}
          {iconTab === 'emoji' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
              {EMOJIS.map(e => (
                <button key={e} onClick={() => setSelEmoji(e)}
                  style={{
                    width: 38, height: 38, background: selEmoji === e ? 'var(--yellow-pale)' : 'var(--bg)',
                    border: `2px solid ${selEmoji === e ? 'var(--yellow)' : 'var(--border)'}`,
                    borderRadius: 10, fontSize: 19, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                  {e}
                </button>
              ))}
            </div>
          )}
        </div>

        <button onClick={handleSave} style={{
          width: '100%', background: 'var(--yellow)', color: 'var(--text)',
          fontFamily: 'Nunito,sans-serif', fontSize: 15, fontWeight: 900,
          border: 'none', borderRadius: 13, padding: 13, cursor: 'pointer',
          marginTop: 10, boxShadow: 'var(--shadow-yellow)',
        }}>
          💾 Simpan Aplikasi
        </button>
      </div>
    </div>
  );
}