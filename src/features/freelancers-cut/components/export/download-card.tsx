import { Download } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { useFreelancersCutStore } from "../../store";
import { selectExportUrl } from "../../store/selectors/select-export-url";
import { selectPerkCount } from "../../store/selectors/select-perks";
import { downloadImage } from "./utils";

export function DownloadCard() {
	const [value, setValue] = useState("{class}-{perkcount}-tree");

	// TODO: add class recognition for trees
	const characterClass = "Freelancer";
	const perkCount = useFreelancersCutStore(selectPerkCount);
	const exportUrl = useFreelancersCutStore(selectExportUrl);

	const filename = `${value
		.replaceAll("{class}", characterClass)
		.replaceAll("{perkcount}", `${perkCount}`)}.png`;

	const handleClick = useCallback(() => {
		downloadImage(exportUrl, filename);
	}, [exportUrl, filename]);

	return (
		<Card className="overflow-hidden rounded-xl border border-border py-4 shadow-md transition-all md:backdrop-blur-md">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Download className="size-4 text-primary" />
					Download
				</CardTitle>
				<CardAction>{filename}</CardAction>
			</CardHeader>
			<CardContent className="-mt-2 px-4">
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-2">
						<Input
							type="text"
							placeholder="filename"
							defaultValue="{class}-{perkcount}"
							value={value}
							// biome-ignore lint/performance/noJsxPropsBind: no
							onChange={(e) => setValue(e.target.value)}
							aria-label="Filename"
							className="flex-1"
						/>
						<Input
							type="text"
							value=".png"
							disabled={true}
							readOnly={true}
							aria-label="File extension"
							className="w-16 shrink-0 text-center tabular-nums opacity-80"
						/>
					</div>
					<Button
						type="button"
						size="sm"
						className="h-10 w-full"
						onClick={handleClick}
					>
						<Download className="size-4" />
						Download
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
