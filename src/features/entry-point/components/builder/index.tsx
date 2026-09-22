import { Wrench } from "lucide-react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";

export function Builder() {
	return (
		<div className="flex h-full w-full flex-col gap-3">
			<Card className="border border-border">
				<CardHeader className="py-0">
					<CardTitle className="flex items-center gap-2">
						<Wrench className="size-4" />
						Path Builder
					</CardTitle>
				</CardHeader>
			</Card>

			<Card className="flex flex-1 flex-col overflow-hidden rounded-xl border border-border">
				<CardContent className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-12 text-center">
					<div className="rounded-full bg-muted p-3">
						<Wrench className="size-5 text-muted-foreground" />
					</div>
					<p className="max-w-xs text-muted-foreground text-sm leading-relaxed">
						Coming soon.
						<br />
						This feature is currently under development.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
