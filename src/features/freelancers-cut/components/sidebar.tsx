import { Download, LayoutGrid, Settings2 } from "lucide-react";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/shared/components/ui/tabs";
import { cn } from "@/shared/lib/utils";
import { useFreelancersCutStore } from "../store";
import { Details } from "./details/index";
import { Export } from "./export";
import { Settings } from "./settings";
import { TreeTabsList } from "./tree-tabs-list";

const TABS = [
	{
		key: "details",
		value: "details",
		icon: <LayoutGrid className="mr-2 hidden size-4 md:inline" />,
		displayText: "Details",
		component: <Details />,
	},
	{
		key: "export",
		value: "export",
		icon: <Download className="mr-2 hidden size-4 md:inline" />,
		displayText: "Export",
		component: <Export />,
	},
	{
		key: "settings",
		value: "settings",
		icon: <Settings2 className="mr-2 hidden size-4 md:inline" />,
		displayText: "Settings",
		component: <Settings />,
	},
];

export function Sidebar() {
	const editorPinned = useFreelancersCutStore((s) => s.editorPinned);

	return (
		<div
			className={cn(
				"mx-auto flex h-full w-full flex-col gap-3",
				editorPinned
					? "scrollbar-none overflow-y-auto [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
					: "",
				"lg:scrollbar-none lg:overflow-y-auto lg:[-ms-overflow-style:none] lg:[&::-webkit-scrollbar]:hidden",
			)}
		>
			<TreeTabsList />

			<Tabs
				defaultValue="details"
				className="flex h-auto w-full flex-col gap-3 lg:h-full lg:min-h-0 lg:flex-1"
			>
				<TabsList className="h-12! w-full shrink-0 gap-1 rounded-xl border border-border/50 bg-muted/40 p-1 shadow-inner md:backdrop-blur-md">
					{TABS.map((tab) => (
						<TabsTrigger
							key={tab.key}
							value={tab.value}
							className="rounded-lg font-bold text-sm transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
						>
							{tab.icon}
							{tab.displayText}
						</TabsTrigger>
					))}
				</TabsList>

				{TABS.map((tab) => (
					<TabsContent
						key={tab.key}
						value={tab.value}
						className="lg:scrollbar-none rounded-lg outline-none lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:[-ms-overflow-style:none] lg:[&::-webkit-scrollbar]:hidden"
					>
						{tab.component}
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
}
