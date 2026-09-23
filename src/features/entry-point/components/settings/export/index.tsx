import { Share } from "lucide-react";
import { useEntryPointStore } from "@/features/entry-point/store";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { ExportActions } from "./actions";
import { ExportControls } from "./controls";
import { ExportPreview } from "./preview";

export function ExportSettings() {
	const showPreview = useEntryPointStore((s) => s.showPreview);

	return (
		<Card className="border border-border">
			<CardHeader className="pb-3">
				<CardTitle className="flex items-center gap-2">
					<Share className="size-4" />
					Export
				</CardTitle>
				<CardAction>
					<ExportControls />
				</CardAction>
			</CardHeader>

			{showPreview && (
				<CardContent className="-mt-2">
					<ExportPreview />
				</CardContent>
			)}

			<CardContent className="-mt-2">
				<ExportActions />
			</CardContent>
		</Card>
	);
}
