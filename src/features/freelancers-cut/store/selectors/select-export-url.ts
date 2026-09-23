import { createSelector } from "reselect";
import { renderTreeToCanvas } from "@/features/freelancers-cut/components/export/utils";
import { imageCache } from "@/features/freelancers-cut/config/image-cache";
import type { StoreState } from "../index";

const getUnlockedNodes = (state: StoreState) => state.unlockedNodes;
const getWithBackground = (state: StoreState) => state.withBackground;
const getWithMajorPerks = (state: StoreState) => state.withMajorPerks;
const getIsCacheInitialized = (state: StoreState) => state.isCacheInitialized;

export const selectExportUrl = createSelector(
	[
		getUnlockedNodes,
		getWithBackground,
		getWithMajorPerks,
		getIsCacheInitialized,
	],
	(unlockedNodes, withBackground, withMajorPerks, isCacheInitialized) => {
		if (!(isCacheInitialized && imageCache)) {
			return "";
		}

		const canvas = document.createElement("canvas");
		renderTreeToCanvas(
			canvas,
			unlockedNodes,
			withBackground,
			withMajorPerks,
			imageCache,
		);
		return canvas.toDataURL("image/png");
	},
);
