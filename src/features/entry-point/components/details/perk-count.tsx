import { useEntryPointStore } from "@/features/entry-point/store";
import { cn } from "@/shared/lib/utils";

export function PerkCount() {
	const perkLimit = useEntryPointStore((s) => s.perkLimit);
	const unlockedPerkCount = useEntryPointStore((s) => s.unlockedNodes.size);

	return (
		<div className="rounded-xl border border-border bg-card p-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2.5">
					<span className="inline-flex size-1.5 rounded-full bg-primary" />
					<div>
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
			</div>
		</div>
	);
}
