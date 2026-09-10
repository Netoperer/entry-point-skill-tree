import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { Card } from "@/shared/components/ui/card";
import { Controls } from "./controls";
import { Tree } from "./tree";

export function Editor() {
	return (
		<Card className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card lg:min-h-0">
			<div className="tactical-grid absolute inset-0" aria-hidden="true" />
			<div
				className="radial-vignette pointer-events-none absolute inset-0 z-10"
				aria-hidden="true"
			/>
			<TransformWrapper
				initialPositionX={0}
				initialPositionY={0}
				centerOnInit={true}
				doubleClick={{ disabled: true }}
				maxScale={3}
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
					<Tree />
				</TransformComponent>
			</TransformWrapper>
		</Card>
	);
}
