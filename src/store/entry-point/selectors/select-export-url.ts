import { createSelector } from "reselect";
import type { StoreState } from "..";
import { renderTreeToCanvas } from "@/components/entry-point/settings/export/utils";
import { IMAGE_CACHE } from "@/config/entry-point/image-cache";

const getUnlockedNodes = (state: StoreState) => state.unlockedNodes;
const getWithBackground = (state: StoreState) => state.withBackground;

export const selectExportBlob = createSelector(
  [getUnlockedNodes, getWithBackground],
  (unlockedNodes, withBackground) => {
    const canvas = document.createElement("canvas");

    renderTreeToCanvas(canvas, unlockedNodes, withBackground, IMAGE_CACHE);

    return canvas.toDataURL("image/png");
  },
);
