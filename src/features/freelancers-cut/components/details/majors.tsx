import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Item, ItemContent, ItemTitle } from "@/shared/components/ui/item";
import { useFreelancersCutStore } from "@/features/freelancers-cut/store";
import { selectUnlockedMajorsMap } from "@/features/freelancers-cut/store/selectors";
import { majors } from "@/features/freelancers-cut/config/perks/majors";
import type { Perk } from "@/features/freelancers-cut/types";
import { cn } from "@/shared/lib/utils";

export default function MajorPerksDetails() {
  const majorsMap = useFreelancersCutStore(selectUnlockedMajorsMap);
  const perks = Object.values(majors).sort((a, b) => {
    const countA = majorsMap.get(a) ?? 0;
    const countB = majorsMap.get(b) ?? 0;
    return countB - countA;
  });

  return (
    <Card className="w-full flex flex-col gap-3 p-4 transition-all duration-300 bg-card/60 md:backdrop-blur-md border-border/50 ring-1 ring-primary/5 hover:ring-primary/10 rounded-xl h-fit shrink-0">
      <CardHeader className="flex flex-row items-center gap-3 px-1 py-0 select-none">
        <div className="h-6 w-1 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.3)]" />
        <span className="font-bold text-lg tracking-tight text-foreground/90">
          Major Perks
        </span>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <div className="grid grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-2 mt-3">
          {perks.map((perk) => (
            <MajorPerkItem key={perk.name} perk={perk} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface Props {
  perk: Perk;
}

function MajorPerkItem({ perk }: Props) {
  const count = useFreelancersCutStore(
    (store) => selectUnlockedMajorsMap(store).get(perk) ?? 0,
  );
  const isUnlocked = count > 0;

  return (
    <Item
      variant="outline"
      className={cn(
        "group relative overflow-hidden transition-all duration-300 w-full cursor-default rounded-lg py-2.5 px-2.5 border-transparent",
        "bg-muted/30 hover:bg-muted/40",
        isUnlocked && [
          "bg-primary/10 border-primary/15 shadow-sm",
          "hover:bg-primary/15 hover:border-primary/40",
        ],
      )}
    >
      <ItemContent className="flex flex-row items-center gap-2 w-full">
        <div
          className={cn(
            "relative flex size-7 shrink-0 items-center justify-center rounded-full transition-all duration-500",
            isUnlocked
              ? "bg-primary/20"
              : "bg-muted/50 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100",
          )}
        >
          <img
            src={perk.icon}
            alt={perk.name}
            title={perk.description(Math.max(0, count - 1))}
            width={16}
            height={16}
            className="z-10 rounded-full"
          />
        </div>

        <ItemTitle
          className={cn(
            "flex-1 font-bold text-[11px] leading-tight tracking-tight truncate overflow-hidden whitespace-nowrap",
            isUnlocked ? "text-foreground" : "text-muted-foreground/60",
          )}
          title={perk.name}
        >
          {perk.name}
        </ItemTitle>

        <div className="flex items-center gap-1 shrink-0">
          <div className="flex gap-0.5">
            {[1, 2, 3].map((level) => (
              <div
                key={level}
                className={cn(
                  "size-1.5 rounded-full transition-all duration-300",
                  level <= count ? "bg-primary" : "bg-muted-foreground/20",
                )}
              />
            ))}
          </div>
        </div>
      </ItemContent>
    </Item>
  );
}
