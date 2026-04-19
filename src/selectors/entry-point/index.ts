import { PERK_ENTRIES } from "config/entries";
import { useEntryPointStore } from "store/entry-point";
import { PerkType } from "types";

export const selectUnlockedNodesWithType = (perkType: PerkType) =>
  useEntryPointStore((state) => {
    return Array.from(state.unlockedNodes).filter((nodeId) => {
      const node = PERK_ENTRIES[Number(nodeId)];

      if (!node) {
        console.error("could not find a perk with id " + nodeId);
        return false;
      }

      return node.perk.perkType === perkType;
    });
  });
