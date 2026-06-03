import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemMedia,
  ItemActions,
} from "@/components/ui/item";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Perk } from "@/types";
import { minors } from "@/config/perks/minors";
import { Perks } from "@/config/perks";
import { useEntryPointStore } from "@/store/entry-point";
import { selectUnlockedMinorPerksMap } from "@/store/entry-point/selectors";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

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
    <Card className="w-full flex flex-col gap-4 p-4 shadow-none transition-all duration-200 bg-card/50 h-fit shrink-0">
      <CardHeader className="flex flex-row items-center gap-3 px-2 py-0 select-none">
        <div className="h-6 w-1 rounded-full bg-secondary shadow-sm shadow-secondary/50" />
        <span className="font-semibold text-lg flex-1 text-left">
          Minor Perks
        </span>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <div className="grid grid-cols-3 gap-2 mt-2">
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
        "group relative overflow-hidden transition-all duration-200 w-full cursor-default rounded-lg py-4 px-2",
        "border border-border/50 hover:border-border hover:bg-muted/40",
        isUnlocked && [
          "border-secondary/40 bg-secondary/10",
          "hover:bg-secondary/15 hover:border-secondary/60 shadow-sm shadow-secondary/10",
        ],
      )}
    >
      {isUnlocked && (
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-secondary/60 to-transparent" />
      )}

      <ItemContent className="flex flex-row items-center max-w-full">
        <ItemMedia className="pr-1">
          <div
            className={cn(
              "flex size-6 shrink-0 items-center justify-center rounded-md transition-colors",
              isUnlocked ? "bg-secondary/20" : "bg-muted",
            )}
          >
            <img
              src={perk.icon}
              alt={perk.name}
              title={perk.description}
              width={16}
              height={16}
              className={cn(
                isUnlocked ? "opacity-100" : "opacity-40 grayscale",
              )}
            />
          </div>
        </ItemMedia>

        <ItemTitle
          className={cn(
            "flex-1 min-w-0 font-medium text-[12px] leading-tight text-nowrap text-ellipsis!",
            isUnlocked ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {perk.name}
        </ItemTitle>

        <ItemActions className="pl-1">
          {count > 0 && (
            <span className="flex items-center justify-center size-6 min-w-3 px-1 rounded text-[10px] font-bold tabular-nums bg-secondary text-secondary-foreground">
              {count}
            </span>
          )}
        </ItemActions>
      </ItemContent>
    </Item>
  );
}
