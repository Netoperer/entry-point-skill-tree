import { cn } from "cn";
import { useFreelancersCutStore } from "../store";
import { selectUnlockedPerksMap } from "../store/selectors/select-perks";
import type { Perk } from "../types";

const PERK_ICON_DEFAULT_SIZE = 48;

export function PerkIcon({
	className,
	perk,
	alt,
	...props
}: React.ComponentProps<"img"> & { perk: Perk }) {
	const perkUnlockedCount = useFreelancersCutStore((s) =>
		selectUnlockedPerksMap(s).get(perk),
	);
	return (
		<img
			src={perk.icon}
			width={PERK_ICON_DEFAULT_SIZE}
			height={PERK_ICON_DEFAULT_SIZE}
			alt={alt ?? perk.name}
			title={perk.description(perkUnlockedCount ?? 0)}
			className={cn(
				"rounded-full border-3 border-border bg-muted/80 shadow-sm",
				className,
			)}
			{...props}
		/>
	);
}
