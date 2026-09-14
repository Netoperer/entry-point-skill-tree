import { PERK_ENTRIES } from "@/features/freelancers-cut/config/perks/entries";
import { useFreelancersCutStore } from "@/features/freelancers-cut/store";
import { selectSelectedNodes } from "@/features/freelancers-cut/store/selectors/select-selected-nodes";

interface Props {
	entries: [string, string];
}

export function ConnectionLine({ entries }: Props) {
	const [id1, id2] = entries;

	const isPathUnlocked = useFreelancersCutStore(
		(s) => s.unlockedNodes.has(id1) && s.unlockedNodes.has(id2),
	);

	const isPathSelected = useFreelancersCutStore((s) => {
		const selectedNodes = selectSelectedNodes(s);
		return (
			(selectedNodes.has(id1) && selectedNodes.has(id2)) ||
			(selectedNodes.has(id1) && s.unlockedNodes.has(id2)) ||
			(selectedNodes.has(id2) && s.unlockedNodes.has(id1))
		);
	});

	// biome-ignore lint/style/noNonNullAssertion: It is present
	const perk1 = PERK_ENTRIES[id1]!;
	// biome-ignore lint/style/noNonNullAssertion: It is present
	const perk2 = PERK_ENTRIES[id2]!;

	const stroke = isPathSelected ? "red" : isPathUnlocked ? "white" : "#ddd";

	return (
		<line
			x1={perk1.position.x}
			y1={perk1.position.y}
			x2={perk2.position.x}
			y2={perk2.position.y}
			stroke={stroke}
			strokeWidth={isPathUnlocked || isPathSelected ? 1.5 : 0.5}
		/>
	);
}
