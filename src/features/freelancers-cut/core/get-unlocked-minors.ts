import { PERK_ENTRIES } from "@/features/freelancers-cut/config/perks/entries";
import { type Perk, PerkType } from "@/features/freelancers-cut/types";

export function getUnlockedMinors(
	unlockedNodes: Iterable<string>,
): Map<Perk, number> {
	const map = new Map<Perk, number>();
	for (const node of unlockedNodes) {
		const entry = PERK_ENTRIES[node];
		if (entry?.perk.perkType === PerkType.Minor) {
			map.set(entry.perk, (map.get(entry.perk) ?? 0) + 1);
		}
	}
	return map;
}
