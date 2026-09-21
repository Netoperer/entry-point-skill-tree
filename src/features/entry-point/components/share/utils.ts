import { CONNECTIONS } from "@/features/entry-point/config/connections";
import { PERK_ENTRIES } from "@/features/entry-point/config/entries";
import {
	EXPORT_CANVAS_HEIGHT,
	EXPORT_CANVAS_SCALE,
	EXPORT_CANVAS_WIDTH,
} from "@/features/entry-point/constants";
import { getClassPerksTitle } from "@/features/entry-point/core/getClassPerksTitle";
import type { Perk } from "@/features/entry-point/types";

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

// biome-ignore lint/complexity/noExcessiveLinesPerFunction: It needs to be like that
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Same here
export function renderTreeToCanvas(
	canvas: HTMLCanvasElement,
	unlockedNodes: Set<string>,
	withBackground: boolean,
	imageCache: Map<string, HTMLImageElement>,
) {
	canvas.width = EXPORT_CANVAS_WIDTH * EXPORT_CANVAS_SCALE;
	canvas.height = EXPORT_CANVAS_HEIGHT * EXPORT_CANVAS_SCALE;

	const ctx = canvas.getContext("2d");
	if (!ctx) {
		return;
	}

	ctx.save();
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.scale(EXPORT_CANVAS_SCALE, EXPORT_CANVAS_SCALE);

	if (withBackground) {
		ctx.fillStyle = "#0f1117";
		ctx.fillRect(0, 0, EXPORT_CANVAS_WIDTH, EXPORT_CANVAS_HEIGHT);
	}

	for (const [id1, id2] of CONNECTIONS) {
		const perk1 = PERK_ENTRIES[id1];
		const perk2 = PERK_ENTRIES[id2];
		if (!(perk1 && perk2)) {
			return;
		}

		const unlockedLineWidth = 2;
		const lockedLineWidth = 0.5;

		const isUnlocked = unlockedNodes.has(id1) && unlockedNodes.has(id2);
		ctx.lineWidth = isUnlocked ? unlockedLineWidth : lockedLineWidth;
		ctx.strokeStyle = isUnlocked ? "white" : "rgba(255, 255, 255, 0.2)";

		ctx.beginPath();
		ctx.moveTo(perk1.coordinates.x, perk1.coordinates.y);
		ctx.lineTo(perk2.coordinates.x, perk2.coordinates.y);
		ctx.stroke();
	}

	const entries = Object.entries(PERK_ENTRIES);
	for (const [id, entry] of entries) {
		const image = imageCache.get(entry.perk.icon);
		if (!image) {
			continue;
		}

		ctx.filter =
			// biome-ignore lint/security/noSecrets: nahh it's fine
			unlockedNodes.has(id) ? "none" : "brightness(30%) saturate(30%)";

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

export function downloadImage(
	dataUrl: string,
	unlockedClassPerks: Set<Perk>,
	unlockedCount: number,
) {
	const title = getClassPerksTitle(unlockedClassPerks);
	const fileName = `${title}-${unlockedCount}-tree.png`;
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
	} catch {
		return false;
	}
}
