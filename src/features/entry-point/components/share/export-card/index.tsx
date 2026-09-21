import { Share } from "lucide-react";
import {
	Card,
	CardAction,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { useEntryPointStore } from "../../../store";
import { ExportControls } from "../controls";
import { CopyButton } from "./copy-button";
import { ExportPreview } from "./preview";

export function ExportCard() {
	const showPreview = useEntryPointStore((s) => s.showPreview);

	return (
		<Card className="overflow-hidden rounded-xl border border-border py-4 shadow-md transition-all md:backdrop-blur-md">
			<CardHeader className="pb-3">
				<CardTitle className="flex items-center gap-2">
					<Share className="size-4 text-primary" />
					Export
				</CardTitle>
				<CardAction>
					<ExportControls />
				</CardAction>
			</CardHeader>

			{showPreview && (
				<CardContent className="-mt-2 px-4">
					<div className="flex flex-col gap-3">
						<ExportPreview />
					</div>
				</CardContent>
			)}

			<CardFooter className="-mt-2 px-4">
				<CopyButton />
			</CardFooter>
		</Card>
	);
}
