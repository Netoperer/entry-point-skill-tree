import { StarterClass } from "../../types";
import { areSetsEqual } from "../../utils/are-sets-equal";

export interface TreeSlice {
  unlockedNodes: Set<string>;
  starterClass: StarterClass;
  changeStarterClass: (id: StarterClass) => void;
  unlockNode: (id: string) => void;
  lockNode: (id: string) => void;
  setUnlocked: (unlockedSet: Set<string>) => void;
}

export const createTreeSlice = (set: any): TreeSlice => ({
  unlockedNodes: new Set<string>([StarterClass.Prodigy]),
  starterClass: StarterClass.Prodigy,
  unlockNode: (id) =>
    set((state: TreeSlice) => ({
      unlockedNodes: new Set([...state.unlockedNodes, id]),
    })),
  lockNode: (id) =>
    set((state: TreeSlice) => ({
      unlockedNodes: new Set(
        [...state.unlockedNodes].filter((nodeId) => nodeId !== id),
      ),
    })),
  setUnlocked: (unlockedSet) =>
    set((state: TreeSlice) => {
      if (areSetsEqual(state.unlockedNodes, unlockedSet)) return state;
      return { unlockedNodes: unlockedSet };
    }),
  changeStarterClass: (id) =>
    set(() => ({
      starterClass: id,
      unlockedNodes: new Set([id]),
    })),
});
