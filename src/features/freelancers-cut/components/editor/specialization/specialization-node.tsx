/** biome-ignore-all lint/performance/noJsxPropsBind: SVG nodes need per-node handlers */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: SVG graph nodes are intentionally interactive */
import { useState } from "react";
import { SPECIALIZATION_ENTRIES } from "@/features/freelancers-cut/config/specializations";
import {
	SELECTED_SPECIALIZATION_NODE_RADIUS,
	SPECIALIZATION_NODE_RADIUS,
} from "@/features/freelancers-cut/constants";
import { useFreelancersCutStore } from "@/features/freelancers-cut/store";

const DIMMED_OPACITY = 0.45;
const FILL_OPACITY = 0.1;
const HOVER_FILL_OPACITY = 0.22;
const STROKE_OPACITY = 0.4;
const HOVER_STROKE_OPACITY = 0.9;
const STROKE_WIDTH = 1.5;
const HOVER_STROKE_WIDTH = 2;

interface SpecializationNodeProps {
	id: string;
	x: number;
	y: number;
}

export function SpecializationNode({ id, x, y }: SpecializationNodeProps) {
	const specialization = SPECIALIZATION_ENTRIES[id];
	const [isHovered, setIsHovered] = useState(false);

	const isSelected =
		useFreelancersCutStore((state) => state.specialization) === id;

	const setSpecialization = useFreelancersCutStore(
		(state) => state.setSpecialization,
	);

	const radius = isSelected
		? SELECTED_SPECIALIZATION_NODE_RADIUS
		: SPECIALIZATION_NODE_RADIUS;

	if (!specialization) {
		return null;
	}

	const size = radius * 2;

	return (
		<g
			opacity={isSelected ? 1 : DIMMED_OPACITY}
			style={{ cursor: "pointer", pointerEvents: "auto" }}
			onClick={(event) => {
				event.stopPropagation();
				setSpecialization(isSelected ? null : id);
			}}
			onPointerEnter={() => setIsHovered(true)}
			onPointerLeave={() => setIsHovered(false)}
		>
			<title>
				{specialization.name}: {specialization.description}
			</title>
			<defs>
				<clipPath id={`clip-specialization-${id}`}>
					<circle cx={x} cy={y} r={radius} />
				</clipPath>
			</defs>
			<circle
				cx={x}
				cy={y}
				r={radius}
				fill="white"
				fillOpacity={isHovered ? HOVER_FILL_OPACITY : FILL_OPACITY}
				stroke="white"
				strokeOpacity={isHovered ? HOVER_STROKE_OPACITY : STROKE_OPACITY}
				strokeWidth={isHovered ? HOVER_STROKE_WIDTH : STROKE_WIDTH}
			/>
			<image
				x={x - radius}
				y={y - radius}
				width={size}
				height={size}
				href={specialization.icon}
				clipPath={`url(#clip-specialization-${id})`}
				preserveAspectRatio="xMidYMid slice"
			/>
		</g>
	);
}
