import type { StateCreator } from "zustand";
import type { StoreState } from ".";

export interface SettingsSlice {
	editorPinned: boolean;
	setEditorPinned: (value: boolean) => void;
}

export const createSettingsSlice: StateCreator<
	StoreState,
	[["zustand/immer", never]],
	[],
	SettingsSlice
> = (set): SettingsSlice => ({
	editorPinned: true,

	setEditorPinned: (value) =>
		set((state) => {
			state.editorPinned = value;
		}),
});
