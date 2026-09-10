/** biome-ignore-all lint/style/noMagicNumbers: TODO: fix it */
/** biome-ignore-all lint/security/noSecrets: those're not secret's, fix it later tho ^^ */
import { Maximize2, Minus, Plus, RotateCcw } from "lucide-react";
import { useCallback } from "react";
import { useControls } from "react-zoom-pan-pinch";

function ToolButton({
	children,
	label,
	onClick,
}: {
	children: React.ReactNode;
	label: string;
	onClick?: () => void;
}) {
	return (
		<button
			type="button"
			aria-label={label}
			onClick={onClick}
			className="inline-flex size-8 items-center justify-center rounded-md border border-border bg-background/70 text-muted-foreground backdrop-blur transition-colors hover:border-primary/50 hover:text-foreground"
		>
			{children}
		</button>
	);
}

export function Controls() {
	const { resetTransform, zoomIn, zoomOut, centerView, state } = useControls();

	const handleZoomIn = useCallback(() => {
		zoomIn(0.2, 200, "easeInOutQuart");
	}, [zoomIn]);

	const handleZoomOut = useCallback(() => {
		zoomOut(0.2, 200, "easeInOutQuart");
	}, [zoomOut]);

	const handleCenterView = useCallback(() => {
		centerView(state.scale, 200, "easeInOutQuart");
	}, [centerView, state.scale]);

	const handleResetTransform = useCallback(() => {
		resetTransform(200, "easeInOutQuart");
	}, [resetTransform]);

	return (
		<div>
			<div className="absolute top-4 right-4 z-20 flex items-center gap-1.5">
				<ToolButton label="Zoom in" onClick={handleZoomIn}>
					<Plus className="size-4" />
				</ToolButton>

				<ToolButton label="Zoom out" onClick={handleZoomOut}>
					<Minus className="size-4" />
				</ToolButton>

				<ToolButton label="Recenter" onClick={handleCenterView}>
					<Maximize2 className="size-4" />
				</ToolButton>

				<ToolButton label="Reset build" onClick={handleResetTransform}>
					<RotateCcw className="size-4" />
				</ToolButton>
			</div>

			{/* <div className="relative z-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-border border-t px-4 py-3 font-mono text-[11px] text-muted-foreground sm:px-6">
				<span className="hidden items-center gap-1.5 sm:inline-flex">
					<span className="inline-block size-2.5 rounded-full border-2 border-accent" />{" "}
					Major perk
				</span>
				<span className="ml-auto hidden md:inline">
					Drag to pan · scroll buttons to zoom
				</span>
			</div> */}
		</div>
	);
}
