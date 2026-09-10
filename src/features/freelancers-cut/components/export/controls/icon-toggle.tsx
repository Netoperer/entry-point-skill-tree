import type { LucideIcon } from "lucide-react";
import {
	type StoreState,
	useFreelancersCutStore,
} from "@/features/freelancers-cut/store";
import { cn } from "@/shared/lib/utils";

export interface ExportIconToggleOption {
	key: string;
	titleOn: string;
	titleOff: string;
	selectValue: (s: StoreState) => boolean;
	selectSetter: (s: StoreState) => (value: boolean) => void;
	activeIcon: LucideIcon;
	inactiveIcon: LucideIcon;
}

export function ExportIconToggle({
	option,
}: {
	option: ExportIconToggleOption;
}) {
	const checked = useFreelancersCutStore(option.selectValue);
	const setChecked = useFreelancersCutStore(option.selectSetter);
	const Icon = checked ? option.activeIcon : option.inactiveIcon;

	return (
		<button
			type="button"
			// biome-ignore lint/performance/noJsxPropsBind: It's insignificant
			onClick={() => setChecked(!checked)}
			className={cn(
				"rounded-md border border-border/50 bg-muted/30 p-1 transition-all",
				checked
					? "text-primary hover:bg-muted/50"
					: "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
			)}
			title={checked ? option.titleOn : option.titleOff}
		>
			<Icon className="size-3" />
		</button>
	);
}
