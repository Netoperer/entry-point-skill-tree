import { cn } from "@/shared/lib/utils";
import { Perks } from "../../config/perks";
import { useFreelancersCutStore } from "../../store";
import { selectUnlockedPerksMap } from "../../store/selectors/select-perks";
import { type Perk, PerkType } from "../../types";
import { PerkIcon } from "../perk-icon";

function DotLevelDisplay({ count }: { count: number }) {
	return (
		<div className="mt-1 flex gap-0.5">
			{[3, 2, 1].map((level) => (
				<div
					key={level}
					className={cn(
						"size-1.5 rounded-full transition-all duration-300",
						level <= count ? "bg-destructive" : "bg-primary/50",
					)}
				/>
			))}
		</div>
	);
}

export function PerkGroup({
	title,
	accent = false,
	perkFilter,
}: {
	title: string;
	perkFilter: (perk: Perk) => boolean;
	accent?: boolean;
}) {
	const allPerksWithFilter = Object.values(Perks).filter(perkFilter);
	const unlockedPerksMap = useFreelancersCutStore(selectUnlockedPerksMap);

	return (
		<div className="rounded-xl border border-border bg-card p-4">
			<div className="mb-3 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<span
						className={cn(
							"h-4 w-1 rounded-full",
							accent ? "bg-accent" : "bg-primary",
						)}
					/>
					<h2 className="font-semibold text-foreground text-sm">{title}</h2>
				</div>
				{/* <span className="font-mono text-[11px] text-muted-foreground">
					
				</span> */}
			</div>
			<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
				{allPerksWithFilter
					.sort(
						(a, b) =>
							(unlockedPerksMap.get(b) ?? 0) - (unlockedPerksMap.get(a) ?? 0),
					)
					.map((perk) => {
						const count = unlockedPerksMap.get(perk) ?? 0;
						const owned = count > 0;

						return (
							<div
								key={perk.name}
								className={cn(
									"flex items-center gap-2.5 rounded-lg border px-3 py-2",
									owned
										? "border-primary/40 bg-primary/10"
										: "border-border bg-secondary/40",
								)}
							>
								<span
									className={cn(
										"flex size-7 shrink-0 items-center justify-center rounded-md",
										owned
											? "bg-primary/20 text-primary"
											: "bg-background/60 text-muted-foreground",
									)}
								>
									<PerkIcon perk={perk} />
								</span>
								<span className="min-w-0 flex-1 truncate font-medium text-[13px] text-foreground">
									{perk.name}
								</span>
								<span
									className={cn(
										"shrink-0 font-mono text-[12px]",
										owned ? "text-destructive" : "text-muted-foreground/60",
									)}
								>
									{perk.perkType === PerkType.Major ? (
										<DotLevelDisplay count={count} />
									) : (
										count
									)}
								</span>
							</div>
						);
					})}
			</div>
		</div>
	);
}
