import { StopCircle } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { useFreelancersCutStore } from "../../store";

export function PerkLimit() {
	const perkLimit = useFreelancersCutStore((s) => s.perkLimit);
	const setPerkLimit = useFreelancersCutStore((s) => s.setPerkLimit);

	return (
		<Card className="border border-border">
			<CardHeader className="pb-3">
				<CardTitle className="flex items-center justify-between gap-3">
					<span className="flex items-center gap-2">
						<StopCircle className="size-4" />
						Perk limit
					</span>
					<Badge variant="secondary" className="font-mono text-xs">
						{perkLimit}
					</Badge>
				</CardTitle>
				<CardDescription>Set the perk limit.</CardDescription>
			</CardHeader>
			<CardContent className="space-y-2">
				<input
					id="perk-limit"
					type="range"
					min={1}
					max={Math.max(50, perkLimit)}
					step={1}
					value={perkLimit}
					onChange={(event) => setPerkLimit(Number(event.target.value))}
					aria-label="Perk limit"
					className="h-2 w-full cursor-pointer accent-primary"
				/>

				<div className="flex items-center justify-between">
					{[50].map((limit) => (
						<Button
							key={limit}
							type="button"
							size="sm"
							variant={perkLimit === limit ? "default" : "outline"}
							onClick={() => setPerkLimit(limit)}
							className="px-3 font-mono text-xs"
						>
							{limit}
						</Button>
					))}
					<input
						type="number"
						min={1}
						max={999}
						value={perkLimit}
						aria-label="Custom perk limit"
						title="Custom perk limit"
						// biome-ignore lint/performance/noJsxPropsBind: no
						onChange={(event) => {
							const next = Number(event.target.value);
							if (Number.isFinite(next)) {
								// biome-ignore lint/style/noMagicNumbers: no
								setPerkLimit(Math.min(999, Math.max(1, Math.trunc(next))));
							}
						}}
						className="h-8 w-20 rounded-md border border-input bg-background px-2 font-mono text-xs outline-none focus:border-primary"
					/>
				</div>
			</CardContent>
		</Card>
	);
}
