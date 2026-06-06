import { PERK_ENTRIES } from "@/config/entries";
import { CONNECTIONS } from "@/config/connections";
import { getClassPerksTitle } from "@/core/entry-point/getClassPerksTitle";
import type { Perk } from "@/types";

export async function preloadImages(imageCache: React.MutableRefObject<Map<string, HTMLImageElement>>) {
  const entries = Object.values(PERK_ENTRIES);
  const uniqueIcons = Array.from(new Set(entries.map((e) => e.perk.icon)));

  const promises = uniqueIcons.map((src) => {
    return new Promise((resolve) => {
      if (imageCache.current.has(src)) {
        resolve(null);
        return;
      }
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache.current.set(src, img);
        resolve(null);
      };
      img.onerror = () => resolve(null);
    });
  });

  await Promise.all(promises);
}

export function renderTreeToCanvas(
  canvas: HTMLCanvasElement,
  unlockedNodes: Set<string>,
  withBackground: boolean,
  imageCache: Map<string, HTMLImageElement>,
) {
  const scale = 2;
  canvas.width = 700 * scale;
  canvas.height = 700 * scale;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.scale(scale, scale);

  if (withBackground) {
    ctx.fillStyle = "#0f1117";
    ctx.fillRect(0, 0, 700, 700);
  }

  // Draw connections
  CONNECTIONS.forEach(([id1, id2]) => {
    const perk1 = PERK_ENTRIES[id1];
    const perk2 = PERK_ENTRIES[id2];
    if (!perk1 || !perk2) return;

    const isUnlocked = unlockedNodes.has(id1) && unlockedNodes.has(id2);
    ctx.lineWidth = isUnlocked ? 2 : 0.5;
    ctx.strokeStyle = isUnlocked ? "white" : "rgba(255, 255, 255, 0.2)";

    ctx.beginPath();
    ctx.moveTo(perk1.coordinates.x, perk1.coordinates.y);
    ctx.lineTo(perk2.coordinates.x, perk2.coordinates.y);
    ctx.stroke();
  });

  // Draw perks using cache
  const entries = Object.entries(PERK_ENTRIES);
  for (const [id, entry] of entries) {
    const image = imageCache.get(entry.perk.icon);
    if (!image) continue;

    ctx.filter = unlockedNodes.has(id)
      ? "none"
      : "brightness(30%) saturate(30%)";

    const size = entry.coordinates.z;
    ctx.drawImage(
      image,
      entry.coordinates.x - size,
      entry.coordinates.y - size,
      size * 2,
      size * 2,
    );
  }
  ctx.restore();
}

export function downloadCanvas(canvas: HTMLCanvasElement, unlockedClassPerks: Set<Perk>, unlockedCount: number) {
  const title = getClassPerksTitle(unlockedClassPerks);
  const fileName = `${title}-${unlockedCount}-tree.png`;
  const link = document.createElement("a");
  link.download = fileName;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

export async function copyCanvasToClipboard(canvas: HTMLCanvasElement): Promise<boolean> {
  return new Promise((resolve) => {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        resolve(false);
        return;
      }
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        resolve(true);
      } catch (err) {
        console.error("Clipboard fail:", err);
        resolve(false);
      }
    });
  });
}
