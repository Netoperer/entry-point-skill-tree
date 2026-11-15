import { createSelector } from "reselect";
import { SPECIALIZATION_ENTRIES } from "../../config/specializations";
import type { Perk, Prerequisite } from "../../types";
import { selectUnlockedPerksMap } from "./select-perks";

function arePrerequisitesMet(
	unlockedPerksMap: Map<Perk, number>,
	prerequisites: Prerequisite[],
): boolean {
	for (const prerequisite of prerequisites) {
		if ((unlockedPerksMap.get(prerequisite.perk) ?? 0) < prerequisite.count) {
			return false;
		}
	}

	return true;
}

export const selectAvailableSpecializationIds = createSelector(
	[selectUnlockedPerksMap],
	(unlockedPerksMap): string[] => {
		const availableSpecializationIds: string[] = [];

		for (const [id, specialization] of Object.entries(SPECIALIZATION_ENTRIES)) {
			if (arePrerequisitesMet(unlockedPerksMap, specialization.prerequisites)) {
				availableSpecializationIds.push(id);
			}
		}

		return availableSpecializationIds;
	},
);
