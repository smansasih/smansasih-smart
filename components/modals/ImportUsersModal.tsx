'use client';

import { useState, useRef, useCallback } from 'react';
import { UserAccount, UserRole } from '@/types';
import { getRoleLabel } from '@/hooks/useAuth';
import { parseCSV, toUserAccount, type ParsedUser } from '@/hooks/useUsers';

interface ImportUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (users: UserAccount[], mode: 'replace' | 'append') => void;
}

const ROLE_COLORS: Record<UserRole, { bg: string; text: string }> = {
  admin:               { bg: '#fef2f2', text: '#ef4444' },
  kepala_sekolah:      { bg: '#eff6ff', text: '#3b82f6' },
  pendidik:            { bg: '#f0fdf4', text: '#16a34a' },
  tenaga_administrasi: { bg: '#faf5ff', text: '#9333ea' },
  siswa:               { bg: '#fff8e7', text: '#E09500' },
  tamu:                { bg: '#f4f6f9', text: '#6b7280' },
};

const CSV_TEMPLATE =
  'nama,role,password\n' +
  'Ahmad Rizky,siswa,2026001\n' +
  'Siti Rahayu S.Pd,guru,197801012005012001\n' +
  'Dewi Lestari,tendik,199001012020032001\n' +
  'Budi Santosa,tamu,tamu\n';

