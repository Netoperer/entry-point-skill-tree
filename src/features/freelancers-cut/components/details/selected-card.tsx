import { X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import { useFreelancersCutStore } from "../../store";
import { selectUnlockedPerksMap } from "../../store/selectors/select-perks";
import { type Perk, PerkType } from "../../types";
import { PerkIcon } from "../perk-icon";

function MajorPerkContent({ perk }: { perk: Perk }) {
	const selectedPerkLevel = useFreelancersCutStore(
		(s) => selectUnlockedPerksMap(s).get(perk) ?? 1,
	);
	const [perkLevel, setPerkLevel] = useState(selectedPerkLevel);

	return (
		<div className="space-y-2.5">
			<div className="flex items-center gap-1.5">
				<span className="pr-2 font-mono text-[10px] text-muted-foreground">
					Level
				</span>
				{/** biome-ignore lint/style/noMagicNumbers: no */}
				{[1, 2, 3].map((level) => (
					<Button
						key={level}
						size="icon-xs"
						variant={perkLevel === level ? "default" : "outline"}
						// biome-ignore lint/performance/noJsxPropsBind: idc
						onClick={() => {
							setPerkLevel(level);
						}}
					>
						{level}
					</Button>
				))}
			</div>
			<div key={perkLevel} className="text-muted-foreground leading-relaxed">
				{perk.description(perkLevel - 1)}
			</div>
		</div>
	);
}

export function SelectedCard() {
	const selectedPerk = useFreelancersCutStore((s) => s.selectedPerk);
	const selectedPerkLevel = useFreelancersCutStore((s) =>
		selectedPerk ? (selectUnlockedPerksMap(s).get(selectedPerk) ?? 0) : 0,
	);
	const setSelectedPerk = useFreelancersCutStore((s) => s.setSelectedPerk);

	if (!selectedPerk) {
		return (
			<Card className="border-2 border-border border-dashed bg-card/50 shadow-none">
				<CardContent className="p-5 text-center">
					<CardDescription>Click a perk below to select it </CardDescription>
				</CardContent>
			</Card>
		);
	}

	const isMajor = selectedPerk.perkType === PerkType.Major;

	return (
		<Card size="sm" id="selected-card">
			<CardHeader className="flex flex-row items-start gap-3">
				<div className="rounded-lg border-2 border-card bg-primary/50 p-2">
					<PerkIcon perk={selectedPerk} className="size-7 border-0" />
				</div>
				<div className="min-w-0 flex-1">
					<CardTitle className="truncate">{selectedPerk.name}</CardTitle>
					<div className="mt-1 flex items-center gap-2">
						<Badge
							variant={isMajor ? "default" : "secondary"}
							className="font-mono text-[10px] uppercase tracking-wider"
						>
							{isMajor ? "major" : "minor"}
						</Badge>
						<Badge variant="outline">{selectedPerkLevel} unlocked</Badge>
					</div>
				</div>
				<CardAction className="flex items-center gap-1">
					<Button
						size="icon-xs"
						variant="ghost"
						className={cn("text-muted-foreground hover:text-foreground")}
						// biome-ignore lint/performance/noJsxPropsBind: idc
						onClick={() => {
							setSelectedPerk(null);
						}}
					>
						<X />
					</Button>
				</CardAction>
			</CardHeader>

			<CardContent>
				{isMajor ? (
					<MajorPerkContent perk={selectedPerk} key={selectedPerk.name} />
				) : (
					<div className="text-muted-foreground leading-relaxed">
						{selectedPerk.description(1)}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
