import { createSelector } from "reselect";
import { renderTreeToCanvas } from "@/features/freelancers-cut/components/export/utils";
import { imageCache } from "@/features/freelancers-cut/config/image-cache";
import type { StoreState } from "../index";

const getUnlockedNodes = (state: StoreState) => state.unlockedNodes;
const getWithBackground = (state: StoreState) => state.withBackground;
const getWithPerkNames = (state: StoreState) => state.withPerkNames;
const getIsCacheInitialized = (state: StoreState) => state.isCacheInitialized;
const getSpecialization = (state: StoreState) => state.specialization;

export const selectExportUrl = createSelector(
	[
		getUnlockedNodes,
		getWithBackground,
		getWithPerkNames,
		getIsCacheInitialized,
		getSpecialization,
	],
	// biome-ignore lint/complexity/useMaxParams: keeps selector inputs granular
	(
		unlockedNodes,
		withBackground,
		withPerkNames,
		isCacheInitialized,
		specialization,
	) => {
		if (!(isCacheInitialized && imageCache)) {
			return "";
		}

		const canvas = document.createElement("canvas");
		renderTreeToCanvas(
			canvas,
			unlockedNodes,
			withBackground,
			withPerkNames,
			imageCache,
			specialization,
		);
		return canvas.toDataURL("image/png");
	},
);
