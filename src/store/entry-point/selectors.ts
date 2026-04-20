import { createSelector } from "reselect";
import { EntryPointGraph } from "@/core/entry-point/graph";
import { getUnlockableNodes } from "@/core/entry-point/can-unlock-node";
import { getNodesToRemove } from "@/core/entry-point/get-nodes-to-remove";
import type { SelectionSlice } from "./selection-slice";
import type { PersistentSlice } from "./persistent-slice";

type State = SelectionSlice & PersistentSlice;

const getHoveredNode = (state: State) => state.hoveredNode;
const getUnlockedNodes = (state: State) => state.unlockedNodes;
const getStarterClass = (state: State) => state.starterClass;
const getPerkLimit = (state: State) => state.perkLimit;

export const selectSelectedNodes = createSelector(
  [getHoveredNode, getUnlockedNodes, getStarterClass, getPerkLimit],
  (hoveredNode, unlockedNodes, starterClass, perkLimit) => {
    if (!hoveredNode || hoveredNode === starterClass) {
      return new Set<string>();
    }

    const isLocked = !unlockedNodes.has(hoveredNode);

    if (isLocked) {
      const path = EntryPointGraph.pathToClosestUnlocked(
        hoveredNode,
        unlockedNodes,
        perkLimit,
      );
      if (!path) {
        return new Set<string>();
      }

      const unlockableNodes = getUnlockableNodes(
        unlockedNodes,
        perkLimit,
        path,
      );

      return new Set(unlockableNodes);
    } else {
      const nodesToLock = getNodesToRemove(
        hoveredNode,
        unlockedNodes,
        starterClass,
      );
      return nodesToLock;
    }
  },
);
