import { createSelector } from "reselect";
import type { StoreState } from "..";
import { renderTreeToCanvas } from "@/features/freelancers-cut/components/settings/export/utils";
import { IMAGE_CACHE } from "@/features/freelancers-cut/config/image-cache";

const getUnlockedNodes = (state: StoreState) => state.unlockedNodes;
const getWithBackground = (state: StoreState) => state.withBackground;

export const selectExportUrl = createSelector(
  [getUnlockedNodes, getWithBackground],
  (unlockedNodes, withBackground) => {
    const canvas = document.createElement("canvas");
    renderTreeToCanvas(canvas, unlockedNodes, withBackground, IMAGE_CACHE);
    return canvas.toDataURL("image/png");
  },
);
