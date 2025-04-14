
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FoodItem } from '@/types';

interface FoodStore {
  scannedFoods: FoodItem[];
  addFood: (food: FoodItem) => void;
  clearHistory: () => void;
}

export const useFoodStore = create<FoodStore>()(
  persist(
    (set) => ({
      scannedFoods: [],
      addFood: (food) => set((state) => ({ 
        scannedFoods: [food, ...state.scannedFoods] 
      })),
      clearHistory: () => set({ scannedFoods: [] }),
    }),
    {
      name: 'food-storage',
    }
  )
);
