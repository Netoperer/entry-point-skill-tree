import { createSelector } from "reselect";
import { PERK_ENTRIES } from "../../config/entries";
import type { Perk } from "../../types";
import type { StoreState } from "../index";

const getUnlockedNodes = (state: StoreState) => state.unlockedNodes;

export const selectUnlockedPerksMap = createSelector(
	[getUnlockedNodes],
	(unlockedNodes) => {
		const map = new Map<Perk, number>();
		for (const node of unlockedNodes) {
			const entry = PERK_ENTRIES[node];
			map.set(entry.perk, (map.get(entry.perk) ?? 0) + 1);
		}
		return map;
	},
);

export const selectPerkCount = createSelector(
	[getUnlockedNodes],
	(unlockedNodes) => unlockedNodes.size,
);
