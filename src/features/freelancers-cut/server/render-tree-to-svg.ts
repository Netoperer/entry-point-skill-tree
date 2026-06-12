import { PERK_ENTRIES } from "@/features/freelancers-cut/config/entries";
import { CONNECTIONS } from "@/features/freelancers-cut/config/connections";
import { PerkType } from "@/features/freelancers-cut/types";

export function renderTreeToSvg(
  unlockedNodes: Set<string>,
  imageCache: Map<string, string>, // base64 images
): string {
  const padding = 40;
  const originalWidth = 640;
  const originalHeight = 690;
  const width = originalWidth + padding * 2;
  const height = originalHeight + padding * 2;
  const viewBox = `0 0 ${width} ${height}`;

  const unlockedFilter = `
    <filter id="unlocked" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
      <feOffset in="blur" dx="0" dy="0" result="offsetBlur" />
      <feFlood flood-color="#ffffff" flood-opacity="0.5" result="glowColor" />
      <feComposite in="glowColor" in2="offsetBlur" operator="in" result="glow" />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  `;

  const unlockedGrad = `
    <linearGradient id="unlockedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#cccccc;stop-opacity:1" />
    </linearGradient>
  `;

  const connections = CONNECTIONS.map(([id1, id2]) => {
    const entry1 = PERK_ENTRIES[id1];
    const entry2 = PERK_ENTRIES[id2];
    if (!entry1 || !entry2) return "";

    const isUnlocked = unlockedNodes.has(id1) && unlockedNodes.has(id2);
    const stroke = isUnlocked ? "white" : "rgba(255, 255, 255, 0.2)";
    const strokeWidth = isUnlocked ? 1.5 : 0.5;

    return `<line x1="${entry1.position.x}" y1="${entry1.position.y}" x2="${entry2.position.x}" y2="${entry2.position.y}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
  }).join("\n");

  const nodes = Object.entries(PERK_ENTRIES).map(([id, entry]) => {
    const isUnlocked = unlockedNodes.has(id);
    const isMajor = entry.perk.perkType === PerkType.Major;
    const size = isMajor ? 15 : 9;
    const x = entry.position.x;
    const y = entry.position.y;
    
    const filter = isUnlocked ? 'filter="url(#unlocked)"' : 'filter="brightness(0.3) saturate(0.3)"';
    const iconBase64 = imageCache.get(entry.perk.icon);
    
    // Fallback if image not in cache
    const imageElement = iconBase64 
      ? `<image href="${iconBase64}" x="${x - size}" y="${y - size}" width="${size * 2}" height="${size * 2}" clip-path="url(#clip-${id})" />`
      : `<circle cx="${x}" cy="${y}" r="${size}" fill="${isUnlocked ? "white" : "#444"}" />`;

    return `
      <g ${filter}>
        <defs>
          <clipPath id="clip-${id}">
            <circle cx="${x}" cy="${y}" r="${size}" />
          </clipPath>
        </defs>
        ${imageElement}
        <circle cx="${x}" cy="${y}" r="${size}" fill="none" stroke="${isUnlocked ? "white" : "rgba(255, 255, 255, 0.2)"}" stroke-width="0.5" clip-path="url(#clip-${id})" />
      </g>
    `;
  }).join("\n");

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}" style="background: #1a1a1a;">
      <defs>
        ${unlockedFilter}
        ${unlockedGrad}
      </defs>
      <g transform="translate(${padding}, ${padding + 20})">
        ${connections}
        ${nodes}
      </g>
    </svg>
  `;
}
