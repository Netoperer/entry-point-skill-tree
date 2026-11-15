import { CENTER_X, CENTER_Y } from "@/features/freelancers-cut/constants";
import { SpecializationNode } from "./specialization-node";

const RING_RADIUS = 40;
const NODE_RADIUS = 16;

export function AvailableSpecializations({ ids }: { ids: string[] }) {
	if (ids.length === 1) {
		return <SpecializationNode id={ids[0]} x={CENTER_X} y={CENTER_Y} />;
	}

	const angleStep = (2 * Math.PI) / ids.length;

	return (
		<g>
			{ids.map((id, index) => {
				const angle = -Math.PI / 2 + index * angleStep;

				return (
					<SpecializationNode
						key={id}
						id={id}
						x={CENTER_X + Math.cos(angle) * RING_RADIUS}
						y={CENTER_Y + Math.sin(angle) * RING_RADIUS}
					/>
				);
			})}
		</g>
	);
}
