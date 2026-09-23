import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { initCache } from "@/features/freelancers-cut/config/image-cache";
import { useFreelancersCutStore } from "@/features/freelancers-cut/store";
import { selectExportUrl } from "@/features/freelancers-cut/store/selectors/select-export-url";

export function ExportPreview() {
	const exportUrl = useFreelancersCutStore(selectExportUrl);
	const isCacheInitialized = useFreelancersCutStore(
		(s) => s.isCacheInitialized,
	);
	const setIsCacheInitialized = useFreelancersCutStore(
		(s) => s.setIsCacheInitialized,
	);

	useEffect(() => {
		initCache().then(() => setIsCacheInitialized(true));
	}, [setIsCacheInitialized]);

	return (
		<div className="group/preview fade-in zoom-in-95 relative flex aspect-square w-full animate-in items-center justify-center overflow-hidden rounded-lg border border-border/50 bg-muted/20 duration-200">
			{isCacheInitialized && exportUrl ? (
				<img
					width="100%"
					height="100%"
					src={exportUrl}
					alt="Tree Preview"
					className="h-full w-full object-contain"
				/>
			) : (
				<div className="flex flex-col items-center gap-2 text-muted-foreground">
					<Loader2 className="size-6 animate-spin opacity-50" />
					<span className="font-bold text-[10px] uppercase tracking-widest">
						Generating...
					</span>
				</div>
			)}
		</div>
	);
}
