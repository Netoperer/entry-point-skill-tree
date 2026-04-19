import type { StateCreator } from "zustand";
import type { PersistentSlice } from "./persistent-slice";

export interface SelectionSlice {
  hoveredNode: string | null;

  selectedNodes: Set<string>;

  setHoveredNode: (node: string | null) => void;

  setSelectedNodes: (nodes: Set<string>) => void;
  removeSelection: () => void;
}

export const createSelectionSlice: StateCreator<
  SelectionSlice & PersistentSlice,
  [["zustand/immer", never]],
  [],
  SelectionSlice
> = (set): SelectionSlice => ({
  selectedNodes: new Set<string>([]),
  hoveredNode: null,

  setHoveredNode: (node) =>
    set((state) => {
      state.hoveredNode = node;
    }),

  setSelectedNodes: (nodes) =>
    set((state) => {
      state.selectedNodes = nodes;
    }),

  removeSelection: () =>
    set((state) => {
      state.selectedNodes = new Set();
    }),
});
