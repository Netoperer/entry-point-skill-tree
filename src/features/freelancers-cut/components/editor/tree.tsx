import { CONNECTIONS } from "@/features/freelancers-cut/config/perks/connections";
import { PERK_ENTRIES } from "@/features/freelancers-cut/config/perks/entries";
import { ConnectionLine } from "./connection-line";
import { FilterDefs } from "./filter-defs";
import { PerkNode } from "./perk-node";

export function Tree() {
	return (
		// biome-ignore lint/a11y/noNoninteractiveElementInteractions: I need it
		<svg
			aria-label="Tree"
			viewBox="0 -20 640 690"
			className="h-full w-full select-none [-webkit-touch-callout:none] [-webkit-user-select:none]"
			preserveAspectRatio="xMidYMid meet"
			width="100%"
			height="100%"
			// biome-ignore lint/performance/noJsxPropsBind: shut up
			onContextMenu={(e) => e.preventDefault()}
		>
			<FilterDefs />

			{...CONNECTIONS.map((entries) => (
				<ConnectionLine entries={entries} key={entries.join("-")} />
			))}

			{...Object.entries(PERK_ENTRIES).map(([id, perk]) => (
				<PerkNode perkEntry={perk} id={id} key={`Perk_${id}`} />
			))}
		</svg>
	);
}
