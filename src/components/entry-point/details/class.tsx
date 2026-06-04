import { Card, CardHeader } from "@/components/ui/card";
import { getClassPerksTitle } from "@/core/entry-point/getClassPerksTitle";
import { useEntryPointStore } from "@/store/entry-point";
import { selectUnlockedClassPerks } from "@/store/entry-point/selectors";

export default function ClassDetails() {
  const classesUnlocked = useEntryPointStore(selectUnlockedClassPerks);

  return (
    <Card className="w-full flex flex-col gap-4 p-5 transition-all duration-300 bg-card/60 backdrop-blur-md border-border/50 ring-1 ring-primary/5 hover:ring-primary/10 shadow-lg rounded-2xl">
      <CardHeader className="px-2 py-0 flex flex-row justify-between items-center">
        <div className="flex flex-row items-center select-none gap-4">
          <div className="h-8 w-1 rounded-full bg-primary/60 shadow-[0_0_8px_rgba(var(--primary-rgb),0.4)]" />
          <span className="font-bold text-xl tracking-tight text-foreground/90">
            Class
          </span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex -space-x-3">
            {[...classesUnlocked].map((perk, i) => (
              <div key={perk.name} className="relative group">
                <img
                  src={perk.icon}
                  width={32}
                  title={perk.description}
                  height={32}
                  className="rounded-full border-2 border-card bg-muted/80 shadow-sm transition-transform group-hover:scale-110 z-10 relative hover:z-100"
                />
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
          <span className="text-[16px] font-black text-primary/90 px-2 py-1">
            {getClassPerksTitle(classesUnlocked)}
          </span>
        </div>
      </CardHeader>
    </Card>
  );
}
