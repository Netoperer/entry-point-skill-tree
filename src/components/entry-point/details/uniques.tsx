import { uniques } from "@/config/perks/uniques";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import type { Perk } from "@/types";
import { useEntryPointStore } from "@/store/entry-point";
import { selectUnlockedUniquePerks } from "@/store/entry-point/selectors";
import { cn } from "@/lib/utils";

export default function UniquePerksDetails() {
  return (
    <Card className="flex flex-1 gap-2 p-3 transition-all duration-300 bg-card/60 md:backdrop-blur-md border-border/50 ring-1 ring-primary/5 hover:ring-primary/10 rounded-xl h-fit shrink-0">
      <CardHeader className="flex flex-row items-center gap-2 px-1 py-0 select-none">
        <div className="h-5 w-1 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.3)]" />
        <span className="font-bold text-base tracking-tight text-foreground/90">
          Unique Perks
        </span>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-1.5 mt-2">
          {Object.values(uniques).map((perk) => (
            <UniquePerkItem key={perk.name} perk={perk} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface Props {
  perk: Perk;
}

export function UniquePerkItem({ perk }: Props) {
  const isUnlocked = useEntryPointStore((store) =>
    selectUnlockedUniquePerks(store).has(perk),
  );

  return (
    <Item
      variant="outline"
      className={cn(
        "p-1.5 group relative overflow-hidden transition-all duration-300 w-full cursor-default rounded-lg border-transparent",
        "bg-muted/30 hover:bg-muted/40",
        isUnlocked && [
          "bg-primary/10 border-primary/10 shadow-sm",
          "hover:bg-primary/15 hover:border-primary/30",
        ],
      )}
    >
      <ItemContent className="flex flex-row items-center gap-2">
        <div
          className={cn(
            "relative flex size-7 shrink-0 items-center justify-center rounded-md transition-all duration-500",
            isUnlocked
              ? "bg-primary/20"
              : "bg-muted/50 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100",
          )}
        >
          <img
            src={perk.icon}
            alt={perk.name}
            title={perk.description}
            width={18}
            height={18}
            className="z-10"
          />
        </div>

        <ItemTitle
          className={cn(
            "flex-1 font-bold text-[12px] tracking-tight truncate",
            isUnlocked ? "text-foreground" : "text-muted-foreground/60",
          )}
        >
          {perk.name}
        </ItemTitle>
      </ItemContent>
    </Item>
  );
}
