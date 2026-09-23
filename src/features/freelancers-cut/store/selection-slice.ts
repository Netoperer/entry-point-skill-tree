import type { StateCreator } from "zustand";
import type { Perk } from "../types";
import type { StoreState } from ".";

export interface SelectionSlice {
	hoveredNode: string | null;
	selectedPerk: Perk | null;
	highlightedPerks: Set<Perk>;

	setHoveredNode: (node: string | null) => void;
	setSelectedPerk: (Perk: Perk | null) => void;

	addHighlightedPerk: (perk: Perk) => void;
	removeHighlightedPerk: (perk: Perk) => void;
}

export const createSelectionSlice: StateCreator<
	StoreState,
	[["zustand/immer", never]],
	[],
	SelectionSlice
> = (set): SelectionSlice => ({
	hoveredNode: null,
	selectedPerk: null,
	highlightedPerks: new Set(),

	setHoveredNode: (node) =>
		set((state) => {
			state.hoveredNode = node;
		}),

	setSelectedPerk: (perk) =>
		set((state) => {
			state.selectedPerk = perk;
		}),

	addHighlightedPerk: (perk) =>
		set((state) => {
			state.highlightedPerks.add(perk);
		}),

	removeHighlightedPerk: (perk) =>
		set((state) => {
			state.highlightedPerks.delete(perk);
		}),
});
