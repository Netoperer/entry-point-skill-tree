import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { classes } from "@/config/perks/classes";
import { cn } from "@/lib/utils";
import { useEntryPointStore } from "@/store/entry-point";
import { StarterClass } from "@/types";
import { User } from "lucide-react";

const CLASS_TO_ENUM: Record<string, StarterClass> = {
  Prodigy: StarterClass.Prodigy,
  "The Art of the Steal": StarterClass.TheArtOfTheSteal,
  "Combat Mastery": StarterClass.CombatMastery,
  "Demolitions Expert": StarterClass.DemolitionsExpert,
};

export default function StarterClassSettings() {
  const starterClass = useEntryPointStore((s) => s.starterClass);
  const changeStarterClass = useEntryPointStore((s) => s.changeStarterClass);

  return (
    <Card className="bg-card/60 md:backdrop-blur-md border-border/50 ring-1 ring-primary/5 hover:ring-primary/10 transition-all rounded-xl shadow-lg overflow-hidden">
      <CardHeader className="px-4 py-0 pb-0">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-secondary/10">
            <User className="size-4 text-primary" />
          </div>
          <span className="font-bold text-[14px] tracking-tight text-foreground">
            Starter Class
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-4 pt-1 pb-2">
        <div className="grid grid-cols-2 gap-2">
          {Object.values(classes).map((cls) => {
            const enumValue = CLASS_TO_ENUM[cls.name];
            const isActive = starterClass === enumValue;

            return (
              <button
                key={cls.name}
                onClick={() => changeStarterClass(enumValue)}
                className={cn(
                  "group relative flex flex-col items-center gap-1.5 py-2 px-2 rounded-lg transition-all duration-500 border-2",
                  isActive
                    ? "bg-secondary/80 border-secondary shadow-lg shadow-secondary/20 z-10 scale-[1.02]"
                    : "bg-transparent border-transparent opacity-40 hover:opacity-60 grayscale",
                )}
              >
                <div
                  className={cn(
                    "relative size-9 rounded-full overflow-hidden transition-all duration-500 shadow-sm",
                    isActive
                      ? "ring-2 ring-white/40 ring-offset-1 ring-offset-secondary/80 scale-105"
                      : "opacity-80",
                  )}
                >
                  <img
                    src={cls.icon}
                    alt={cls.name}
                    className="object-cover size-full"
                  />
                </div>
                <span
                  className={cn(
                    "text-[12px] font-bold tracking-tight transition-colors",
                    isActive
                      ? "text-secondary-foreground"
                      : "text-muted-foreground",
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
