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
  return (
    <Card className="gap-2 pt-1 shadow-none">
      <CardHeader className="flex flex-row items-center gap-3 px-5 py-4">
        <div className="h-7 w-1 rounded-full bg-foreground" />
        <span className="font-semibold text-xl">Minor Perks</span>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div className="grid grid-cols-3 gap-2.5">
          {...Object.entries(minors).map(([, perk]) => {
            if (WEAPON_TRAININGS.includes(perk)) {
              return;
            }

            return <MinorPerkItem perk={perk} />;
          })}
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
        "group transition-colors hover:bg-muted/60 w-full",
        isUnlocked && "bg-primary hover:bg-primary/90 w-full",
      )}
    >
      <ItemContent className="flex flex-row items-center gap-3 p-0">
        <ItemMedia>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
            <img
              src={perk.icon}
              alt={perk.name}
              title={perk.description}
              width={28}
              height={28}
            />
          </div>
        </ItemMedia>
        <div className="flex justify-between w-full">
          <ItemTitle className="text-sm font-medium leading-tight">
            {perk.name}
          </ItemTitle>
          <ItemActions>{count}</ItemActions>
        </div>
      </ItemContent>
    </Item>
  );
}
