import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Item, ItemContent, ItemTitle } from "@/shared/components/ui/item";
import { useFreelancersCutStore } from "@/features/freelancers-cut/store";
import { selectUnlockedMinorsMap } from "@/features/freelancers-cut/store/selectors";
import { minors } from "@/features/freelancers-cut/config/perks/minors";
import type { Perk } from "@/features/freelancers-cut/types";
import { cn } from "@/shared/lib/utils";

export default function MinorPerksDetails() {
  const perks = Object.values(minors);

  return (
    <Card className="w-full flex flex-col gap-3 p-4 transition-all duration-300 bg-card/60 md:backdrop-blur-md border-border/50 ring-1 ring-secondary/5 hover:ring-secondary/10 rounded-2xl h-fit shrink-0 shadow-lg">
      <CardHeader className="flex flex-row items-center gap-3 px-1 py-0 select-none">
        <div className="h-6 w-1 rounded-full bg-secondary shadow-[0_0_8px_rgba(var(--secondary-rgb),0.3)]" />
        <span className="font-bold text-lg tracking-tight text-foreground/90">
          Minor Perks
        </span>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <div className="grid grid-cols-1 gap-2">
          {perks.map((perk) => (
            <MinorPerkItem key={perk.name} perk={perk} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface Props {
  perk: Perk;
}

function MinorPerkItem({ perk }: Props) {
  const count = useFreelancersCutStore(
    (store) => selectUnlockedMinorsMap(store).get(perk) ?? 0,
  );
  const isUnlocked = count > 0;

  return (
    <Item
      variant="outline"
      className={cn(
        "group relative overflow-hidden transition-all duration-300 w-full cursor-default rounded-xl py-2 px-3 border-transparent",
        "bg-muted/20 hover:bg-muted/30",
        isUnlocked && [
          "bg-secondary/5 border-secondary/10 shadow-sm",
          "hover:bg-secondary/10 hover:border-secondary/30",
        ],
      )}
    >
      <ItemContent className="flex flex-row items-center gap-3 w-full">
        <div
          className={cn(
            "relative flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-500",
            isUnlocked
              ? "bg-secondary/20 shadow-[0_0_10px_rgba(var(--secondary-rgb),0.2)]"
              : "bg-muted/50 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100",
          )}
        >
          <img
            src={perk.icon}
            alt={perk.name}
            title={perk.description(Math.max(0, count))}
            width={18}
            height={18}
            className="z-10 rounded-full"
          />
        </div>

        <ItemTitle
          className={cn(
            "flex-1 font-bold text-[11px] leading-tight tracking-tight truncate",
            isUnlocked ? "text-foreground" : "text-muted-foreground/60",
          )}
          title={perk.name}
        >
          {perk.name}
        </ItemTitle>

        <div className="w-5 flex justify-end shrink-0">
          {count > 0 && (
            <span className="flex items-center justify-center min-w-5 h-5 px-1.5 rounded-lg text-[10px] font-black tabular-nums bg-secondary text-secondary-foreground shadow-sm">
              {count}
            </span>
          )}
        </div>
      </ItemContent>
    </Item>
  );
}
