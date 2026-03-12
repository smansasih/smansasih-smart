'use client';

import Image from 'next/image';
import { LogoStore } from '@/types';

interface SplashScreenProps {
  logos: LogoStore;
  onStart: () => void;
  onOpenLogoModal?: (target: 'splash-logo' | 'mascot') => void;
}

export function SplashScreen({ logos, onStart }: SplashScreenProps) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,700;0,900;1,900&display=swap');

        #splash {
          animation: splashIn .5s cubic-bezier(.4,0,.2,1) both;
        }

        @keyframes splashIn {
          from { opacity: 0; transform: scale(.98); }
          to   { opacity: 1; transform: scale(1); }
        }

        .sp-logo-wrap  { animation: spSlideDown .5s .1s cubic-bezier(.4,0,.2,1) both; }
        .sp-name       { animation: spSlideDown .5s .2s cubic-bezier(.4,0,.2,1) both; }
        .sp-sub        { animation: spSlideDown .5s .28s cubic-bezier(.4,0,.2,1) both; }
        .sp-mascot     { animation: spMascotIn .65s .15s cubic-bezier(.34,1.56,.64,1) both; }
        .sp-cta        { animation: spSlideUp .55s .25s cubic-bezier(.4,0,.2,1) both; }

        @keyframes spSlideDown {
          from { opacity: 0; transform: translateY(-14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spMascotIn {
          from { opacity: 0; transform: translateY(24px) scale(.94); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes spSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .sp-cta {
          position: relative;
          z-index: 2;
          width: 100%;
          margin-left: 0;
          flex-shrink: 0;
          background: var(--yellow, #F5A800);
          border-radius: 0;
          margin-top: 0;
          padding: clamp(24px, 5.5vh, 44px) 12% clamp(32px, 7vh, 56px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: clamp(10px, 2vh, 16px);
        }

        .sp-desc {
          font-size: clamp(11px, 2.8vw, 13px);
          font-weight: 600;
          color: rgba(26,107,114,.75);
          text-align: center;
          line-height: 1.6;
          letter-spacing: .2px;
        }

        /* Tombol lebih kecil */
        .sp-btn {
          align-self: center;
          background: #fff;
          color: var(--yellow-dark, #E09500);
          font-family: 'Nunito', sans-serif;
          font-size: clamp(12px, 2.8vw, 14px);
          font-weight: 800;
          letter-spacing: .3px;
          border: none;
          border-radius: 100px;
          padding: clamp(8px, 1.8vh, 11px) clamp(28px, 8vw, 48px);
          cursor: pointer;
          box-shadow:
            0 4px 0 rgba(0,0,0,.08),
            0 8px 24px rgba(0,0,0,.12);
          transition: transform .18s cubic-bezier(.4,0,.2,1), box-shadow .18s;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }
        .sp-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,.25) 0%, transparent 60%);
          border-radius: inherit;
          pointer-events: none;
        }
        .sp-btn:hover  {
          transform: translateY(-2px);
          box-shadow: 0 6px 0 rgba(0,0,0,.07), 0 12px 28px rgba(0,0,0,.14);
        }
        .sp-btn:active { transform: translateY(1px) scale(.98); box-shadow: 0 2px 0 rgba(0,0,0,.08); }

        /* Mascot 4x lebih besar */
        .sp-mascot-img {
          width: auto !important;
          height: 100% !important;
          max-height: min(72vh, 680px) !important;
          object-fit: contain !important;
          display: block;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,.18));
        }

        .sp-mascot-wrap {
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          flex: 1 1 0;
          min-height: 0;
          width: 100%;
          overflow: hidden;
          padding-top: clamp(6px, 1.5vh, 16px);
          padding-bottom: clamp(20px, 4vh, 40px);
        }

        .sp-mascot-wrap::after {
          content: '';
          position: absolute;
          top: -60%;
          left: -60%;
          width: 60%;
          height: 200%;
          background: linear-gradient(
            105deg,
            transparent 30%,
            rgba(255,255,255,0.0) 40%,
            rgba(255,255,255,0.55) 50%,
            rgba(255,255,255,0.0) 60%,
            transparent 70%
          );
          transform: skewX(-15deg);
          animation: shimmerMascot 2.2s ease-out .4s both;
          pointer-events: none;
          z-index: 10;
        }

        @keyframes shimmerMascot {
          0%   { left: -60%; opacity: 1; }
          100% { left: 160%; opacity: 1; }
        }

        .sp-dots { display: flex; align-items: center; gap: 7px; }
        .sp-dot  {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(26,107,114,.25);
        }
        .sp-dot.active {
          width: 24px; border-radius: 4px;
          background: var(--teal, #1A6B72);
        }

        @media (max-height: 620px) {
          .sp-mascot-img { max-height: 42vh !important; }.sp-desc       { display: none; }
          .sp-cta        { padding: 18px 12% 28px !important; gap: 8px !important; }
        }
        @media (min-width: 480px) {
          .sp-mascot-img { max-height: min(74vh, 720px) !important; }
        }
        @media (min-width: 768px) {
          .sp-mascot-img { max-height: min(76vh, 760px) !important; }
          .sp-cta { border-radius: 0; }
        }
      `}</style>

      <div
        id="splash"
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          height: '100dvh', overflow: 'hidden',
          background: '#EFEFEF',
        }}
      >
        {/* Dekorasi lingkaran */}
        <div aria-hidden style={{
          position: 'absolute', top: '-8vw', right: '-8vw',
          width: 'clamp(120px, 32vw, 240px)', height: 'clamp(120px, 32vw, 240px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,168,0,.13) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div aria-hidden style={{
          position: 'absolute', bottom: '22%', left: '-6vw',
          width: 'clamp(80px, 22vw, 160px)', height: 'clamp(80px, 22vw, 160px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26,107,114,.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* ─── TOP SECTION ─── */}
        <div style={{
          position: 'relative', zIndex: 1,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          width: '100%', maxWidth: 500,
          flex: '1 1 0', minHeight: 0,
          padding: 'clamp(16px, 3.5vh, 32px) 24px 0',
          overflow: 'hidden',
        }}>

          {/* Logo */}
          <div
            className="sp-logo-wrap"
            style={{
              width: 'clamp(64px, 15vw, 84px)',
              height: 'clamp(64px, 15vw, 84px)',
              borderRadius: '50%',
              background: '#fff',
              boxShadow: '0 4px 24px rgba(0,0,0,.10), 0 0 0 4px rgba(245,168,0,.2)',
              flexShrink: 0,
              marginBottom: 'clamp(6px, 1.2vh, 10px)',
              position: 'relative', overflow: 'hidden',
            }}
          >
            {logos['splash-logo'] ? (
              <img
                src={logos['splash-logo']}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                alt="logo"
              />
            ) : (
              <Image
                src="/logo.png"
                alt="Logo SMANSASIH"
                fill
                sizes="84px"
                style={{ objectFit: 'cover', borderRadius: '50%' }}
                priority
              />
            )}
          </div>

          {/* SMANSASIH + SMART badge */}
          <div
            className="sp-name"
            style={{
              display: 'flex', alignItems: 'center',
              gap: 'clamp(5px, 1.2vw, 9px)',
              flexShrink: 0,
            }}
          >
            <span style={{
              fontSize: 'clamp(18px, 5vw, 26px)',
              fontWeight: 900,
              color: '#1A1A2E',
              letterSpacing: 1,
              lineHeight: 1,
            }}>SMANSASIH</span>
            <span style={{
              background: 'var(--teal, #1A6B72)',
              color: 'var(--yellow, #F5A800)',
              fontSize: 'clamp(10px, 2.4vw, 13px)',
              fontWeight: 900,
              padding: 'clamp(3px, .6vw, 5px) clamp(7px, 1.8vw, 12px)',
              borderRadius: 7,
              letterSpacing: .5,
              lineHeight: 1,
            }}>SMART</span>
          </div>

          {/* Sub tagline */}
          <div
            className="sp-sub"
            style={{
              fontSize: 'clamp(10px, 2.4vw, 13px)',
              fontWeight: 700,
              color: '#6B7280',
              letterSpacing: 'clamp(.4px, .3vw, 1.2px)',
              textTransform: 'uppercase',
              flexShrink: 0,
              marginTop: 'clamp(3px, .7vh, 6px)',
              textAlign: 'center',
              lineHeight: 1.45,
            }}
          >
            SMA NEGERI 1 SUMBERASIH
          </div>

          {/* Mascot */}
          <div className="sp-mascot sp-mascot-wrap">
            {logos['mascot'] ? (
              <img src={logos['mascot']} className="sp-mascot-img" alt="mascot" />
            ) : (
              <Image
                src="/smart_mascot.png"
                alt="Maskot SMANSASIH"
                width={680}
                height={900}
                className="sp-mascot-img"
                priority
                style={{ objectFit: 'contain' }}
              />
            )}
          </div>
        </div>

        {/* ─── BOTTOM CTA ─── */}
        <div className="sp-cta">

          <div className="sp-dots">
            <div className="sp-dot" />
            <div className="sp-dot" />
            <div className="sp-dot active" />
          </div>

          <div className="sp-desc">
            Selamat datang di Aplikasi Edukasi Terintegrasi
          </div>

          <button className="sp-btn" onClick={onStart}>
            Get Started
          </button>

        </div>
      </div>
    </>
  );
}