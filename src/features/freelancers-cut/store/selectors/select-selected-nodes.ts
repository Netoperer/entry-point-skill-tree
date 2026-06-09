import { createSelector } from "reselect";
import type { StoreState } from "..";
import { FreelancersCutGraph } from "@/features/freelancers-cut/core/graph";
import { getNodesToRemove } from "@/features/freelancers-cut/core/get-nodes-to-remove";
import { getUnlockableNodes } from "@/features/freelancers-cut/core/can-unlock-node";

const getHoveredNode = (state: StoreState) => state.hoveredNode;
const getUnlockedNodes = (state: StoreState) => state.unlockedNodes;
const getRootNode = (state: StoreState) => state.rootNode;
const getPerkLimit = (state: StoreState) => state.perkLimit;

export const selectSelectedNodes = createSelector(
  [getHoveredNode, getUnlockedNodes, getRootNode, getPerkLimit],
  (hoveredNode, unlockedNodes, starterClass, perkLimit) => {
    if (!hoveredNode || hoveredNode === starterClass) {
      return new Set<string>();
    }

    const isLocked = !unlockedNodes.has(hoveredNode);

    if (isLocked) {
      const path = FreelancersCutGraph.pathToClosestUnlocked(
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
