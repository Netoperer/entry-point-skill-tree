import { create } from "zustand";
import { StarterClass } from "../types";
import { areSetsEqual } from "../utils/are-sets-equal";

interface TreeState {
  unlockedNodes: Set<string>;
  starterClass: StarterClass;

  changeStarterClass: (id: StarterClass) => void;
  unlockNode: (id: string) => void;
  lockNode: (id: string) => void;
  setUnlocked: (unlockedSet: Set<string>) => void;
}

export const useTreeStore = create<TreeState>()((set) => ({
  unlockedNodes: new Set<string>([StarterClass.Prodigy]),
  starterClass: StarterClass.Prodigy,

  unlockNode: (id) =>
    set((state) => ({ unlockedNodes: new Set([...state.unlockedNodes, id]) })),
  lockNode: (id) =>
    set((state) => ({
      unlockedNodes: new Set(
        [...state.unlockedNodes].filter((nodeId) => nodeId != id),
      ),
    })),
  setUnlocked: (unlockedSet) =>
    set((state) => {
      if (areSetsEqual(state.unlockedNodes, unlockedSet)) return state;

      return {
        unlockedNodes: unlockedSet,
      };
    }),
  changeStarterClass: (id) =>
    set((state) => ({
      starterClass: id,
      unlockedNodes: new Set([id]),
    })),
}));
