/** biome-ignore-all lint/performance/noJsxPropsBind: SVG nodes need per-node handlers */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: SVG graph nodes are intentionally interactive */
import { SPECIALIZATION_ENTRIES } from "@/features/freelancers-cut/config/specializations";
import {
	CENTER_X,
	CENTER_Y,
	SELECTED_SPECIALIZATION_NODE_RADIUS,
} from "@/features/freelancers-cut/constants";
import { SpecializationNode } from "./specialization-node";

const LABEL_OFFSET = 12;

export function SelectedSpecialization({ id }: { id: string }) {
	const specialization = SPECIALIZATION_ENTRIES[id];

	if (!specialization) {
		return null;
	}

	return (
		<g>
			<SpecializationNode id={id} x={CENTER_X} y={CENTER_Y} />
			<text
				x={CENTER_X}
				y={CENTER_Y + SELECTED_SPECIALIZATION_NODE_RADIUS + LABEL_OFFSET}
				textAnchor="middle"
				dominantBaseline="central"
				fill="white"
				fillOpacity={0.85}
				fontSize="11"
				fontWeight="600"
				pointerEvents="none"
			>
				{specialization.name}
			</text>
		</g>
	);
}
