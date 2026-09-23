import { StopCircle } from "lucide-react";
import { useEntryPointStore } from "@/features/entry-point/store";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { SUGGESTED_PERK_LIMITS } from "../../constants";

export function PerkLimit() {
	const perkLimit = useEntryPointStore((s) => s.perkLimit);
	const setPerkLimit = useEntryPointStore((s) => s.setPerkLimit);

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
					// biome-ignore lint/style/noMagicNumbers: default max
					max={Math.max(100, perkLimit)}
					step={1}
					value={perkLimit}
					// biome-ignore lint/performance/noJsxPropsBind: no
					onChange={(event) => setPerkLimit(Number(event.target.value))}
					aria-label="Perk limit"
					className="h-2 w-full cursor-pointer accent-primary"
				/>

				<div className="flex items-center justify-between">
					<div className="flex gap-1">
						{SUGGESTED_PERK_LIMITS.map((limit) => (
							<Button
								key={limit}
								type="button"
								size="sm"
								variant={perkLimit === limit ? "default" : "outline"}
								// biome-ignore lint/performance/noJsxPropsBind: no
								onClick={() => setPerkLimit(limit)}
								className="px-3 font-mono text-xs"
							>
								{limit}
							</Button>
						))}
					</div>
					<Input
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
