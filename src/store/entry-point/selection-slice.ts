import type { StateCreator } from "zustand";
import type { StoreState } from ".";

export interface SelectionSlice {
  hoveredNode: string | null;

  setHoveredNode: (node: string | null) => void;
}

export const createSelectionSlice: StateCreator<
  StoreState,
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
