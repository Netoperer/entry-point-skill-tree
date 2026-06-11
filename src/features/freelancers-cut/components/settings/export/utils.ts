import { PERK_ENTRIES } from "@/features/freelancers-cut/config/entries";
import { CONNECTIONS } from "@/features/freelancers-cut/config/connections";
import { PerkType } from "@/features/freelancers-cut/types";

export async function preloadImages() {
  const imageCache = new Map<string, HTMLImageElement>();

  const entries = Object.values(PERK_ENTRIES);
  const uniqueIcons = Array.from(new Set(entries.map((e) => e.perk.icon)));

  const promises = uniqueIcons.map(
    (src) =>
      new Promise<void>((resolve) => {
        if (imageCache.has(src)) {
          resolve();
          return;
        }
        const img = new Image();
        img.src = src;
        img.onload = () => {
          imageCache.set(src, img);
          resolve();
        };
        img.onerror = () => resolve();
      }),
  );

  await Promise.all(promises);
  return imageCache;
}

export function renderTreeToCanvas(
  canvas: HTMLCanvasElement,
  unlockedNodes: Set<string>,
  withBackground: boolean,
  withMajorPerks: boolean,
  imageCache: Map<string, HTMLImageElement>,
) {
  const scale = 2;
  const padding = 100;

  // Calculate bounds
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  Object.values(PERK_ENTRIES).forEach((entry) => {
    minX = Math.min(minX, entry.position.x);
    minY = Math.min(minY, entry.position.y);
    maxX = Math.max(maxX, entry.position.x);
    maxY = Math.max(maxY, entry.position.y);
  });

  const treeWidth = maxX - minX;
  const treeHeight = maxY - minY;

  const unlockedMajorsMap = new Map<string, number>();
  if (withMajorPerks) {
    for (const node of unlockedNodes) {
      const entry = PERK_ENTRIES[node];
      if (entry?.perk.perkType === PerkType.Major) {
        unlockedMajorsMap.set(
          entry.perk.name,
          (unlockedMajorsMap.get(entry.perk.name) ?? 0) + 1,
        );
      }
    }
  }

  canvas.width = (treeWidth + padding) * scale;
  canvas.height = (treeHeight + padding) * scale;

  const offsetX = padding / 2 - minX;
  const offsetY = padding / 2 - minY;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.scale(scale, scale);

  if (withBackground) {
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, canvas.width / scale, canvas.height / scale);
  }

  ctx.save();
  ctx.translate(offsetX, offsetY);

  // Draw connections
  CONNECTIONS.forEach(([id1, id2]) => {
    const entry1 = PERK_ENTRIES[id1];
    const entry2 = PERK_ENTRIES[id2];
    if (!entry1 || !entry2) return;

    const isUnlocked = unlockedNodes.has(id1) && unlockedNodes.has(id2);
    ctx.lineWidth = isUnlocked ? 2 : 0.5;
    ctx.strokeStyle = isUnlocked ? "white" : "rgba(255, 255, 255, 0.2)";

    ctx.beginPath();
    ctx.moveTo(entry1.position.x, entry1.position.y);
    ctx.lineTo(entry2.position.x, entry2.position.y);
    ctx.stroke();
  });

  // Draw perks using cache
  const entries = Object.entries(PERK_ENTRIES);
  for (const [id, entry] of entries) {
    const image = imageCache.get(entry.perk.icon);
    if (!image) continue;

    const isUnlocked = unlockedNodes.has(id);
    ctx.filter = isUnlocked ? "none" : "brightness(30%) saturate(30%)";

    const isMajor = entry.perk.perkType === PerkType.Major;
    const size = isMajor ? 15 : 9;
    const x = entry.position.x;
    const y = entry.position.y;

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(image, x - size, y - size, size * 2, size * 2);
    ctx.restore();
  }
  ctx.restore(); // Restore from translate(offsetX, offsetY)

  // Reset filter for text!
  ctx.filter = "none";

  // Draw major perks list in the middle
  if (withMajorPerks && unlockedMajorsMap.size > 0) {
    const centerX = (treeWidth + padding) / 2;
    const centerY = (treeHeight + padding) / 2;

    ctx.save();
    ctx.translate(centerX, centerY + 10);

    const sortedMajors = Array.from(unlockedMajorsMap.entries()).sort(
      (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
    );

    const lineHeight = 9;
    const totalHeight = sortedMajors.length * lineHeight;
    let currentY = -totalHeight / 2;

    sortedMajors.forEach(([name, count]) => {
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const text = `${name} ${count}`;

      ctx.font = "600 8px 'Inter', system-ui, sans-serif";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText(text, 0, currentY);

      currentY += lineHeight;
    });

    ctx.restore();
  }

  ctx.restore(); // Restore from scale/setTransform
}

export function downloadImage(dataUrl: string, unlockedCount: number) {
  const fileName = `freelancer-tree-${unlockedCount}.png`;
  const link = document.createElement("a");
  link.download = fileName;
  link.href = dataUrl;
  link.click();
}

export async function copyImageToClipboard(dataUrl: string) {
  try {
    const blob = await fetch(dataUrl).then((r) => r.blob());
    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    return true;
  } catch (err) {
    console.error("Clipboard fail:", err);
    return false;
  }
}
