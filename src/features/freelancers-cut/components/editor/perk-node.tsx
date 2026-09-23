/** biome-ignore-all lint/performance/noJsxPropsBind: nuh uh  */

import { handleClick } from "@/features/freelancers-cut/core/handle-click";
import { useFreelancersCutStore } from "@/features/freelancers-cut/store";
import { selectSelectedNodes } from "@/features/freelancers-cut/store/selectors/select-selected-nodes";
import { type PerkEntry, PerkType } from "@/features/freelancers-cut/types";

interface Props {
	perkEntry: PerkEntry;
	id: string;
}

const sizeMap: Record<PerkType, number> = {
	[PerkType.Minor]: 3,
	[PerkType.Major]: 5,
};

function getFilter(
	isHighlighted: boolean,
	isSelected: boolean,
	isUnlocked: boolean,
): string {
	if (isHighlighted) {
		return "url(#highlighted)";
	}

	if (isSelected) {
		return "url(#selected)";
	}

	if (isUnlocked) {
		return "url(#unlocked)";
	}

	return "url(#default)";
}

function getDimensions(perkEntry: PerkEntry) {
	const size = sizeMap[perkEntry.perk.perkType] * 6;

	const centerX = perkEntry.position.x;
	const centerY = perkEntry.position.y;
	const radius = size / 2;

	return { centerX, centerY, radius, size };
}

export function PerkNode({ perkEntry, id }: Props) {
	const isUnlocked = useFreelancersCutStore((s) => s.unlockedNodes.has(id));
	const isSelected = useFreelancersCutStore((s) =>
		selectSelectedNodes(s).has(id),
	);
	const setHoveredNode = useFreelancersCutStore((s) => s.setHoveredNode);
	const isHighlighted = useFreelancersCutStore((s) =>
		s.highlightedPerks.has(perkEntry.perk),
	);
	const showNodeIds = useFreelancersCutStore((s) => s.showNodeIds);

	const filter = getFilter(isHighlighted, isSelected, isUnlocked);
	const { centerX, centerY, radius, size } = getDimensions(perkEntry);

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: SVG graph node is intentionally interactive
		<g
			style={{ cursor: "pointer", pointerEvents: "auto" }}
			onClick={() => {
				handleClick(id);
			}}
			onPointerEnter={() => {
				setHoveredNode(id);
			}}
			onPointerLeave={() => {
				setHoveredNode(null);
			}}
		>
			<defs>
				<clipPath id={`clip-${id}`}>
					<circle cx={centerX} cy={centerY} r={radius} />
				</clipPath>
			</defs>
			<g clipPath={`url(#clip-${id})`}>
				<image
					width={size}
					height={size}
					x={centerX - radius}
					y={centerY - radius}
					href={perkEntry.perk.icon}
					filter={filter}
					preserveAspectRatio="xMidYMid slice"
				>
					<title>
						{perkEntry.perk.name}: {perkEntry.perk.description(1)}
					</title>
				</image>
			</g>
			{showNodeIds && (
				<text
					x={perkEntry.position.x - radius / 2}
					y={perkEntry.position.y + radius / 2}
					fontSize="12"
					fill="red"
				>
					{id}
				</text>
			)}
		</g>
	);
}
