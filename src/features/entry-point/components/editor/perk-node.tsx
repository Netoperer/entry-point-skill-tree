import { useCallback } from "react";
import { handleClick } from "@/features/entry-point/core/handle-click";
import { useEntryPointStore } from "@/features/entry-point/store";
import { selectSelectedNodes } from "@/features/entry-point/store/selectors/select-selected-nodes";
import type { PerkEntry } from "@/features/entry-point/types";
import { DEBUG_NODE_ID_DOWNSCALE } from "../../constants";

interface Props {
	perkEntry: PerkEntry;
	id: string;
}

export function PerkNode({ perkEntry, id }: Props) {
	const size = perkEntry.coordinates.z * 2;

	const isUnlocked = useEntryPointStore((store) => store.unlockedNodes.has(id));
	const isSelected = useEntryPointStore((store) =>
		selectSelectedNodes(store).has(id),
	);
	const setHoveredNode = useEntryPointStore((store) => store.setHoveredNode);
	const showNodeIds = useEntryPointStore((store) => store.showNodeIds);

	const clickCallback = useCallback(() => {
		handleClick(id);
	}, [id]);

	const mouseEnterCallback = useCallback(() => {
		setHoveredNode(id);
	}, [id, setHoveredNode]);

	const mouseLeaveCallback = useCallback(() => {
		setHoveredNode(null);
	}, [setHoveredNode]);

	const filter =
		isSelected && !isUnlocked
			? "url(#selected)"
			: isUnlocked
				? "url(#unlocked)"
				: "url(#default)";

	return (
		<>
			{/** biome-ignore lint/a11y/noStaticElementInteractions: I need the image to be interactive */}
			<image
				width={size}
				height={size}
				x={perkEntry.coordinates.x - size / 2}
				y={perkEntry.coordinates.y - size / 2}
				href={perkEntry.perk.icon}
				filter={filter}
				style={{ cursor: "pointer", pointerEvents: "auto" }}
				onClick={clickCallback}
				onPointerEnter={mouseEnterCallback}
				onPointerLeave={mouseLeaveCallback}
			>
				<title>{perkEntry.perk.description}</title>
			</image>
			{showNodeIds && (
				<text
					x={perkEntry.coordinates.x}
					y={perkEntry.coordinates.y}
					textAnchor="middle"
					dominantBaseline="middle"
					fill="red"
					fontSize={perkEntry.coordinates.z * DEBUG_NODE_ID_DOWNSCALE}
					style={{ pointerEvents: "none" }}
				>
					{id}
				</text>
			)}
		</>
	);
}
