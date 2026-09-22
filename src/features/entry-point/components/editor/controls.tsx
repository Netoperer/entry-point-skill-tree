/** biome-ignore-all lint/style/noMagicNumbers: zoom controls */
/** biome-ignore-all lint/performance/noJsxPropsBind: shut up */
/** biome-ignore-all lint/security/noSecrets: easing function names */
import { Minus, Plus, Redo, RotateCcw, Undo } from "lucide-react";
import { useCallback } from "react";
import { useControls } from "react-zoom-pan-pinch";
import { useEntryPointStore } from "../../store";

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
	const { resetTransform, zoomIn, zoomOut } = useControls();
	const { undo, redo } = useEntryPointStore.temporal.getState();

	const handleZoomIn = useCallback(() => {
		zoomIn(0.2, 100, "easeInOutQuart");
	}, [zoomIn]);

	const handleZoomOut = useCallback(() => {
		zoomOut(0.2, 100, "easeInOutQuart");
	}, [zoomOut]);

	const handleResetTransform = useCallback(() => {
		resetTransform(100, "easeInOutQuart");
	}, [resetTransform]);

	return (
		<>
			<div className="absolute top-2 left-2 z-20 flex items-center gap-1.5 lg:top-4 lg:left-4">
				<ToolButton
					label="Undo"
					onClick={() => {
						undo();
					}}
				>
					<Undo className="size-4" />
				</ToolButton>

				<ToolButton
					label="Redo"
					onClick={() => {
						redo();
					}}
				>
					<Redo className="size-4" />
				</ToolButton>
			</div>

			<div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 lg:top-4 lg:right-4">
				<ToolButton label="Zoom in" onClick={handleZoomIn}>
					<Plus className="size-4" />
				</ToolButton>

				<ToolButton label="Zoom out" onClick={handleZoomOut}>
					<Minus className="size-4" />
				</ToolButton>

				<ToolButton label="Reset build" onClick={handleResetTransform}>
					<RotateCcw className="size-4" />
				</ToolButton>
			</div>
		</>
	);
}
