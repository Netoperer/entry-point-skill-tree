/** biome-ignore-all lint/performance/noJsxPropsBind: no */
import { type Perk, PerkType } from "../../types";
import { ClassCard } from "./class-card";
import { PerkGroup } from "./perk-group";
import { SelectedCard } from "./selected-card";

export function Details() {
	return (
		<div className="flex size-full flex-col">
			<div className="flex flex-col gap-4 bg-background pb-4">
				<ClassCard />
				<SelectedCard />
			</div>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
				<PerkGroup
					title="Major Perks"
					perkFilter={(perk: Perk) => perk.perkType === PerkType.Major}
					accent={true}
				/>
				<PerkGroup
					title="Minor Perks"
					perkFilter={(perk: Perk) => perk.perkType === PerkType.Minor}
				/>
			</div>
		</div>
	);
}
