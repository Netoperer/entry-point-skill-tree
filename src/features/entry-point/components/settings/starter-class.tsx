import { Route } from "lucide-react";
import { classes } from "@/features/entry-point/config/perks/classes";
import { useEntryPointStore } from "@/features/entry-point/store";
import { StarterClass } from "@/features/entry-point/types";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";

const CLASS_TO_ENUM: Record<string, StarterClass> = {
	// biome-ignore lint/style/useNamingConvention: no
	Prodigy: StarterClass.Prodigy,
	"The Art of the Steal": StarterClass.TheArtOfTheSteal,
	"Combat Mastery": StarterClass.CombatMastery,
	"Demolitions Expert": StarterClass.DemolitionsExpert,
};

export function StarterClassSettings() {
	const starterClass = useEntryPointStore((s) => s.starterClass);
	const changeStarterClass = useEntryPointStore((s) => s.changeStarterClass);

	return (
		<Card className="border border-border">
			<CardHeader className="pb-3">
				<CardTitle className="flex items-center gap-2">
					<Route className="size-4" />
					Starter Class
				</CardTitle>
				<CardDescription>Choose your starting class.</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-2 gap-1.5">
					{Object.values(classes).map((cls) => {
						const enumValue = CLASS_TO_ENUM[cls.name];
						const isActive = starterClass === enumValue;

						return (
							<button
								type="button"
								key={cls.name}
								// biome-ignore lint/performance/noJsxPropsBind: it's fine
								onClick={() => changeStarterClass(enumValue)}
								className={cn(
									"flex items-center gap-3 rounded-lg border px-3 py-2 text-left transition-all",
									isActive
										? "border-primary/30 bg-primary/10 ring-1 ring-primary/20"
										: "border-transparent bg-muted/30 hover:bg-muted/50",
								)}
							>
								<div
									className={cn(
										"flex size-8 shrink-0 items-center justify-center rounded-full",
										isActive ? "bg-primary/20" : "bg-muted",
									)}
								>
									<img
										width="100%"
										height="100%"
										src={cls.icon}
										alt={cls.name}
										className={cn(
											"size-5 rounded-full",
											!isActive && "opacity-50 grayscale",
										)}
									/>
								</div>
								<span
									className={cn(
										"flex-1 truncate font-bold text-[12px]",
										isActive ? "text-foreground" : "text-muted-foreground",
									)}
								>
									{cls.name}
								</span>
							</button>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
}
