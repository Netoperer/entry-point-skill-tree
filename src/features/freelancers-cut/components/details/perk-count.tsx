import { Card, CardHeader } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import { useFreelancersCutStore } from "@/features/freelancers-cut/store";

export default function PerkCount() {
  const perkLimit = useFreelancersCutStore((s) => s.perkLimit);
  const unlockedPerkCount = useFreelancersCutStore((s) => s.unlockedNodes.size);

  return (
    <Card className="w-full h-full p-0 flex flex-row items-center transition-all duration-300 bg-card/60 md:backdrop-blur-md border-border/50 ring-1 ring-primary/5 hover:ring-primary/10 rounded-xl shadow-lg min-h-[56px]">
      <div className="flex flex-row items-center gap-2 px-4 py-0 select-none justify-between w-full">
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
      </div>
    </Card>
  );
}
