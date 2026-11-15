import { Bug } from "lucide-react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { ItemSeparator } from "@/shared/components/ui/item";
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
		<div className="flex items-center justify-between gap-4 py-2">
			<div className="min-w-0">
				<p className="font-medium text-sm">{label}</p>
				<p className="text-muted-foreground text-xs">{desc}</p>
			</div>
			<Switch checked={on} onCheckedChange={onToggle} />
		</div>
	);
}

export function OtherSettingsCard() {
	const showNodeIds = useFreelancersCutStore((s) => s.showNodeIds);
	const setShowNodeIds = useFreelancersCutStore((s) => s.setShowNodeIds);

	const disconnectInduvidually = useFreelancersCutStore(
		(s) => s.disconnectInduvidually,
	);
	const setDisconnectInduvidually = useFreelancersCutStore(
		(s) => s.setDisconnectInduvidually,
	);

	return (
		<Card className="gap-2 border border-border">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Bug className="size-4" />
					Other
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-1">
				<ToggleRow
					label="Show perk ids"
					desc=""
					on={showNodeIds}
					// biome-ignore lint/performance/noJsxPropsBind: no
					onToggle={() => setShowNodeIds(!showNodeIds)}
				/>
				{/* <ItemSeparator /> */}
				<ToggleRow
					label="Allow perks to be disconnected induvidually"
					desc=""
					on={disconnectInduvidually}
					// biome-ignore lint/performance/noJsxPropsBind: no
					onToggle={() => setDisconnectInduvidually(!disconnectInduvidually)}
				/>
			</CardContent>
		</Card>
	);
}
