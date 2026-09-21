import { Check, Copy } from "lucide-react";
import { useCallback, useState } from "react";
import { useEntryPointStore } from "@/features/entry-point/store";
import { selectExportUrl } from "@/features/entry-point/store/selectors/select-export-url";
import { Button } from "@/shared/components/ui/button";
import { copyImageToClipboard } from "../utils";

export function CopyButton() {
	const [copied, setCopied] = useState(false);
	const exportUrl = useEntryPointStore(selectExportUrl);

	const isCacheInitialized = useEntryPointStore((s) => s.isCacheInitialized);

	const handleCopy = useCallback(async () => {
		const success = await copyImageToClipboard(exportUrl);
		if (success) {
			setCopied(true);
			// biome-ignore lint/style/noMagicNumbers: debounce
			setTimeout(() => setCopied(false), 2000);
		}
	}, [exportUrl]);

	return (
		<Button
			variant="outline"
			size="sm"
			className="h-10 w-full font-[11px]"
			onClick={handleCopy}
			disabled={!isCacheInitialized}
		>
			{copied ? (
				<Check className="mr-1 size-3 text-green-500" />
			) : (
				<Copy className="mr-1 size-3" />
			)}
			{copied ? "Copied!" : "Save to clipboard"}
		</Button>
	);
}
