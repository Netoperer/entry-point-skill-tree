import { DebugCard } from "./debug-card";
import { PerkLimit } from "./perk-limit";
import { RootNodeSelector } from "./root-node-selector";

export function Settings() {
	return (
		<div className="space-y-3">
			<RootNodeSelector />
			<PerkLimit />
			<DebugCard />
		</div>
	);
}
