import { TabsList, TabsTrigger } from "@/shared/components/ui/tabs";

const TABS = [
	{
		key: "skill",
		imgSrc: "/freelancers-cut/skill-tree.png",
		displayText: "Skill Tree",
	},
	{
		key: "combat",
		imgSrc: "/freelancers-cut/combat-tree.png",
		displayText: "Combat Tree",
	},
];

export function TreeTabsList() {
	return (
		<TabsList className="h-10 w-full shrink-0 gap-1 rounded-xl border border-border/50 bg-muted/40 p-1 shadow-inner md:backdrop-blur-md xl:h-12">
			{...TABS.map((tab) => (
				<TabsTrigger
					key={tab.key}
					value={tab.key}
					className="rounded-lg font-bold text-sm transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
				>
					<img src={tab.imgSrc} alt={tab.displayText} width={24} height={24} />
					{tab.displayText}
				</TabsTrigger>
			))}
		</TabsList>
	);
}
