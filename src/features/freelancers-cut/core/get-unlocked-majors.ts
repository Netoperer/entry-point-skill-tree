import { PERK_ENTRIES } from "@/features/freelancers-cut/config/entries";
import { PerkType, type Perk } from "@/features/freelancers-cut/types";

export function getUnlockedMajors(unlockedNodes: Iterable<string>): Map<Perk, number> {
  const map = new Map<Perk, number>();
  for (const node of unlockedNodes) {
    const entry = PERK_ENTRIES[node];
    if (entry?.perk.perkType === PerkType.Major) {
      map.set(entry.perk, (map.get(entry.perk) ?? 0) + 1);
    }
  }
  return map;
}
