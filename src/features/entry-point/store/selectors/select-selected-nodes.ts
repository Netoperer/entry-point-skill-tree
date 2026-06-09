import { createSelector } from "reselect";
import type { StoreState } from "..";
import { EntryPointGraph } from "@/features/entry-point/core/graph";
import { getUnlockableNodes } from "@/features/entry-point/core/can-unlock-node";
import { getNodesToRemove } from "@/features/entry-point/core/get-nodes-to-remove";

const getHoveredNode = (state: StoreState) => state.hoveredNode;
const getUnlockedNodes = (state: StoreState) => state.unlockedNodes;
const getStarterClass = (state: StoreState) => state.starterClass;
const getPerkLimit = (state: StoreState) => state.perkLimit;

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
