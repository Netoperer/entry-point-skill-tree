// export function getInvalidNodes(unlockedNodes: Set<string>): Array<string> {
//   const invalidNodes: Array<string> = [];

//   const hasCombatMastery =
//     filterNodes(unlockedNodes, (e) => e.perk === Perks.CombatMastery).length ===
//     1;

//   const unlockedWeaponMasteries = Array.from(unlockedNodes).filter((id) =>
//     WEAPON_MASTERIES.includes(PERK_ENTRIES[Number(id)].perk),
//   );

//   const maxAllowedMasteries = hasCombatMastery ? 2 : 1;

//   if (unlockedWeaponMasteries.length > maxAllowedMasteries) {
//     const toRemove = unlockedWeaponMasteries.slice(maxAllowedMasteries);
//     invalidNodes.push(...toRemove);
//   }

//   return invalidNodes;
// }

export default function canUnlockNode(
  unlockedNodes: Set<string>,
  perkLimit: number,
  id: string,
): boolean {
  if (unlockedNodes.size >= perkLimit) {
    return false;
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
