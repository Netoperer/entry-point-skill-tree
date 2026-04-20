import type { StateCreator } from "zustand";
import type { PersistentSlice } from "./persistent-slice";

export interface SelectionSlice {
  hoveredNode: string | null;

  setHoveredNode: (node: string | null) => void;
}

export const createSelectionSlice: StateCreator<
  SelectionSlice & PersistentSlice,
  [["zustand/immer", never]],
  [],
  SelectionSlice
> = (set): SelectionSlice => ({
  hoveredNode: null,

  setHoveredNode: (node) =>
    set((state) => {
      state.hoveredNode = node;
    }),
});
