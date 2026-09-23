import { DebugSettings } from "./debug-settings";
import { PerkLimit } from "./perk-limit";
import { StarterClassSettings } from "./starter-class";

export function Settings() {
	return (
		<div className="space-y-3">
			<StarterClassSettings />
			<PerkLimit />
			<DebugSettings />
		</div>
	);
}
