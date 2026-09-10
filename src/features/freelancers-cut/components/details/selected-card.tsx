import { Check } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { PERK_ENTRIES } from "../../config/entries";
import { useFreelancersCutStore } from "../../store";
import { PerkType } from "../../types";
import { PerkIcon } from "../perk-icon";

export function SelectedCard() {
	const selectedNode = useFreelancersCutStore((s) => s.selectedNode);
	const isNodeUnlocked = useFreelancersCutStore(
		(s) => selectedNode && s.unlockedNodes.has(selectedNode),
	);

	if (!selectedNode) {
		return (
			<div className="rounded-xl border border-border border-dashed bg-card/50 p-5 text-center">
				<p className="text-muted-foreground text-sm">No perk selected.</p>
			</div>
		);
	}

	const perk = PERK_ENTRIES[selectedNode];
	const isMajor = perk.perk.perkType === PerkType.Major;

	return (
		<div className="rounded-xl border border-border bg-card p-4">
			<div className="flex items-start gap-3">
				<span
					className={cn(
						"flex size-11 shrink-0 items-center justify-center rounded-lg border",
						isNodeUnlocked
							? "border-primary/50 bg-primary/15 text-primary"
							: "border-border bg-secondary text-muted-foreground",
					)}
				>
					<PerkIcon perk={perk.perk} />
				</span>
				<div className="min-w-0 flex-1">
					<h3 className="truncate font-semibold text-base text-foreground">
						{perk.perk.name}
					</h3>
					<div className="mt-1 flex items-center gap-2">
						<span
							className={cn(
								"rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider",
								isMajor
									? "bg-accent/15 text-accent"
									: "bg-secondary text-muted-foreground",
							)}
						>
							{isMajor ? "major" : "minor"}
						</span>
						{isNodeUnlocked && (
							<span className="inline-flex items-center gap-1 font-mono text-[11px] text-primary">
								<Check className="size-3" /> allocated
							</span>
						)}
					</div>
				</div>
			</div>

			<p className="mt-3 text-muted-foreground text-sm leading-relaxed">
				{perk.perk.description(1)}
			</p>
		</div>
	);
}
