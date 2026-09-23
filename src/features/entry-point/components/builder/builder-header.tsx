import { Wrench } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/shared/components/ui/card";

export function BuilderHeader() {
	return (
		<Card className="shrink-0 rounded-xl border-border/50 bg-card/60 shadow-md ring-1 ring-primary/5 md:backdrop-blur-md">
			<CardHeader className="flex select-none flex-row items-center justify-between gap-3 px-4 py-0">
				<div className="flex min-w-0 items-center gap-2">
					<div className="shrink-0 rounded bg-primary/10 p-1">
						<Wrench className="size-4 text-primary" />
					</div>

					<CardTitle className="font-bold text-[15px] text-foreground/90 leading-none">
						Path Builder
					</CardTitle>
				</div>
			</CardHeader>
		</Card>
	);
}
