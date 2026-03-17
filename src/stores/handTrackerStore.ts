import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TileCode } from '../types/tile';

interface HandTrackerState {
  tiles: TileCode[];
  addTile: (code: TileCode) => void;
  removeTile: (index: number) => void;
  clearHand: () => void;
}

export const useHandTrackerStore = create<HandTrackerState>()(
  persist(
    (set) => ({
      tiles: [],
      addTile: (code) =>
        set((state) => {
          if (state.tiles.length >= 14) return state;
          return { tiles: [...state.tiles, code] };
        }),
      removeTile: (index) =>
        set((state) => ({
          tiles: state.tiles.filter((_, i) => i !== index),
        })),
      clearHand: () => set({ tiles: [] }),
    }),
    {
      name: 'mahjongg-hand',
    }
  )
);
