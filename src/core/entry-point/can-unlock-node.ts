import { PERK_ENTRIES } from "@/config/entry-point/entries";
import { Perks } from "@/config/entry-point/perks";
import { PerkType, type PerkEntry } from "@/types/entry-point";

const WEAPON_MASTERIES = [
  Perks.SmgMastery,
  Perks.RifleMastery,
  Perks.PistolMastery,
  Perks.SniperMastery,
  Perks.ShotgunMastery,
  Perks.HeavyWeaponsMastery,
];

const filterNodes = (
  nodes: Set<string>,
  predicate: (element: PerkEntry) => boolean,
) => {
  return Array.from(nodes)
    .map((e) => PERK_ENTRIES[e])
    .filter(predicate);
};

export function getInvalidNodes(unlockedNodes: Set<string>): Array<string> {
  const invalidNodes: Array<string> = [];

  const hasCombatMastery =
    filterNodes(unlockedNodes, (e) => e.perk === Perks.CombatMastery).length ===
    1;

  const unlockedWeaponMasteries = Array.from(unlockedNodes).filter((id) =>
    WEAPON_MASTERIES.includes(PERK_ENTRIES[Number(id)].perk),
  );

  const maxAllowedMasteries = hasCombatMastery ? 2 : 1;

  if (unlockedWeaponMasteries.length > maxAllowedMasteries) {
    const toRemove = unlockedWeaponMasteries.slice(maxAllowedMasteries);
    invalidNodes.push(...toRemove);
  }

  return invalidNodes;
}

export default function canUnlockNode(
  unlockedNodes: Set<string>,
  perkLimit: number,
  id: string,
): boolean {
  if (unlockedNodes.size >= perkLimit) {
    return false;
  }

  const entry = PERK_ENTRIES[id];

  if (entry.perk.perkType === PerkType.Class) {
    const unlockedClasses = filterNodes(
      unlockedNodes,
      (e) => e.perk.perkType === PerkType.Class,
    );

    if (unlockedClasses.length >= 2) {
      return false;
    }
  }

  if (WEAPON_MASTERIES.includes(entry.perk)) {
    const hasCombatMastery =
      filterNodes(unlockedNodes, (e) => e.perk === Perks.CombatMastery)
        .length === 1;

    const unlockedWeaponMasteries = filterNodes(unlockedNodes, (e) =>
      WEAPON_MASTERIES.includes(e.perk),
    );

    const maxAllowedMasteries = hasCombatMastery ? 2 : 1;

    if (unlockedWeaponMasteries.length >= maxAllowedMasteries) {
      return false;
    }
  }

  return true;
}

export function getUnlockableNodes(
  unlockedNodes: Set<string>,
  perkLimit: number,
  nodesToUnlock: Array<string>,
): Array<string> {
  const currentUnlockedNodes = new Set([...unlockedNodes]);
  const result: Array<string> = [];

  for (const node of nodesToUnlock) {
    if (!canUnlockNode(currentUnlockedNodes, perkLimit, node)) {
      return result;
    }
    result.push(node);
    currentUnlockedNodes.add(node);
  }

  return result;
}
