import { TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { cn } from "@/shared/lib/utils";

const TABS = [
	{
		key: "skill",
		imgSrc: "/freelancers-cut/skill-tree.png",
		displayText: "Skill Tree",
		disabled: false,
	},
	{
		key: "combat",
		imgSrc: "/freelancers-cut/combat-tree.png",
		displayText: (
			<div className="flex items-center gap-1">
				Combat Tree <span className="text-[10px] text-gray-50">(soon)</span>
			</div>
		),
		disabled: true,
	},
];

export function TreeTabsList() {
	return (
		<TabsList className="h-10 w-full shrink-0 gap-1 rounded-xl border border-border/50 bg-muted/40 p-1 shadow-inner md:backdrop-blur-md xl:h-12">
			{...TABS.map((tab) => (
				<TabsTrigger
					key={tab.key}
					value={tab.key}
					disabled={tab.disabled}
					className={cn(
						"rounded-lg font-bold text-sm transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md",
					)}
				>
					<img src={tab.imgSrc} alt="icon" width={24} height={24} />
					{tab.displayText}
				</TabsTrigger>
			))}
		</TabsList>
	);
}
