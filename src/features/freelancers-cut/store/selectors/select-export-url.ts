import { createSelector } from "reselect";
import type { StoreState } from "..";
import { renderTreeToCanvas } from "@/features/freelancers-cut/components/settings/export/utils";
import { IMAGE_CACHE } from "@/features/freelancers-cut/config/image-cache";

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
    if (!isCacheInitialized || !IMAGE_CACHE) return "";

    const canvas = document.createElement("canvas");
    renderTreeToCanvas(
      canvas,
      unlockedNodes,
      withBackground,
      withMajorPerks,
      IMAGE_CACHE,
    );
    return canvas.toDataURL("image/png");
  },
);
