import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEntryPointStore } from "@/store/entry-point";

export default function PerkCount() {
  const perkLimit = useEntryPointStore((s) => s.perkLimit);
  const unlockedPerkCount = useEntryPointStore((s) => s.unlockedNodes.size);

  return (
    <Card className="w-full p-3 transition-all duration-300 bg-card/60 backdrop-blur-md border-border/50 ring-1 ring-primary/5 hover:ring-primary/10 rounded-xl">
      <CardHeader className="flex flex-row items-center gap-2 px-1 py-0 select-none justify-between">
        <div className="font-bold text-[15px] tracking-tight text-foreground/90">
          Perks:
        </div>
        <div
          className={cn(
            "text-[14px] font-bold",
            unlockedPerkCount >= perkLimit
              ? "text-destructive"
              : "text-primary",
          )}
        >
          {unlockedPerkCount}/{perkLimit}
        </div>
      </CardHeader>
    </Card>
  );
}
