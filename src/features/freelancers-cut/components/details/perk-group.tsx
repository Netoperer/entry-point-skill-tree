import { Eye, EyeOff } from "lucide-react";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemTitle,
} from "@/shared/components/ui/item";
import { cn } from "@/shared/lib/utils";
import { Perks } from "../../config/perks";
import { useFreelancersCutStore } from "../../store";
import { selectUnlockedPerksMap } from "../../store/selectors/select-perks";
import { type Perk, PerkType } from "../../types";
import { PerkIcon } from "../perk-icon";

function DotLevelDisplay({ count }: { count: number }) {
	return (
		<div className="flex justify-center gap-0.5">
			{/** biome-ignore lint/style/noMagicNumbers: not really*/}
			{[3, 2, 1].map((level) => (
				<div
					key={level}
					className={cn(
						"size-1.5 rounded-full transition-all duration-300",
						level <= count ? "bg-primary/80" : "bg-accent/20",
					)}
				/>
			))}
		</div>
	);
}

function PerkHighlight({ perk }: { perk: Perk }) {
	const isPerkHighlighted = useFreelancersCutStore((s) =>
		s.highlightedPerks.has(perk),
	);
	const addHighlightedPerk = useFreelancersCutStore(
		(s) => s.addHighlightedPerk,
	);
	const removeHighlightedPerk = useFreelancersCutStore(
		(s) => s.removeHighlightedPerk,
	);

	const toggleHighlighted = useCallback(() => {
		if (isPerkHighlighted) {
			removeHighlightedPerk(perk);
			return;
		}

		addHighlightedPerk(perk);
	}, [addHighlightedPerk, removeHighlightedPerk, isPerkHighlighted, perk]);

	if (isPerkHighlighted) {
		return (
			<Eye
				size={16}
				className="text-muted-foreground/50"
				onClick={toggleHighlighted}
			/>
		);
	}

	return (
		<EyeOff
			size={16}
			className="text-muted-foreground/20"
			onClick={toggleHighlighted}
		/>
	);
}

function PerkItem({ perk, count }: { perk: Perk; count: number }) {
	const owned = count > 0;
	const setSelectetPerk = useFreelancersCutStore((s) => s.setSelectedPerk);

	const navigate = useNavigate();

	return (
		<Item
			variant="outline"
			className={cn(
				"flex items-center justify-center gap-2.5 rounded-lg border px-3 py-2",
				owned
					? "border-border/90 bg-accent/70"
					: "border-border bg-secondary/20",
			)}
		>
			<ItemContent className="flex h-7 justify-center">
				<ItemTitle
					className="flex min-w-0 flex-1 cursor-pointer truncate font-medium text-[13px] text-foreground"
					// biome-ignore lint/performance/noJsxPropsBind: idc
					onClick={(e) => {
						setSelectetPerk(perk);
					}}
				>
					<PerkIcon perk={perk} className="size-6 border-0" />
					{perk.name}
				</ItemTitle>
			</ItemContent>
			<ItemActions className={cn("flex justify-center font-mono text-[14px]")}>
				<PerkHighlight perk={perk} />
				{perk.perkType === PerkType.Major ? (
					<DotLevelDisplay count={count} />
				) : (
					count
				)}
			</ItemActions>
		</Item>
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
							accent ? "bg-destructive" : "bg-primary",
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
						return <PerkItem count={count} key={perk.name} perk={perk} />;
					})}
			</div>
		</div>
	);
}
