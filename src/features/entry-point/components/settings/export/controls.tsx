import { Eye, EyeOff, Image as ImageIcon, ImageOff } from "lucide-react";
import { useEntryPointStore } from "@/features/entry-point/store";
import { cn } from "@/shared/lib/utils";

export function ExportControls() {
	const showPreview = useEntryPointStore((s) => s.showPreview);
	const setShowPreview = useEntryPointStore((s) => s.setShowPreview);
	const withBackground = useEntryPointStore((s) => s.withBackground);
	const setWithBackground = useEntryPointStore((s) => s.setWithBackground);

	return (
		<div className="flex items-center gap-2">
			<button
				type="button"
				// biome-ignore lint/performance/noJsxPropsBind: no
				onClick={() => setShowPreview(!showPreview)}
				className={cn(
					"rounded-md border border-border/50 bg-muted/30 p-1 transition-all",
					showPreview
						? "text-primary hover:bg-muted/50"
						: "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
				)}
				title={showPreview ? "Hide Preview" : "Show Preview"}
			>
				{showPreview ? (
					<Eye className="size-3" />
				) : (
					<EyeOff className="size-3" />
				)}
			</button>

			<button
				type="button"
				// biome-ignore lint/performance/noJsxPropsBind: no
				onClick={() => setWithBackground(!withBackground)}
				className={cn(
					"rounded-md border border-border/50 bg-muted/30 p-1 transition-all",
					withBackground
						? "text-primary hover:bg-muted/50"
						: "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
				)}
				title={withBackground ? "Hide Background" : "Show Background"}
			>
				{withBackground ? (
					<ImageIcon className="size-3" />
				) : (
					<ImageOff className="size-3" />
				)}
			</button>
		</div>
	);
}
