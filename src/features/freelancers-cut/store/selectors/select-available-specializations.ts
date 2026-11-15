import { createSelector } from "reselect";
import { SPECIALIZATION_ENTRIES } from "../../config/specializations";
import { arePrerequisitesMet } from "../../core/specializations";
import { selectUnlockedPerksMap } from "./select-perks";

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
