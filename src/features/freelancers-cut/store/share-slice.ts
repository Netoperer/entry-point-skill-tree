import type { StateCreator } from "zustand";
import type { StoreState } from ".";

export interface ShareSlice {
  withBackground: boolean;
  showPreview: boolean;

  setWithBackground: (value: boolean) => void;
  setShowPreview: (value: boolean) => void;
}

export const createShareSlice: StateCreator<
  StoreState,
  [["zustand/immer", never]],
  [],
  ShareSlice
> = (set): ShareSlice => ({
  withBackground: false,
  showPreview: false,

  setWithBackground: (value) =>
    set((state) => {
      state.withBackground = value;
    }),

  setShowPreview: (value) =>
    set((state) => {
      state.showPreview = value;
    }),
});
