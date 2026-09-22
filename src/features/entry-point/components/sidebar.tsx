import { Download, LayoutGrid, Settings2, Wrench } from "lucide-react";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/shared/components/ui/tabs";
import { Builder } from "./builder";
import { Details } from "./details";
import { Settings } from "./settings";
import { Share } from "./share";

const TABS = [
	{
		value: "details",
		label: "Details",
		icon: <LayoutGrid className="mr-2 hidden size-4 md:inline" />,
		component: <Details />,
	},
	{
		value: "builder",
		label: "Builder",
		icon: <Wrench className="mr-2 hidden size-4 md:inline" />,
		component: <Builder />,
	},
	{
		value: "share",
		label: "Share",
		icon: <Download className="mr-2 hidden size-4 md:inline" />,
		component: <Share />,
	},
	{
		value: "settings",
		label: "Settings",
		icon: <Settings2 className="mr-2 hidden size-4 md:inline" />,
		component: <Settings />,
	},
];

export function Sidebar() {
	return (
		<Tabs
			defaultValue="details"
			className="flex h-full min-h-0 w-full flex-1 flex-col gap-3"
		>
			<TabsList className="h-12! w-full shrink-0 gap-1 rounded-xl border border-border/50 bg-muted/40 p-1 shadow-inner md:backdrop-blur-md">
				{TABS.map((tab) => (
					<TabsTrigger
						key={tab.value}
						value={tab.value}
						className="rounded-lg font-bold text-sm transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
					>
						{tab.icon}
						{tab.label}
					</TabsTrigger>
				))}
			</TabsList>

			{TABS.map((tab) => (
				<TabsContent
					key={tab.value}
					value={tab.value}
					className="scrollbar-none min-h-0 flex-1 overflow-y-auto rounded-lg outline-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
				>
					<div className="h-full">{tab.component}</div>
				</TabsContent>
			))}
		</Tabs>
	);
}
