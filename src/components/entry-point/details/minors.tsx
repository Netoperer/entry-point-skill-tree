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
  const [isOpen, setIsOpen] = useState(true);
  const perks = Object.values(minors).filter(
    (perk) => !WEAPON_TRAININGS.includes(perk),
  );

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="gap-2 pt-2 shadow-none transition-all duration-200">
        <CollapsibleTrigger asChild>
          <CardHeader className="flex flex-row items-center gap-3 px-5 py-4 cursor-pointer hover:bg-muted/30 select-none">
            <div className="h-7 w-1 rounded-full bg-secondary shadow-sm shadow-secondary/50" />
            <span className="font-semibold text-xl flex-1 text-left">
              Minor Perks
            </span>
            <ChevronDown
              className={cn(
                "h-5 w-5 text-muted-foreground transition-transform duration-200",
                isOpen ? "rotate-0" : "-rotate-90",
              )}
            />
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="px-5 pb-5">
            <div className="grid grid-cols-3 gap-2.5">
              {perks.map((perk) => (
                <MinorPerkItem key={perk.name} perk={perk} />
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
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
          "border-secondary/40 bg-secondary/10",
          "hover:bg-secondary/15 hover:border-secondary/60 shadow-sm shadow-secondary/10",
        ],
      )}
    >
      {isUnlocked && (
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-secondary/60 to-transparent" />
      )}

      <ItemContent className="flex flex-row items-center gap-1.5 p-1.5">
        <ItemMedia>
          <div className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-md transition-colors",
            isUnlocked ? "bg-secondary/20" : "bg-muted"
          )}>
            <img
              src={perk.icon}
              alt={perk.name}
              title={perk.description}
              width={28}
              height={28}
              className={cn(isUnlocked ? "opacity-100" : "opacity-40 grayscale")}
            />
          </div>
        </ItemMedia>

        <ItemTitle
          className={cn(
            "flex-1 min-w-0 font-semibold leading-tight truncate",
            isUnlocked ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {perk.name}
        </ItemTitle>

        <ItemActions>
          {count > 0 && (
            <span className="flex items-center justify-center h-6 w-6 min-w-4 px-1 rounded text-[12px] font-bold tabular-nums bg-secondary text-secondary-foreground">
              {count}
            </span>
          )}
        </ItemActions>
      </ItemContent>
    </Item>
  );
}
