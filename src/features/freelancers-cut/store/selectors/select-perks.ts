import { createSelector } from "reselect";
import type { StoreState } from "..";
import { getUnlockedMajors } from "@/features/freelancers-cut/core/get-unlocked-majors";
import { getUnlockedMinors } from "@/features/freelancers-cut/core/get-unlocked-minors";

const getUnlockedNodes = (state: StoreState) => state.unlockedNodes;

export const selectUnlockedMajorsMap = createSelector(
  [getUnlockedNodes],
  (unlockedNodes) => getUnlockedMajors(unlockedNodes),
);

export const selectUnlockedMinorsMap = createSelector(
  [getUnlockedNodes],
  (unlockedNodes) => getUnlockedMinors(unlockedNodes),
);

export const selectPerkCount = createSelector(
  [getUnlockedNodes],
  (unlockedNodes) => unlockedNodes.size,
);
