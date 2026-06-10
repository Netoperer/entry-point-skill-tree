import { createSelector } from "reselect";
import type { StoreState } from "..";
import { renderTreeToCanvas } from "@/features/freelancers-cut/components/settings/export/utils";
import { IMAGE_CACHE } from "@/features/freelancers-cut/config/image-cache";

const getUnlockedNodes = (state: StoreState) => state.unlockedNodes;
const getWithBackground = (state: StoreState) => state.withBackground;
const getIsCacheInitialized = (state: StoreState) => state.isCacheInitialized;

export const selectExportUrl = createSelector(
  [getUnlockedNodes, getWithBackground, getIsCacheInitialized],
  (unlockedNodes, withBackground, isCacheInitialized) => {
    if (!isCacheInitialized || !IMAGE_CACHE) return "";

    const canvas = document.createElement("canvas");
    renderTreeToCanvas(canvas, unlockedNodes, withBackground, IMAGE_CACHE);
    return canvas.toDataURL("image/png");
  },
);
