import { getClassPerksTitle } from "@/features/entry-point/core/getClassPerksTitle";
import { useEntryPointStore } from "@/features/entry-point/store";
import { Card, CardHeader } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import {
	selectUnlockedClassPerks,
	selectUnlockedWeaponMasteries,
} from "../../store/selectors/select-perks";

export function ClassDetails() {
	const classesUnlocked = useEntryPointStore(selectUnlockedClassPerks);
	const perkLimit = useEntryPointStore((s) => s.perkLimit);
	const unlockedPerkCount = useEntryPointStore((s) => s.unlockedNodes.size);
	const masteriesUnlocked = useEntryPointStore(selectUnlockedWeaponMasteries);

	// biome-ignore lint/style/noMagicNumbers: percentage calculation
	const percentage = Math.min(100, (unlockedPerkCount / perkLimit) * 100);

	return (
		<Card className="rounded-xl border border-border bg-card p-4">
			<CardHeader className="flex flex-row items-center justify-between p-0">
				<div className="flex items-center gap-2.5">
					<span className="inline-flex size-1.5 rounded-full bg-primary" />
					<div>
						<p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.24em]">
							Class
						</p>
						<p className="font-semibold text-foreground text-sm">
							{getClassPerksTitle(classesUnlocked)}
						</p>
					</div>
					<div className="flex -space-x-3">
						{[...classesUnlocked, ...masteriesUnlocked].map((perk) => (
							<div key={perk.name} className="group relative">
								<img
									src={perk.icon}
									width={32}
									title={perk.description}
									height={32}
									alt={perk.name}
									className="relative z-10 rounded-full border-2 border-card bg-muted/80 shadow-sm transition-transform hover:z-100 group-hover:scale-110"
								/>
								<div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 blur-sm transition-opacity group-hover:opacity-100" />
							</div>
						))}
					</div>
				</div>
				<div className="flex items-center gap-3">
					<div className="text-right">
						<p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.24em]">
							Perks
						</p>
						<p className="font-mono font-semibold text-sm">
							<span
								className={cn(
									unlockedPerkCount >= perkLimit
										? "text-destructive"
										: "text-primary",
								)}
							>
								{unlockedPerkCount}
							</span>
							<span className="text-muted-foreground"> / {perkLimit}</span>
						</p>
					</div>
				</div>
			</CardHeader>
			<div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
				<div
					className={cn(
						"h-full rounded-full transition-all",
						// biome-ignore lint/style/noMagicNumbers: 100% threshold
						percentage >= 100 ? "bg-destructive" : "bg-primary",
					)}
					style={{ width: `${percentage}%` }}
				/>
			</div>
		</Card>
	);
}
