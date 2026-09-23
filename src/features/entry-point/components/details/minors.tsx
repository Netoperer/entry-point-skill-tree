import { Perks } from "@/features/entry-point/config/perks";
import { minors } from "@/features/entry-point/config/perks/minors";
import { useEntryPointStore } from "@/features/entry-point/store";
import type { Perk } from "@/features/entry-point/types";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { Item, ItemContent, ItemTitle } from "@/shared/components/ui/item";
import { selectUnlockedMinorPerksMap } from "../../store/selectors/select-perks";

const WEAPON_TRAININGS = [
	Perks.SmgTraining,
	Perks.RifleTraining,
	Perks.PistolTraining,
	Perks.SniperTraining,
	Perks.ShotgunTraining,
	Perks.HeavyWeaponsTraining,
];

interface Props {
	perk: Perk;
}

function MinorPerkItem({ perk }: Props) {
	const count = useEntryPointStore(
		(store) => selectUnlockedMinorPerksMap(store).get(perk) ?? 0,
	);
	const owned = count > 0;

	return (
		<Item
			variant="outline"
			className={
				owned
					? "flex items-center justify-center gap-2.5 rounded-lg border border-border/90 bg-accent/70 px-3 py-2"
					: "flex items-center justify-center gap-2.5 rounded-lg border border-border bg-secondary/20 px-3 py-2"
			}
		>
			<ItemContent className="flex h-7 justify-center">
				<ItemTitle
					className="flex min-w-0 flex-1 truncate font-medium text-[13px] text-foreground"
					title={perk.name}
				>
					<img
						src={perk.icon}
						alt={perk.name}
						title={perk.description}
						width={18}
						height={18}
						className="shrink-0"
					/>
					{perk.name}
				</ItemTitle>
			</ItemContent>
			<div className="flex shrink-0 items-center font-mono text-[14px]">
				{count > 0 && (
					<span className="flex h-5 min-w-5 items-center justify-center rounded-md bg-primary px-1.5 font-mono text-primary-foreground text-xs tabular-nums">
						{count}
					</span>
				)}
			</div>
		</Item>
	);
}

export function MinorPerksDetails() {
	const perks = Object.values(minors).filter(
		(perk) => !WEAPON_TRAININGS.includes(perk),
	);

	return (
		<Card className="gap-3 rounded-xl border border-border bg-card p-4">
			<CardHeader className="flex flex-row items-center justify-between p-0">
				<CardTitle className="flex items-center gap-2">
					<span className="h-4 w-1 rounded-full bg-primary" />
					Minor Perks
				</CardTitle>
			</CardHeader>
			<CardContent className="grid grid-cols-1 gap-2 p-0 sm:grid-cols-2 lg:grid-cols-1">
				{perks.map((perk) => (
					<MinorPerkItem key={perk.name} perk={perk} />
				))}
			</CardContent>
		</Card>
	);
}
