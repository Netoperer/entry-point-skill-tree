import type { StateCreator } from "zustand";
import type { StoreState } from ".";

export interface SettingsSlice {
	editorPinned: boolean;
	setEditorPinned: (value: boolean) => void;

	showNodeIds: boolean;
	setShowNodeIds: (value: boolean) => void;
}

export const createSettingsSlice: StateCreator<
	StoreState,
	[["zustand/immer", never]],
	[],
	SettingsSlice
> = (set): SettingsSlice => ({
	editorPinned: true,
	showNodeIds: false,

	setShowNodeIds: (value) =>
		set((state) => {
			state.showNodeIds = value;
		}),

	setEditorPinned: (value) =>
		set((state) => {
			state.editorPinned = value;
		}),
});
