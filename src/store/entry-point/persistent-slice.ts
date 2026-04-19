import type { StateCreator } from "zustand";
import { StarterClass } from "../../types";
import { areSetsEqual } from "../../utils/are-sets-equal";
import type { SelectionSlice } from "./selection-slice";

export interface PersistentSlice {
  unlockedNodes: Set<string>;
  starterClass: StarterClass;
  changeStarterClass: (id: StarterClass) => void;
  unlockNode: (id: string) => void;
  unlockNodes: (nodes: Array<string>) => void;
  lockNode: (id: string) => void;
  lockNodes: (nodes: Array<string>) => void;
  setUnlocked: (unlockedSet: Set<string>) => void;
}

// persistent between reloads via url not local storage
export const createPersistentSlice: StateCreator<
  PersistentSlice & SelectionSlice,
  [["zustand/immer", never]],
  [],
  PersistentSlice
> = (set): PersistentSlice => ({
  unlockedNodes: new Set<string>([StarterClass.Prodigy]),
  starterClass: StarterClass.Prodigy,

  unlockNode: (id) =>
    set((state: PersistentSlice) => {
      const next = new Set(state.unlockedNodes);
      next.add(id);
      state.unlockedNodes = next;
    }),

  unlockNodes: (nodes: Array<string>) =>
    set((state) => {
      for (const node of nodes) {
        state.unlockedNodes.add(node);
      }
    }),

  lockNode: (id) =>
    set((state: PersistentSlice) => {
      const next = new Set(state.unlockedNodes);
      next.delete(id);
      state.unlockedNodes = next;
    }),

  lockNodes: (nodes: Array<string>) =>
    set((state) => {
      for (const node of nodes) {
        state.unlockedNodes.delete(node);
      }
    }),

  setUnlocked: (unlockedSet) =>
    set((state: PersistentSlice) => {
      if (areSetsEqual(state.unlockedNodes, unlockedSet)) return;
      state.unlockedNodes = unlockedSet;
    }),

  changeStarterClass: (id) =>
    set((state) => {
      state.unlockedNodes = new Set([id]);
      state.starterClass = id;
    }),
});
