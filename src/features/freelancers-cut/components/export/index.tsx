import { useEffect } from "react";
import { initCache } from "../../config/image-cache";
import { useFreelancersCutStore } from "../../store";
import { DownloadCard } from "./download-card";
import { ExportCard } from "./export-card";
import { ShareCard } from "./share";

export function Export() {
	const setIsCacheInitialized = useFreelancersCutStore(
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
