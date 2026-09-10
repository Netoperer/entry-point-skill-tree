import { cn } from "@/shared/lib/utils";
import { useFreelancersCutStore } from "../../store";
import { selectPerkCount } from "../../store/selectors/select-perks";

export function ClassCard() {
	const perkLimit = useFreelancersCutStore((s) => s.perkLimit);
	const perkCount = useFreelancersCutStore(selectPerkCount);

	// biome-ignore lint/style/noMagicNumbers: 100% :|
	const percentage = Math.min(100, (perkCount / perkLimit) * 100);

	return (
		<div className="rounded-xl border border-border bg-card p-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2.5">
					<span className="inline-flex size-1.5 rounded-full bg-primary" />
					<div>
						<p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.24em]">
							Class
						</p>
						{/* TODO: determine the classes */}
						<p className="font-semibold text-foreground text-sm">Freelancer</p>
					</div>
				</div>
				<div className="text-right">
					<p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.24em]">
						Perks
					</p>
					<p className="font-mono font-semibold text-sm">
						<span
							className={cn(
								perkCount >= perkLimit ? "text-destructive" : "text-primary",
							)}
						>
							{perkCount}
						</span>
						<span className="text-muted-foreground"> / {perkLimit}</span>
					</p>
				</div>
			</div>
			<div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
				<div
					className={cn(
						"h-full rounded-full transition-all",
						perkCount >= perkLimit ? "bg-destructive" : "bg-primary",
					)}
					style={{ width: `${percentage}%` }}
				/>
			</div>
		</div>
	);
}
