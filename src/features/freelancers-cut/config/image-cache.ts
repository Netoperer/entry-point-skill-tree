import { preloadImages } from "@/features/freelancers-cut/components/settings/export/utils";

export let IMAGE_CACHE: Map<string, HTMLImageElement> | null = null;

export async function initCache() {
  if (!IMAGE_CACHE) {
    IMAGE_CACHE = await preloadImages();
  }
  return IMAGE_CACHE;
}
