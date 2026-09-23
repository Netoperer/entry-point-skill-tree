import { Bug } from "lucide-react";
import { useState } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { Switch } from "@/shared/components/ui/switch";
import { useFreelancersCutStore } from "../../store";

function ToggleRow({
	label,
	desc,
	on,
	onToggle,
}: {
	label: string;
	desc: string;
	on: boolean;
	onToggle: () => void;
}) {
	return (
		<div className="flex items-center justify-between gap-4 py-3">
			<div className="min-w-0">
				<p className="font-medium text-sm">{label}</p>
				<p className="text-muted-foreground text-xs">{desc}</p>
			</div>
			<Switch checked={on} onCheckedChange={onToggle} />
		</div>
	);
}
export function DebugCard() {
	const showNodeIds = useFreelancersCutStore((s) => s.showNodeIds);
	const setShowNodeIds = useFreelancersCutStore((s) => s.setShowNodeIds);

	return (
		<Card className="border border-border">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Bug className="size-4" />
					Debug
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-1">
				<ToggleRow
					label="Show perk ids"
					desc="Display ids on the tree"
					on={showNodeIds}
					// biome-ignore lint/performance/noJsxPropsBind: no
					onToggle={() => setShowNodeIds(!showNodeIds)}
				/>
				{/* <ItemSeparator /> */}
			</CardContent>
		</Card>
	);
}
