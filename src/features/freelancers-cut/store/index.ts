import { temporal } from "zundo";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { areSetsEqual } from "@/shared/utils/are-sets-equal";
import {
	createPersistentSlice,
	type PersistentSlice,
} from "./persistent-slice";
import { createSelectionSlice, type SelectionSlice } from "./selection-slice";
import {
	createSettingsSlice,
	type SettingsSlice,
} from "./settings-slice";
import { createShareSlice, type ShareSlice } from "./share-slice";

export type StoreState = PersistentSlice & SelectionSlice & ShareSlice & SettingsSlice;

export const useFreelancersCutStore = create<StoreState>()(
	temporal(
		immer((...args) => ({
			...createPersistentSlice(...args),
			...createSelectionSlice(...args),
			...createShareSlice(...args),
			...createSettingsSlice(...args),
		})),
		{
			partialize: ({ rootNode, perkLimit, unlockedNodes }) => ({
				rootNode,
				perkLimit,
				unlockedNodes,
			}),
			limit: 10,
			equality: (pastState, currentState) => {
				if (pastState.rootNode !== currentState.rootNode) {
					return false;
				}

				if (pastState.perkLimit !== currentState.perkLimit) {
					return false;
				}

				if (
					!areSetsEqual(pastState.unlockedNodes, currentState.unlockedNodes)
				) {
					return false;
				}

				return true;
			},
		},
	),
);
