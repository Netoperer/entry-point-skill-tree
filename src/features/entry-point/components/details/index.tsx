import { ClassDetails } from "./class";
import { MinorPerksDetails } from "./minors";
import { UniquePerksDetails } from "./uniques";

export function Details() {
	return (
		<div className="flex size-full flex-col">
			<div className="pb-4">
				<ClassDetails />
			</div>
			<div className="flex flex-col gap-4 lg:flex-row">
				<div className="min-w-0 flex-1">
					<MinorPerksDetails />
				</div>
				<div className="shrink-0">
					<UniquePerksDetails />
				</div>
			</div>
		</div>
	);
}
