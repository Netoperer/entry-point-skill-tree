import { PERK_ENTRIES } from "@/features/freelancers-cut/config/entries";

const SERVER_IMAGE_CACHE = new Map<string, string>();

export async function loadServerImages(origin: string): Promise<Map<string, string>> {
  if (SERVER_IMAGE_CACHE.size > 0) return SERVER_IMAGE_CACHE;

  const entries = Object.values(PERK_ENTRIES);
  const uniqueIcons = Array.from(new Set(entries.map((e) => e.perk.icon)));

  const promises = uniqueIcons.map(async (iconPath) => {
    try {
      // Ensure iconPath is a full URL or relative to origin
      const url = iconPath.startsWith("http") ? iconPath : `${origin}${iconPath}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch ${url}`);
      
      const arrayBuffer = await response.arrayBuffer();
      const base64 = btoa(
        new Uint8Array(arrayBuffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          "",
        )
      );
      
      const mimeType = iconPath.endsWith(".png") ? "image/png" : "image/webp";
      const dataUrl = `data:${mimeType};base64,${base64}`;
      
      SERVER_IMAGE_CACHE.set(iconPath, dataUrl);
    } catch (err) {
      console.error(`Error loading server image ${iconPath}:`, err);
    }
  });

  await Promise.all(promises);
  return SERVER_IMAGE_CACHE;
}
