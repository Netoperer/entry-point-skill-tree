import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import type { Perk } from "@/types/entry-point";
import { minors } from "@/config/entry-point/perks/minors";
import { Perks } from "@/config/entry-point/perks";
import { useEntryPointStore } from "@/store/entry-point";
import { selectUnlockedMinorPerksMap } from "@/store/entry-point/selectors";
import { cn } from "@/lib/utils";

const WEAPON_TRAININGS = [
  Perks.SmgTraining,
  Perks.RifleTraining,
  Perks.PistolTraining,
  Perks.SniperTraining,
  Perks.ShotgunTraining,
  Perks.HeavyWeaponsTraining,
];

export default function MinorPerksDetails() {
  const perks = Object.values(minors).filter(
    (perk) => !WEAPON_TRAININGS.includes(perk),
  );

  return (
    <Card className="w-full flex flex-col gap-3 p-4 transition-all duration-300 bg-card/60 md:backdrop-blur-md border-border/50 ring-1 ring-secondary/5 hover:ring-secondary/10 rounded-xl h-fit shrink-0">
      <CardHeader className="flex flex-row items-center gap-3 px-1 py-0 select-none">
        <div className="h-6 w-1 rounded-full bg-secondary shadow-[0_0_8px_rgba(var(--secondary-rgb),0.3)]" />
        <span className="font-bold text-lg tracking-tight text-foreground/90">
          Minor Perks
        </span>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <div className="grid grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-2 mt-3">
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

export function MinorPerkItem({ perk }: Props) {
  const count = useEntryPointStore(
    (store) => selectUnlockedMinorPerksMap(store).get(perk) ?? 0,
  );
  const isUnlocked = count > 0;

  return (
    <Item
      variant="outline"
      className={cn(
        "group relative overflow-hidden transition-all duration-300 w-full cursor-default rounded-lg py-2.5 px-2.5 border-transparent",
        "bg-muted/30 hover:bg-muted/40",
        isUnlocked && [
          "bg-secondary/10 border-secondary/15 shadow-sm",
          "hover:bg-secondary/15 hover:border-secondary/40",
        ],
      )}
    >
      <ItemContent className="flex flex-row items-center gap-2 w-full">
        <div
          className={cn(
            "relative flex size-7 shrink-0 items-center justify-center rounded-md transition-all duration-500",
            isUnlocked
              ? "bg-secondary/20"
              : "bg-muted/50 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100",
          )}
        >
          <img
            src={perk.icon}
            alt={perk.name}
            title={perk.description}
            width={16}
            height={16}
            className="z-10"
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

        <div className="w-5 flex justify-end shrink-0">
          {count > 0 && (
            <span className="flex items-center justify-center min-w-4 h-4 px-1 rounded-md text-[10px] font-black tabular-nums bg-secondary text-secondary-foreground">
              {count}
            </span>
          )}
        </div>
      </ItemContent>
    </Item>
  );
}
