import { Download, LayoutGrid, Settings2 } from "lucide-react";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/shared/components/ui/tabs";
import { Details } from "./details/index";
import { Export } from "./export";
import { Settings } from "./settings";

const TABS = [
	{
		key: "details",
		value: "details",
		icon: <LayoutGrid className="mr-2 size-4" />,
		displayText: "Details",
		component: <Details />,
	},
	{
		key: "export",
		value: "export",
		icon: <Download className="mr-2 size-4" />,
		displayText: "Export",
		component: <Export />,
	},
	{
		key: "settings",
		value: "settings",
		icon: <Settings2 className="mr-2 size-4" />,
		displayText: "Settings",
		component: <Settings />,
	},
];

export function Sidebar() {
	return (
		<div className="mx-auto flex h-full w-full flex-col">
			<Tabs
				defaultValue="details"
				className="flex h-full min-h-0 w-full flex-1 flex-col gap-3"
			>
				<TabsList className="h-10 w-full shrink-0 gap-1 rounded-xl border border-border/50 bg-muted/40 p-1 shadow-inner md:backdrop-blur-md xl:h-12">
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
						className="scrollbar-none min-h-0 flex-1 overflow-y-auto outline-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
					>
						<div className="h-full">{tab.component}</div>
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
}
