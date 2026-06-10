import { createSelector } from "reselect";
import type { StoreState } from "..";
import { PERK_ENTRIES } from "@/features/freelancers-cut/config/entries";
import { PerkType, type Perk } from "@/features/freelancers-cut/types";

const getUnlockedNodes = (state: StoreState) => state.unlockedNodes;

export const selectUnlockedMajorsMap = createSelector(
  [getUnlockedNodes],
  (unlockedNodes) => {
    const map = new Map<Perk, number>();
    for (const node of unlockedNodes) {
      const entry = PERK_ENTRIES[node];
      if (entry?.perk.perkType === PerkType.Major) {
        map.set(entry.perk, (map.get(entry.perk) ?? 0) + 1);
      }
    }
    return map;
  },
);

export const selectUnlockedMinorsMap = createSelector(
  [getUnlockedNodes],
  (unlockedNodes) => {
    const map = new Map<Perk, number>();
    for (const node of unlockedNodes) {
      const entry = PERK_ENTRIES[node];
      if (entry?.perk.perkType === PerkType.Minor) {
        map.set(entry.perk, (map.get(entry.perk) ?? 0) + 1);
      }
    }
    return map;
  },
);

export const selectPerkCount = createSelector(
  [getUnlockedNodes],
  (unlockedNodes) => unlockedNodes.size,
);
