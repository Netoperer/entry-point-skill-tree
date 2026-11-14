import { CONNECTIONS } from "@/features/freelancers-cut/config/perks/connections";
import { PERK_ENTRIES } from "@/features/freelancers-cut/config/perks/entries";
import { getUnlockedMajors } from "@/features/freelancers-cut/core/get-unlocked-majors";
import { getUnlockedMinors } from "@/features/freelancers-cut/core/get-unlocked-minors";
import { type Perk, PerkType } from "@/features/freelancers-cut/types";

const LABEL_FONT_FAMILY = "'Inter', system-ui, sans-serif";
const LABEL_TITLE_FONT = `700 13px ${LABEL_FONT_FAMILY}`;
const LABEL_ENTRY_FONT = `500 12px ${LABEL_FONT_FAMILY}`;
const LABEL_LINE_HEIGHT = 16;
const LABEL_TITLE_GAP = 20;
const LABEL_GROUP_GAP = 30;
const LABEL_RIGHT_PADDING = 18;
const LABEL_GAP = 28;
const ICON_SIZE = 12;
const ICON_GAP = 7;
const MAJOR_PERK_SIZE = 15;
const MINOR_PERK_SIZE = 9;

function sortedPerkEntries(perks: Map<Perk, number>) {
	return Array.from(perks.entries()).sort(
		(a, b) => b[1] - a[1] || a[0].name.localeCompare(b[0].name),
	);
}

function getPerkCount(perks: Map<Perk, number>) {
	let count = 0;
	for (const value of perks.values()) {
		count += value;
	}
	return count;
}

function getPerkNamesWidth(
	ctx: CanvasRenderingContext2D,
	groups: { title: string; perks: Map<Perk, number> }[],
) {
	let maxWidth = 0;

	for (const group of groups) {
		ctx.font = LABEL_TITLE_FONT;
		const title = `${group.title} (${getPerkCount(group.perks)})`;
		maxWidth = Math.max(maxWidth, ctx.measureText(title).width);

		ctx.font = LABEL_ENTRY_FONT;
		for (const [perk, count] of sortedPerkEntries(group.perks)) {
			const entryWidth = ctx.measureText(`${perk.name} ${count}`).width;
			maxWidth = Math.max(maxWidth, ICON_SIZE + ICON_GAP + entryWidth);
		}
	}

	return Math.ceil(maxWidth) + LABEL_RIGHT_PADDING;
}

function getPerkNamesHeight(
	groups: { title: string; perks: Map<Perk, number> }[],
) {
	let height = 0;

	for (const [index, group] of groups.entries()) {
		height += LABEL_TITLE_GAP + group.perks.size * LABEL_LINE_HEIGHT;
		if (index < groups.length - 1) {
			height += LABEL_GROUP_GAP;
		}
	}

	return height;
}

