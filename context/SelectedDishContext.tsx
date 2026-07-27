'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Dish } from '@/data/menu';

type ContextValue = { selectedDish: Dish | null; setSelectedDish: (dish: Dish | null) => void; recentlyViewed: Dish[]; addRecentlyViewed: (dish: Dish) => void };
const SelectedDishContext = createContext<ContextValue | null>(null);

export function SelectedDishProvider({ children }: { children: React.ReactNode }) {
  const [selectedDish, setSelectedDishState] = useState<Dish | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<Dish[]>([]);
  useEffect(() => {
    try {
      const selected = localStorage.getItem('flavorhub:selectedDish');
      const recent = localStorage.getItem('flavorhub:recent');
      if (selected) setSelectedDishState(JSON.parse(selected));
      if (recent) setRecentlyViewed(JSON.parse(recent));
    } catch { localStorage.removeItem('flavorhub:selectedDish'); localStorage.removeItem('flavorhub:recent'); }
  }, []);
  const setSelectedDish = (dish: Dish | null) => {
    setSelectedDishState(dish);
    if (dish) localStorage.setItem('flavorhub:selectedDish', JSON.stringify(dish)); else localStorage.removeItem('flavorhub:selectedDish');
  };
  const addRecentlyViewed = (dish: Dish) => {
    setRecentlyViewed(prev => {
      const next = [dish, ...prev.filter(item => item.id !== dish.id)].slice(0,3);
      localStorage.setItem('flavorhub:recent', JSON.stringify(next));
      return next;
    });
  };
  const value = useMemo(() => ({ selectedDish, setSelectedDish, recentlyViewed, addRecentlyViewed }), [selectedDish, recentlyViewed]);
  return <SelectedDishContext.Provider value={value}>{children}</SelectedDishContext.Provider>;
}
export function useSelectedDish() { const value = useContext(SelectedDishContext); if (!value) throw new Error('useSelectedDish must be used inside provider'); return value; }
