import { SPECIALIZATION_ENTRIES } from "../config/specializations";
import type { Perk, Prerequisite } from "../types";
import { getUnlockedPerksMap } from "./utils";

export function arePrerequisitesMet(
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

export function areSpecializationPrerequisitesMet(
	specializationId: string,
	unlockedNodes: Set<string>,
): boolean {
	const specialization = SPECIALIZATION_ENTRIES[specializationId];

	if (!specialization) {
		return false;
	}

	return arePrerequisitesMet(
		getUnlockedPerksMap(unlockedNodes),
		specialization.prerequisites,
	);
}
