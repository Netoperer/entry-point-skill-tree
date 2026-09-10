import { useFreelancersCutStore } from "../store";
import { selectUnlockedPerksMap } from "../store/selectors/select-perks";
import type { Perk } from "../types";

interface Props {
	perk: Perk;
	size?: number;
}

const PERK_ICON_DEFAULT_SIZE = 32;

export function PerkIcon({ perk, size }: Props) {
	const perkUnlockedCount = useFreelancersCutStore((s) =>
		selectUnlockedPerksMap(s).get(perk),
	);

	return (
		<img
			src={perk.icon}
			width={size ?? PERK_ICON_DEFAULT_SIZE}
			title={perk.description(perkUnlockedCount ?? 0)}
			height={size ?? PERK_ICON_DEFAULT_SIZE}
			alt={perk.name}
			className="relative z-10 rounded-full border-2 border-card bg-muted/80 shadow-sm transition-transform hover:z-100 group-hover:scale-110"
		/>
	);
}
