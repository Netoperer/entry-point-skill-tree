import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEntryPointStore } from "@/store/entry-point";
import { Target } from "lucide-react";

export default function PerkLimit() {
  const perkLimit = useEntryPointStore((s) => s.perkLimit);
  const setPerkLimit = useEntryPointStore((s) => s.setPerkLimit);

  return (
    <Card className="bg-card/60 md:backdrop-blur-md border-border/50 ring-1 ring-primary/5 hover:ring-primary/10 transition-all rounded-xl shadow-md overflow-hidden">
      <CardContent className="px-4 py-0">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-primary/10">
                <Target className="size-4 text-primary" />
              </div>
              <span className="text-[13px] font-bold text-foreground/90">
                Limit
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xl font-black tabular-nums text-primary leading-none">
                {perkLimit}
              </span>
              <div className="flex gap-1">
                {[25, 40, 75, 100].map((val) => (
                  <button
                    key={val}
                    onClick={() => setPerkLimit(val)}
                    className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-black transition-all border",
                      perkLimit === val
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted",
                    )}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <input
            type="range"
            min="1"
            max="100"
            value={perkLimit}
            onChange={(e) => setPerkLimit(parseInt(e.target.value))}
            className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>
      </CardContent>
    </Card>
  );
}