export function ImportUsersModal({ isOpen, onClose, onImport }: ImportUsersModalProps) {
  const [step, setStep]           = useState<'upload' | 'preview' | 'done'>('upload');
  const [parsed, setParsed]       = useState<ParsedUser[]>([]);
  const [fileName, setFileName]   = useState('');
  const [mode, setMode]           = useState<'replace' | 'append'>('replace');
  const [dragOver, setDragOver]   = useState(false);
  const fileRef                   = useRef<HTMLInputElement>(null);

  const validUsers  = parsed.filter(p => p.valid);
  const invalidRows = parsed.filter(p => !p.valid);

  const processFile = useCallback((file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = e => {
      const text = e.target?.result as string;
      const result = parseCSV(text);
      setParsed(result);
      setStep('preview');
    };
    reader.readAsText(file, 'UTF-8');
  }, []);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = '';
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && (file.name.endsWith('.csv') || file.name.endsWith('.txt'))) {
      processFile(file);
    }
  }

  function handleConfirm() {
    const accounts = validUsers.map(toUserAccount);
    onImport(accounts, mode);
    setStep('done');
  }

  function handleClose() {
    setStep('upload');
    setParsed([]);
    setFileName('');
    setMode('replace');
    onClose();
  }

  function downloadTemplate() {
    const blob = new Blob([CSV_TEMPLATE], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'template_pengguna.csv';
    a.click(); URL.revokeObjectURL(url);
  }

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes importSlideUp {
          from { opacity:0; transform:translateY(28px) scale(.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        .imp-overlay {
          position:fixed; inset:0; z-index:9200;
          background:rgba(0,0,0,.55); backdrop-filter:blur(8px);
          display:flex; align-items:center; justify-content:center; padding:20px;
        }
        .imp-card {
          background:#fff; border-radius:24px;
          width:100%; max-width:520px; max-height:88vh;
          overflow-y:auto; overflow-x:hidden;
          animation:importSlideUp .3s cubic-bezier(.4,0,.2,1);
          box-shadow:0 24px 64px rgba(0,0,0,.2);
        }
        .imp-header {
          padding:24px 24px 0;
          display:flex; align-items:flex-start; justify-content:space-between; gap:12px;
        }
        .imp-body { padding:20px 24px 28px; }
        .imp-close {
          width:32px; height:32px; border-radius:8px; border:none; flex-shrink:0;
          background:var(--bg,#F4F6F9); cursor:pointer; font-size:16px; color:var(--muted);
          display:flex; align-items:center; justify-content:center; margin-top:2px;
        }
        .imp-dropzone {
          border:2px dashed var(--border,#E8ECF0);
          border-radius:16px; padding:32px 20px; text-align:center; cursor:pointer;
          transition:all .2s; background:var(--bg,#F4F6F9);
        }
        .imp-dropzone:hover, .imp-dropzone.dragover {
          border-color:var(--yellow,#F5A800);
          background:var(--yellow-pale,#FFF8E7);
        }
        .imp-table { width:100%; border-collapse:collapse; font-size:12px; }
        .imp-table th {
          background:var(--bg,#F4F6F9); padding:8px 10px;
          text-align:left; font-weight:800; font-size:11px;
          color:var(--muted); text-transform:uppercase; letter-spacing:.5px;
        }
        .imp-table td { padding:8px 10px; border-bottom:1px solid var(--border,#E8ECF0); }
        .imp-table tr:last-child td { border-bottom:none; }
        .imp-badge {
          display:inline-block; border-radius:20px; padding:2px 8px;
          font-size:10px; font-weight:800;
        }
        .imp-btn-primary {
          background:var(--yellow,#F5A800); color:var(--text,#1A1A2E);
          font-family:'Nunito',sans-serif; font-size:14px; font-weight:900;
          border:none; border-radius:12px; padding:11px 20px; cursor:pointer;
          box-shadow:0 6px 20px rgba(245,168,0,.28); transition:transform .15s;
          flex:1;
        }
        .imp-btn-primary:hover { transform:translateY(-1px); }
        .imp-btn-primary:disabled { opacity:.5; cursor:not-allowed; transform:none; }
        .imp-btn-secondary {
          background:var(--bg,#F4F6F9); color:var(--text,#1A1A2E);
          font-family:'Nunito',sans-serif; font-size:14px; font-weight:800;
          border:1.5px solid var(--border,#E8ECF0); border-radius:12px;
          padding:11px 20px; cursor:pointer; transition:all .15s;
        }
        .imp-btn-secondary:hover { border-color:var(--yellow,#F5A800); }
        .imp-mode-btn {
          flex:1; padding:9px 12px; border-radius:10px; cursor:pointer;
          font-family:'Nunito',sans-serif; font-size:12px; font-weight:800;
          transition:all .15s; text-align:center;
        }
      `}</style>

      <div className="imp-overlay" onClick={e => { if (e.target === e.currentTarget) handleClose(); }}>
        <div className="imp-card">

          {/* ── STEP 1: UPLOAD ── */}
          {step === 'upload' && (
            <>
              <div className="imp-header">
                <div>
                  <h3 style={{ fontSize:18, fontWeight:900, color:'var(--text)', margin:0 }}>📥 Import Pengguna</h3>
                  <p style={{ fontSize:12, color:'var(--muted)', fontWeight:600, margin:'4px 0 0' }}>Upload file CSV dengan kolom: nama, role, password</p>
                </div>
                <button className="imp-close" onClick={handleClose}>✕</button>
              </div>

              <div className="imp-body">
                {/* Dropzone */}
                <div
                  className={`imp-dropzone${dragOver ? ' dragover' : ''}`}
                  onClick={() => fileRef.current?.click()}
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                >
                  <div style={{ fontSize:40, marginBottom:10 }}>📄</div>
                  <div style={{ fontSize:15, fontWeight:900, color:'var(--text)', marginBottom:4 }}>
                    Klik atau drag file CSV di sini
                  </div>
                  <div style={{ fontSize:12, color:'var(--muted)', fontWeight:600 }}>
                    Format: .csv — Ukuran maks 5MB
                  </div>
                  <input ref={fileRef} type="file" accept=".csv,.txt" style={{ display:'none' }} onChange={handleFile} />
                </div>

                {/* Format kolom */}
                <div style={{
                  marginTop:16, padding:'14px 16px',
                  background:'var(--bg,#F4F6F9)', borderRadius:12,
                  border:'1px solid var(--border,#E8ECF0)',
                }}>
                  <div style={{ fontSize:11, fontWeight:800, color:'var(--muted)', textTransform:'uppercase', letterSpacing:.5, marginBottom:8 }}>
                    Format Kolom CSV
                  </div>
                  <code style={{ fontSize:12, color:'var(--teal,#1A6B72)', fontWeight:700, lineHeight:1.8, display:'block' }}>
                    nama, role, password<br/>
                    Ahmad Rizky, siswa, 2026001<br/>
                    Siti Rahayu S.Pd, guru, 197801012005012001
                  </code>

                  <div style={{ marginTop:12, fontSize:11, fontWeight:700, color:'var(--muted)', textTransform:'uppercase', letterSpacing:.5 }}>
                    Nilai role yang valid:
                  </div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginTop:6 }}>
                    {([
                      ['siswa', 'siswa'],
                      ['guru / pendidik', 'pendidik'],
                      ['tendik / tata', 'tenaga_administrasi'],
                      ['kepsek', 'kepala_sekolah'],
                      ['tamu', 'tamu'],
                    ] as [string, UserRole][]).map(([label, role]) => (
                      <span key={role} className="imp-badge" style={{
                        background: ROLE_COLORS[role as UserRole].bg,
                        color: ROLE_COLORS[role as UserRole].text,
                      }}>{label}</span>
                    ))}
                  </div>
                </div>

                {/* Download template */}
                <button
                  className="imp-btn-secondary"
                  onClick={downloadTemplate}
                  style={{ width:'100%', marginTop:12 }}
                >
                  ⬇️ Download Template CSV
                </button>
              </div>
            </>
          )}

          {/* ── STEP 2: PREVIEW ── */}
          {step === 'preview' && (
            <>
              <div className="imp-header">
                <div>
                  <h3 style={{ fontSize:18, fontWeight:900, color:'var(--text)', margin:0 }}>🔍 Preview Data</h3>
                  <p style={{ fontSize:12, color:'var(--muted)', fontWeight:600, margin:'4px 0 0' }}>
                    {fileName} — {parsed.length} baris ditemukan
                  </p>
                </div>
                <button className="imp-close" onClick={handleClose}>✕</button>
              </div>

              <div className="imp-body">

                {/* Ringkasan */}
                <div style={{ display:'flex', gap:10, marginBottom:16 }}>
                  <div style={{ flex:1, background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:12, padding:'12px 14px', textAlign:'center' }}>
                    <div style={{ fontSize:22, fontWeight:900, color:'#16a34a' }}>{validUsers.length}</div>
                    <div style={{ fontSize:11, fontWeight:700, color:'#16a34a' }}>✅ Siap diimpor</div>
                  </div>
                  {invalidRows.length > 0 && (
                    <div style={{ flex:1, background:'#fef2f2', border:'1px solid #fecaca', borderRadius:12, padding:'12px 14px', textAlign:'center' }}>
                      <div style={{ fontSize:22, fontWeight:900, color:'#ef4444' }}>{invalidRows.length}</div>
                      <div style={{ fontSize:11, fontWeight:700, color:'#ef4444' }}>❌ Ada error</div>
                    </div>
                  )}
                </div>

                {/* Mode import */}
                <div style={{ marginBottom:16 }}>
                  <div style={{ fontSize:11, fontWeight:800, color:'var(--muted)', textTransform:'uppercase', letterSpacing:.5, marginBottom:8 }}>
                    Mode Import
                  </div>
                  <div style={{ display:'flex', gap:8 }}>
                    {([
                      { value: 'replace', label: '🔄 Ganti Semua', desc: 'Hapus data lama, ganti dengan baru' },
                      { value: 'append',  label: '➕ Tambahkan',    desc: 'Tambah ke data yang sudah ada' },
                    ] as const).map(opt => (
                      <button
                        key={opt.value}
                        className="imp-mode-btn"
                        onClick={() => setMode(opt.value)}
                        style={{
                          border: `2px solid ${mode === opt.value ? 'var(--yellow,#F5A800)' : 'var(--border,#E8ECF0)'}`,
                          background: mode === opt.value ? 'var(--yellow-pale,#FFF8E7)' : 'transparent',
                          color: mode === opt.value ? 'var(--teal,#1A6B72)' : 'var(--muted)',
                        }}
                      >
                        <div>{opt.label}</div>
                        <div style={{ fontSize:10, fontWeight:600, marginTop:2, opacity:.8 }}>{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tabel preview valid */}
                {validUsers.length > 0 && (
                  <div style={{ borderRadius:12, overflow:'hidden', border:'1px solid var(--border,#E8ECF0)', marginBottom:12 }}>
                    <div style={{ overflowX:'auto', maxHeight:220, overflowY:'auto' }}>
                      <table className="imp-table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Nama</th>
                            <th>Role</th>
                            <th>Password</th>
                          </tr>
                        </thead>
                        <tbody>
                          {validUsers.map((u, i) => (
                            <tr key={i}>
                              <td style={{ color:'var(--muted)', fontWeight:700 }}>{i + 1}</td>
                              <td style={{ fontWeight:700 }}>{u.name}</td>
                              <td>
                                <span className="imp-badge" style={{
                                  background: ROLE_COLORS[u.role as UserRole].bg,
                                  color: ROLE_COLORS[u.role as UserRole].text,
                                }}>
                                  {getRoleLabel(u.role)}
                                </span>
                              </td>
                              <td style={{ fontFamily:'monospace', color:'var(--muted)', fontSize:11 }}>
                                {'•'.repeat(Math.min(u.password.length, 8))}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Error rows */}
                {invalidRows.length > 0 && (
                  <div style={{
                    background:'#fef2f2', border:'1px solid #fecaca',
                    borderRadius:12, padding:'12px 14px', marginBottom:12,
                  }}>
                    <div style={{ fontSize:11, fontWeight:800, color:'#ef4444', marginBottom:8, textTransform:'uppercase', letterSpacing:.5 }}>
                      ⚠️ Baris dengan error (tidak akan diimpor)
                    </div>
                    {invalidRows.map((r, i) => (
                      <div key={i} style={{ fontSize:12, color:'#ef4444', fontWeight:600, lineHeight:1.6 }}>
                        • {r.error}
                      </div>
                    ))}
                  </div>
                )}

                {/* Tombol aksi */}
                <div style={{ display:'flex', gap:10, marginTop:4 }}>
                  <button className="imp-btn-secondary" onClick={() => { setStep('upload'); setParsed([]); }}>
                    ← Kembali
                  </button>
                  <button
                    className="imp-btn-primary"
                    onClick={handleConfirm}
                    disabled={validUsers.length === 0}
                  >
                    Import {validUsers.length} Pengguna
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ── STEP 3: DONE ── */}
          {step === 'done' && (
            <div className="imp-body" style={{ textAlign:'center', padding:'48px 32px' }}>
              <div style={{ fontSize:56, marginBottom:16 }}>✅</div>
              <h3 style={{ fontSize:20, fontWeight:900, color:'var(--text)', margin:'0 0 8px' }}>
                Import Berhasil!
              </h3>
              <p style={{ fontSize:14, color:'var(--muted)', fontWeight:600, margin:'0 0 24px' }}>
                {validUsers.length} pengguna berhasil {mode === 'replace' ? 'menggantikan' : 'ditambahkan ke'} data yang ada.
              </p>
              <button className="imp-btn-primary" onClick={handleClose} style={{ maxWidth:200, margin:'0 auto' }}>
                Selesai
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}