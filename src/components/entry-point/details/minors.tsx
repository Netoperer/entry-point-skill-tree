import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemMedia,
  ItemActions,
} from "@/components/ui/item";
import type { Perk } from "@/types";
import { minors } from "@/config/perks/minors";
import { Perks } from "@/config/perks";
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
    <Card className="shadow-none border-border/50">
      <CardHeader className="flex flex-row items-center gap-3 px-4  border-b border-border/40">
        <div className="h-4 w-0.5 rounded-full bg-primary" />
        <span className="font-semibold text-sm tracking-tight">
          Minor Perks
        </span>
        <span className="ml-auto text-xs text-muted-foreground tabular-nums">
          {perks.length} perks
        </span>
      </CardHeader>
      <CardContent className="p-2">
        <div className="grid grid-cols-3 gap-1.5">
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
        "group relative overflow-hidden transition-all duration-200 w-full cursor-default",
        "border border-border/50 hover:border-border hover:bg-muted/40",
        isUnlocked && [
          "border-primary/40 bg-primary/10",
          "hover:bg-primary/15 hover:border-primary/60",
        ],
      )}
    >
      {isUnlocked && (
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent" />
      )}

      <ItemContent className="flex flex-row items-center gap-1.5 p-1.5">
        <ItemMedia>
          <div
            className={cn(
              "flex h-7 w-7 shrink-0 items-center justify-center rounded transition-colors",
              isUnlocked ? "bg-primary/20" : "bg-muted",
            )}
          >
            <img
              src={perk.icon}
              alt={perk.name}
              title={perk.description}
              width={20}
              height={20}
              className={cn(!isUnlocked && "opacity-50 grayscale")}
            />
          </div>
        </ItemMedia>

        <ItemTitle
          className={cn(
            "flex-1 min-w-0 text-xs font-semibold leading-tight truncate",
            isUnlocked ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {perk.name}
        </ItemTitle>

        <ItemActions>
          {count > 0 && (
            <span className="flex items-center justify-center h-6 w-6 min-w-4 px-1 rounded text-[12px] font-bold tabular-nums bg-primary text-primary-foreground">
              {count}
            </span>
          )}
        </ItemActions>
      </ItemContent>
    </Item>
  );
}
