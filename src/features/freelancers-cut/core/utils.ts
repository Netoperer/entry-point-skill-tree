import { PERK_ENTRIES } from "../config/perks/entries";
import type { Perk } from "../types";

export function getUnlockedPerksMap(
	unlockedNodes: Set<string>,
): Map<Perk, number> {
	const map = new Map<Perk, number>();

	for (const node of unlockedNodes) {
		const entry = PERK_ENTRIES[node];

		if (!entry) {
			continue;
		}

		map.set(entry.perk, (map.get(entry.perk) ?? 0) + 1);
	}

	return map;
}
