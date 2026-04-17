import type { StateCreator } from "zustand";
import { StarterClass } from "../../types";
import { areSetsEqual } from "../../utils/are-sets-equal";

export interface PersistentSlice {
  unlockedNodes: Set<string>;
  starterClass: StarterClass;
  changeStarterClass: (id: StarterClass) => void;
  unlockNode: (id: string) => void;
  lockNode: (id: string) => void;
  setUnlocked: (unlockedSet: Set<string>) => void;
}

// persistent between reloads via url not local storage
export const createPersistentSlice: StateCreator<
  PersistentSlice,
  [["zustand/immer", never]],
  [],
  PersistentSlice
> = (set): PersistentSlice => ({
  unlockedNodes: new Set<string>([StarterClass.Prodigy]),
  starterClass: StarterClass.Prodigy,

  unlockNode: (id) =>
    set((state: PersistentSlice) => {
      state.unlockedNodes.add(id);
    }),

  lockNode: (id) =>
    set((state: PersistentSlice) => {
      state.unlockedNodes.delete(id);
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
