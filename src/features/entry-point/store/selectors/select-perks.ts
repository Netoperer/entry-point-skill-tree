import { PERK_ENTRIES } from "@/features/entry-point/config/entries";
import { PerkType, type Perk } from "@/features/entry-point/types";
import { areSetsEqual } from "@/shared/utils/are-sets-equal";
import { createSelector } from "reselect";
import type { StoreState } from "..";

const getUnlockedNodes = (state: StoreState) => state.unlockedNodes;

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

export const selectUnlockedClassPerks = createSelector(
  [getUnlockedNodes],
  (unlockedNodes) => {
    const result = new Set<Perk>();

    for (const node of unlockedNodes) {
      const entry = PERK_ENTRIES[node];
      if (entry?.perk.perkType === PerkType.Class) {
        result.add(entry.perk);
      }
    }

    return result;
  },
);

export const selectUnlockedWeaponMasteries = createSelector(
  [getUnlockedNodes],
  (unlockedNodes) => {
    const result = new Set<Perk>();

    for (const node of unlockedNodes) {
      const entry = PERK_ENTRIES[node];
      if (entry?.perk.perkType === PerkType.WeaponMastery) {
        result.add(entry.perk);
      }
    }

    return result;
  },
);
