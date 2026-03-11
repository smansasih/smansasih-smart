'use client';

import { useState, useEffect, useCallback } from 'react';
import { App } from '@/types';
import { DEFAULT_APPS, APPS_STORAGE_KEY } from '@/lib/constants';

export function useApps() {
  const [apps, setApps] = useState<App[]>(DEFAULT_APPS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(APPS_STORAGE_KEY);
      if (stored) {
        setApps(JSON.parse(stored));
      }
    } catch {
      // fallback to default
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever apps change
  const saveApps = useCallback((newApps: App[]) => {
    setApps(newApps);
    try {
      localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(newApps));
    } catch {
      // ignore storage errors
    }
  }, []);

  const addApp = useCallback((app: Omit<App, 'id'>) => {
    const newApp: App = { ...app, id: Date.now() };
    setApps(prev => {
      const updated = [...prev, newApp];
      localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteApp = useCallback((id: number) => {
    setApps(prev => {
      const updated = prev.filter(a => a.id !== id);
      localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getCategories = useCallback(() => {
    return [...new Set(apps.map(a => a.cat))];
  }, [apps]);

  return { apps, addApp, deleteApp, getCategories, isLoaded, saveApps };
}