import type { StateCreator } from "zustand";
import type { StoreState } from ".";

export interface SettingsSlice {
	showNodeIds: boolean;
	setShowNodeIds: (value: boolean) => void;
	editorPinned: boolean;
	setEditorPinned: (value: boolean) => void;
}

export const createSettingsSlice: StateCreator<
	StoreState,
	[["zustand/immer", never]],
	[],
	SettingsSlice
> = (set): SettingsSlice => ({
	showNodeIds: false,
	editorPinned: true,

	setShowNodeIds: (value) =>
		set((state) => {
			state.showNodeIds = value;
		}),

	setEditorPinned: (value) =>
		set((state) => {
			state.editorPinned = value;
		}),
});
