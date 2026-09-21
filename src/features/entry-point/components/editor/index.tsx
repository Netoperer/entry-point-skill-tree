import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { CONNECTIONS } from "@/features/entry-point/config/connections";
import { PERK_ENTRIES } from "@/features/entry-point/config/entries";
import { Card } from "@/shared/components/ui/card";
import { ConnectionLine } from "./connection-line";
import { Controls } from "./controls";
import { FilterDefs } from "./filter-defs";
import { PerkNode } from "./perk-node";

export function Editor() {
	return (
		<Card className="relative flex h-full min-h-0 flex-1 flex-col gap-0 overflow-hidden rounded-xl border border-border bg-card py-2 lg:min-h-0">
			<div className="tactical-grid absolute inset-0" aria-hidden="true" />

			<TransformWrapper
				initialPositionX={0}
				initialPositionY={0}
				centerOnInit={true}
				doubleClick={{ disabled: true }}
				maxScale={1.75}
				wheel={{ step: 0.001 }}
				pinch={{ step: 0.001 }}
				panning={{
					excluded: ["image"],
				}}
			>
				<Controls />
				<TransformComponent
					wrapperStyle={{
						width: "100%",
						height: "100%",
					}}
					contentStyle={{
						width: "100%",
						height: "100%",
					}}
				>
					<svg
						aria-label="Tree"
						viewBox="-40 -40 780 780"
						className="h-full w-full select-none"
						preserveAspectRatio="xMidYMid meet"
						width="100%"
						height="100%"
					>
						<FilterDefs />

						{...CONNECTIONS.map((entries) => (
							<ConnectionLine entries={entries} key={entries.join("-")} />
						))}

						{...Object.entries(PERK_ENTRIES).map(([id, perk]) => (
							<PerkNode perkEntry={perk} id={id} key={`Perk_${id}`} />
						))}
					</svg>
				</TransformComponent>
			</TransformWrapper>
		</Card>
	);
}