function drawPerkGroup({
	ctx,
	title,
	perks,
	x,
	startY,
	imageCache,
}: {
	ctx: CanvasRenderingContext2D;
	title: string;
	perks: Map<Perk, number>;
	x: number;
	startY: number;
	imageCache: Map<string, HTMLImageElement>;
}) {
	let y = startY;

	ctx.textAlign = "start";
	ctx.textBaseline = "middle";
	ctx.font = LABEL_TITLE_FONT;
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText(`${title} (${getPerkCount(perks)})`, x, y);
	y += LABEL_TITLE_GAP;

	ctx.font = LABEL_ENTRY_FONT;
	ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
	for (const [perk, count] of sortedPerkEntries(perks)) {
		const icon = imageCache.get(perk.icon);
		if (icon) {
			ctx.save();
			ctx.beginPath();
			ctx.arc(x + ICON_SIZE / 2, y, ICON_SIZE / 2, 0, Math.PI * 2);
			ctx.clip();
			ctx.drawImage(icon, x, y - ICON_SIZE / 2, ICON_SIZE, ICON_SIZE);
			ctx.restore();
		}

		ctx.fillText(`${perk.name} ${count}`, x + ICON_SIZE + ICON_GAP, y);
		y += LABEL_LINE_HEIGHT;
	}

	return y;
}

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

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: no
// biome-ignore lint/complexity/useMaxParams: no
// biome-ignore lint/complexity/noExcessiveLinesPerFunction: no
export function renderTreeToCanvas(
	canvas: HTMLCanvasElement,
	unlockedNodes: Set<string>,
	withBackground: boolean,
	withPerkNames: boolean,
	imageCache: Map<string, HTMLImageElement>,
) {
	const scale = 2;
	const padding = 100;

	// Calculate bounds
	let minX = Number.POSITIVE_INFINITY;
	let minY = Number.POSITIVE_INFINITY;
	let maxX = Number.NEGATIVE_INFINITY;
	let maxY = Number.NEGATIVE_INFINITY;
	let maxNodeRight = Number.NEGATIVE_INFINITY;

	for (const entry of Object.values(PERK_ENTRIES)) {
		const size =
			entry.perk.perkType === PerkType.Major
				? MAJOR_PERK_SIZE
				: MINOR_PERK_SIZE;

		minX = Math.min(minX, entry.position.x);
		minY = Math.min(minY, entry.position.y);
		maxX = Math.max(maxX, entry.position.x);
		maxY = Math.max(maxY, entry.position.y);
		maxNodeRight = Math.max(maxNodeRight, entry.position.x + size);
	}

	const treeWidth = maxX - minX;
	const treeHeight = maxY - minY;

	const ctx = canvas.getContext("2d");
	if (!ctx) {
		return;
	}

	const unlockedMajors = getUnlockedMajors(unlockedNodes);
	const unlockedMinors = getUnlockedMinors(unlockedNodes);
	const groups = [
		{ title: "Major Perks", perks: unlockedMajors },
		...(unlockedMinors.size > 0
			? [{ title: "Minor Perks", perks: unlockedMinors }]
			: []),
	];
	const labelsWidth = withPerkNames ? getPerkNamesWidth(ctx, groups) : 0;
	const treeRight = maxNodeRight + padding / 2 - minX;
	const labelX = treeRight + LABEL_GAP;
	const canvasWidth = withPerkNames
		? Math.max(treeWidth + padding, labelX + labelsWidth)
		: treeWidth + padding;

	canvas.width = canvasWidth * scale;
	canvas.height = (treeHeight + padding) * scale;

	const offsetX = padding / 2 - minX;
	const offsetY = padding / 2 - minY;

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

	for (const [id1, id2] of CONNECTIONS) {
		const entry1 = PERK_ENTRIES[id1];
		const entry2 = PERK_ENTRIES[id2];
		if (!(entry1 && entry2)) {
			return;
		}

		const isUnlocked = unlockedNodes.has(id1) && unlockedNodes.has(id2);
		ctx.lineWidth = isUnlocked ? 2 : 0.5;
		ctx.strokeStyle = isUnlocked ? "white" : "rgba(255, 255, 255, 0.2)";

		ctx.beginPath();
		ctx.moveTo(entry1.position.x, entry1.position.y);
		ctx.lineTo(entry2.position.x, entry2.position.y);
		ctx.stroke();
	}

	const entries = Object.entries(PERK_ENTRIES);
	for (const [id, entry] of entries) {
		const image = imageCache.get(entry.perk.icon);
		if (!image) {
			continue;
		}

		const isUnlocked = unlockedNodes.has(id);
		// biome-ignore lint/security/noSecrets: nope
		ctx.filter = isUnlocked ? "none" : "brightness(30%) saturate(30%)";

		const isMajor = entry.perk.perkType === PerkType.Major;
		const size = isMajor ? MAJOR_PERK_SIZE : MINOR_PERK_SIZE;
		const { x, y } = entry.position;

		ctx.save();
		ctx.beginPath();
		ctx.arc(x, y, size, 0, Math.PI * 2);
		ctx.clip();
		ctx.drawImage(image, x - size, y - size, size * 2, size * 2);
		ctx.restore();
	}
	ctx.restore();

	ctx.filter = "none";

	// Draw unlocked perk names to the right of the tree
	if (withPerkNames) {
		let y =
			(treeHeight + padding - getPerkNamesHeight(groups)) / 2 +
			LABEL_LINE_HEIGHT / 2;

		ctx.save();
		for (const group of groups) {
			y = drawPerkGroup({
				ctx,
				title: group.title,
				perks: group.perks,
				x: labelX,
				startY: y,
				imageCache,
			});
			y += LABEL_GROUP_GAP;
		}
		ctx.restore();
	}

	ctx.restore();
}

export function downloadImage(dataUrl: string, filename: string) {
	const link = document.createElement("a");
	link.download = filename;
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
