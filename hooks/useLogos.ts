'use client';

import { useState, useEffect, useCallback } from 'react';
import { LogoStore, LogoTarget } from '@/types';
import { LOGO_STORAGE_KEYS } from '@/lib/constants';

export function useLogos() {
  const [logos, setLogos] = useState<LogoStore>({});

  // Load all logos from localStorage on mount
  useEffect(() => {
    const stored: LogoStore = {};
    (Object.keys(LOGO_STORAGE_KEYS) as LogoTarget[]).forEach(target => {
      const val = localStorage.getItem(LOGO_STORAGE_KEYS[target]);
      if (val) stored[target] = val;
    });
    setLogos(stored);
  }, []);

  const setLogo = useCallback((target: LogoTarget, dataUrl: string) => {
    setLogos(prev => ({ ...prev, [target]: dataUrl }));
    localStorage.setItem(LOGO_STORAGE_KEYS[target], dataUrl);
  }, []);

  const resetLogo = useCallback((target: LogoTarget) => {
    setLogos(prev => {
      const next = { ...prev };
      delete next[target];
      return next;
    });
    localStorage.removeItem(LOGO_STORAGE_KEYS[target]);
  }, []);

  return { logos, setLogo, resetLogo };
}