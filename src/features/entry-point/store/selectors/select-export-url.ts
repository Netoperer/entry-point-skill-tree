import { createSelector } from "reselect";
import type { StoreState } from "..";
import { renderTreeToCanvas } from "@/features/entry-point/components/settings/export/utils";
import { IMAGE_CACHE } from "@/features/entry-point/config/image-cache";

const getUnlockedNodes = (state: StoreState) => state.unlockedNodes;
const getWithBackground = (state: StoreState) => state.withBackground;
const getIsCacheInitialized = (state: StoreState) => state.isCacheInitialized;

export const selectExportUrl = createSelector(
  [getUnlockedNodes, getWithBackground, getIsCacheInitialized],
  (unlockedNodes, withBackground, isCacheInitialized) => {
    const canvas = document.createElement("canvas");

    if (!isCacheInitialized || !IMAGE_CACHE) return "";

    renderTreeToCanvas(canvas, unlockedNodes, withBackground, IMAGE_CACHE);
    return canvas.toDataURL("image/png");
  },
);
