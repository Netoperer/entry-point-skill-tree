import { createSelector } from "reselect";
import { EntryPointGraph } from "@/core/entry-point/graph";
import { getUnlockableNodes } from "@/core/entry-point/can-unlock-node";
import { getNodesToRemove } from "@/core/entry-point/get-nodes-to-remove";
import type { StoreState } from ".";
import { PERK_ENTRIES } from "@/config/entries";
import { PerkType, type Perk } from "@/types";
import { areSetsEqual } from "@/utils/are-sets-equal";
import type { minors } from "@/config/perks/minors";

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

export const selectUnlockedMinorPerks = createSelector(
  [getUnlockedNodes],
  (unlockedNodes) => {
    const result = new Set<string>();

    for (const node of unlockedNodes) {
      const perk = PERK_ENTRIES[node];

      if (perk.perk.perkType === PerkType.Minor) {
        result.add(node);
      }
    }

    return result;
  },
  {
    memoizeOptions: {
      resultEqualityCheck: areSetsEqual,
    },
  },
);

export const selectUnlockedMinorPerksMap = createSelector(
  [selectUnlockedMinorPerks],
  (unlockedMinorPerks) => {
    const map = new Map<Perk, number>();
    for (const minorPerk of unlockedMinorPerks) {
      const perkEntry = PERK_ENTRIES[minorPerk];
      map.set(perkEntry.perk, (map.get(perkEntry.perk) ?? 0) + 1);
    }

    return map;
  },
);

export const selectUnlockedUniquePerks = createSelector(
  [getUnlockedNodes],
  (unlockedNodes) => {
    const result = new Set<Perk>();

    for (const node of unlockedNodes) {
      const entry = PERK_ENTRIES[node];
      if (entry?.perk.perkType === PerkType.Unique) {
        result.add(entry.perk);
      }
    }

    return result;
  },
);
