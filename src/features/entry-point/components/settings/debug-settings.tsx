import { Bug } from "lucide-react";
import {
	type StoreState,
	useEntryPointStore,
} from "@/features/entry-point/store";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { Switch } from "@/shared/components/ui/switch";

interface DebugOption {
	label: string;
	desc: string;
	selectValue: (s: StoreState) => boolean;
	selectSetter: (s: StoreState) => (value: boolean) => void;
}

const DEBUG_OPTIONS: DebugOption[] = [
	{
		label: "Show Node IDs",
		desc: "",
		selectValue: (s) => s.showNodeIds,
		selectSetter: (s) => s.setShowNodeIds,
	},
];

function ToggleRow({ option }: { option: DebugOption }) {
	const checked = useEntryPointStore(option.selectValue);
	const setChecked = useEntryPointStore(option.selectSetter);

	return (
		<div className="flex items-center justify-between gap-3 py-1">
			<div className="min-w-0">
				<p className="font-medium text-sm">{option.label}</p>
				<p className="text-muted-foreground text-xs">{option.desc}</p>
			</div>
			<Switch checked={checked} onCheckedChange={setChecked} />
		</div>
	);
}

export function DebugSettings() {
	return (
		<Card className="gap-4 border border-border">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Bug className="size-4" />
					Debug
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-1">
				{DEBUG_OPTIONS.map((option) => (
					<ToggleRow key={option.label} option={option} />
				))}
			</CardContent>
		</Card>
	);
}
