import { Perks } from "@/features/entry-point/config/perks";
import { useEntryPointStore } from "@/features/entry-point/store";
import type { Perk } from "@/features/entry-point/types";
import { Item, ItemContent, ItemTitle } from "@/shared/components/ui/item";
import { selectUnlockedMinorPerksMap } from "../../store/selectors/select-perks";

const MASTER_TRAINING_MAP: Record<string, Perk> = {
	"Pistol Mastery": Perks.PistolTraining,
	"SMG Mastery": Perks.SmgTraining,
	"Rifle Mastery": Perks.RifleTraining,
	"Shotgun Mastery": Perks.ShotgunTraining,
	"Heavy Weapons Mastery": Perks.HeavyWeaponsTraining,
	"Sniper Mastery": Perks.SniperTraining,
};

export function WeaponMasteryItem({ mastery }: { mastery: Perk }) {
	const trainingPerk = MASTER_TRAINING_MAP[mastery.name];
	const trainingCount = useEntryPointStore(
		(store) => selectUnlockedMinorPerksMap(store).get(trainingPerk) ?? 0,
	);

	return (
		<Item
			variant="outline"
			className="flex items-center justify-center gap-2.5 rounded-lg border border-border/90 bg-accent/70 px-3 py-2 last:mb-4"
		>
			<ItemContent className="flex h-7 justify-center">
				<ItemTitle
					className="flex min-w-0 flex-1 truncate font-medium text-[13px] text-foreground"
					title={mastery.name}
				>
					<img
						src={mastery.icon}
						alt={mastery.name}
						title={mastery.description}
						width={18}
						height={18}
						className="shrink-0"
					/>
					{mastery.name}
				</ItemTitle>
			</ItemContent>
			<div className="flex shrink-0 items-center gap-2">
				<span className="font-mono text-[10px] text-muted-foreground tracking-widest">
					Training:
				</span>
				<span className="flex h-5 min-w-5 items-center justify-center rounded-md bg-primary px-1.5 font-mono text-primary-foreground text-xs tabular-nums">
					{trainingCount}
				</span>
			</div>
		</Item>
	);
}
