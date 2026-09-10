import { Check, Copy, Link2 } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router";
import { Button } from "@/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";

export function ShareCard() {
	const [copied, setCopied] = useState(false);
	const location = useLocation();

	return (
		<Card className="border border-border">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Link2 className="size-4" />
					Share build
				</CardTitle>
				<CardDescription>
					Copy a link that encodes your current tree.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex items-center gap-2">
					<code className="flex-1 truncate rounded-md border border-border bg-background/60 px-3 py-2 font-mono text-muted-foreground text-xs">
						{globalThis.location.href}/{location.pathname}/{location.search}
					</code>
					<Button
						size="sm"
						// biome-ignore lint/performance/noJsxPropsBind: no
						onClick={() => {
							setCopied(true);
							// biome-ignore lint/style/noMagicNumbers: no
							setTimeout(() => setCopied(false), 1500);
						}}
					>
						{copied ? (
							<Check className="size-4" />
						) : (
							<Copy className="size-4" />
						)}
						{copied ? "Copied" : "Copy"}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
