/** biome-ignore-all lint/style/noMagicNumbers: zoom controls */
/** biome-ignore-all lint/security/noSecrets: easing function names */
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
	);
}
