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

export function PerkNode({ perkEntry, id }: Props) {
	const isUnlocked = useFreelancersCutStore((store) =>
		store.unlockedNodes.has(id),
	);
	const isSelected = useFreelancersCutStore((store) =>
		selectSelectedNodes(store).has(id),
	);
	const setHoveredNode = useFreelancersCutStore(
		(store) => store.setHoveredNode,
	);
	const isHighlighted = useFreelancersCutStore((store) =>
		store.highlightedPerks.has(perkEntry.perk),
	);

	const filter = isHighlighted
		? "url(#highlighted)"
		: isSelected
			? "url(#selected)"
			: isUnlocked
				? "url(#unlocked)"
				: "url(#default)";

	const size = sizeMap[perkEntry.perk.perkType] * 6;

	const centerX = perkEntry.position.x;
	const centerY = perkEntry.position.y;
	const radius = size / 2;

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: SVG graph node is intentionally interactive
		<g
			style={{ cursor: "pointer", pointerEvents: "auto" }}
			onClick={() => {
				handleClick(id);
			}}
			onMouseEnter={() => {
				setHoveredNode(id);
			}}
			onMouseLeave={() => {
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
			{/* <text
        x={perkEntry.position.x - size / 2}
        y={perkEntry.position.y - size / 2}
        font-size="24"
        fill="blue"
      >
        {id}
      </text>{" "} */}
		</g>
	);
}
