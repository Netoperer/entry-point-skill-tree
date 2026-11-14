import type { StateCreator } from "zustand";
import type { StoreState } from ".";

export interface ShareSlice {
	withBackground: boolean;
	withPerkNames: boolean;
	showPreview: boolean;
	isCacheInitialized: boolean;

	setWithBackground: (value: boolean) => void;
	setWithPerkNames: (value: boolean) => void;
	setShowPreview: (value: boolean) => void;
	setIsCacheInitialized: (value: boolean) => void;
}

export const createShareSlice: StateCreator<
	StoreState,
	[["zustand/immer", never]],
	[],
	ShareSlice
> = (set): ShareSlice => ({
	withBackground: true,
	withPerkNames: false,
	showPreview: true,
	isCacheInitialized: false,

	setWithBackground: (value) =>
		set((state) => {
			state.withBackground = value;
		}),

	setWithPerkNames: (value) =>
		set((state) => {
			state.withPerkNames = value;
		}),

	setShowPreview: (value) =>
		set((state) => {
			state.showPreview = value;
		}),

	setIsCacheInitialized: (value) =>
		set((state) => {
			state.isCacheInitialized = value;
		}),
});
