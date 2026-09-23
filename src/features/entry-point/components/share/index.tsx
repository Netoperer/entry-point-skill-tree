import { useEffect } from "react";
import { initCache } from "../../config/image-cache";
import { useEntryPointStore } from "../../store";
import { DownloadCard } from "./download-card";
import { ExportCard } from "./export-card";
import { ShareCard } from "./share-card";

export function Share() {
	const setIsCacheInitialized = useEntryPointStore(
		(s) => s.setIsCacheInitialized,
	);
	useEffect(() => {
		initCache().then(() => setIsCacheInitialized(true));
	}, [setIsCacheInitialized]);

	return (
		<div className="space-y-3">
			<ShareCard />
			<ExportCard />
			<DownloadCard />
		</div>
	);
}
