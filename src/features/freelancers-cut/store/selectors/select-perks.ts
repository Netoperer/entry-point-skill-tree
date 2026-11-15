import { createSelector } from "reselect";
import { getUnlockedPerksMap } from "../../core/specializations";
import type { StoreState } from "../index";

const getUnlockedNodes = (state: StoreState) => state.unlockedNodes;

export const selectUnlockedPerksMap = createSelector(
	[getUnlockedNodes],
	getUnlockedPerksMap,
);

export const selectPerkCount = createSelector(
	[getUnlockedNodes],
	(unlockedNodes) => unlockedNodes.size,
);
