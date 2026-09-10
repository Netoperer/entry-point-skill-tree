import { cn } from "cn";
import { Route } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { PERK_ENTRIES } from "../../config/entries";
import { useFreelancersCutStore } from "../../store";
import { RootNode } from "../../types";

export function RootNodeSelector() {
	const rootNode = useFreelancersCutStore((s) => s.rootNode);
	const setRootNode = useFreelancersCutStore((s) => s.setRootNode);

	const rootNodes = Object.entries(RootNode).map(([_, id]) => ({
		name: PERK_ENTRIES[id].perk.name,
		icon: PERK_ENTRIES[id].perk.icon,
		id,
	}));

	return (
		<Card className="border border-border">
			<CardHeader className="pb-3">
				<CardTitle className="flex items-center gap-2">
					<Route className="size-4" />
					Root Node
				</CardTitle>
				<CardDescription>Choose the root node.</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-2 gap-1.5">
					{rootNodes.map((node) => (
						<button
							type="button"
							key={node.id}
							// biome-ignore lint/performance/noJsxPropsBind: no
							onClick={() => setRootNode(node.id)}
							className={cn(
								"flex items-center gap-3 rounded-lg border px-3 py-2 text-left transition-all",
								rootNode === node.id
									? "border-primary/30 bg-primary/10 ring-1 ring-primary/20"
									: "border-transparent bg-muted/30 hover:bg-muted/50",
							)}
						>
							<div
								className={cn(
									"flex size-8 shrink-0 items-center justify-center rounded-full",
									rootNode === node.id ? "bg-primary/20" : "bg-muted",
								)}
							>
								<img
									width="100%"
									height="100%"
									src={node.icon}
									alt={node.name}
									className={cn(
										"size-5 rounded-full",
										rootNode !== node.id && "opacity-50 grayscale",
									)}
								/>
							</div>
							<span
								className={cn(
									"flex-1 truncate font-bold text-[12px]",
									rootNode === node.id
										? "text-foreground"
										: "text-muted-foreground",
								)}
							>
								{node.name}
							</span>
						</button>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
