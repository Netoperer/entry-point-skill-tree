import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import { useEntryPointStore } from "@/store/entry-point";
import {
  selectUnlockedWeaponMasteries,
  selectUnlockedMinorPerksMap,
} from "@/store/entry-point/selectors";
import { Perks } from "@/config/entry-point/perks";
import type { Perk } from "@/types/entry-point";
import { cn } from "@/lib/utils";

const MASTER_TRAINING_MAP: Record<string, Perk> = {
  "Pistol Mastery": Perks.PistolTraining,
  "SMG Mastery": Perks.SmgTraining,
  "Rifle Mastery": Perks.RifleTraining,
  "Shotgun Mastery": Perks.ShotgunTraining,
  "Heavy Weapons Mastery": Perks.HeavyWeaponsTraining,
  "Sniper Mastery": Perks.SniperTraining,
};

export default function WeaponMasteriesDetails() {
  const masteriesUnlocked = useEntryPointStore(selectUnlockedWeaponMasteries);

  return (
    <Card className="w-full flex flex-col gap-3 p-4 transition-all duration-300 bg-card/60 md:backdrop-blur-md border-border/50 ring-1 ring-primary/5 hover:ring-primary/10 rounded-xl h-fit shrink-0">
      <CardHeader className="flex flex-row items-center gap-3 px-1 py-0 select-none">
        <div className="h-6 w-1 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.3)]" />
        <span className="font-bold text-lg tracking-tight text-foreground/90">
          Weapon Masteries
        </span>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        {masteriesUnlocked.size === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 px-4 text-center">
            <span className="text-[11px] font-bold text-muted-foreground/40 tracking-[0.2em]">
              No Masteries Unlocked
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 mt-3">
            {[...masteriesUnlocked].map((mastery) => (
              <WeaponMasteryItem key={mastery.name} mastery={mastery} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function WeaponMasteryItem({ mastery }: { mastery: Perk }) {
  const trainingPerk = MASTER_TRAINING_MAP[mastery.name];
  const trainingCount = useEntryPointStore(
    (store) => selectUnlockedMinorPerksMap(store).get(trainingPerk) ?? 0,
  );

  return (
    <Item
      variant="outline"
      className="group relative overflow-hidden transition-all duration-300 w-full cursor-default rounded-lg py-2.5 px-2.5 border-transparent bg-primary/10 shadow-sm hover:bg-primary/15 hover:border-primary/40"
    >
      <ItemContent className="flex flex-row items-center gap-2 w-full">
        <div className="relative flex size-7 shrink-0 items-center justify-center rounded-md transition-all duration-500 bg-primary/20">
          <img
            src={mastery.icon}
            alt={mastery.name}
            title={mastery.description}
            width={16}
            height={16}
            className="z-10"
          />
        </div>

        <ItemTitle
          className="flex-1 font-bold text-[11px] leading-tight tracking-tight truncate overflow-hidden whitespace-nowrap text-foreground"
          title={mastery.name}
        >
          {mastery.name}
        </ItemTitle>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-bold text-muted-foreground tracking-widest">
            Training:
          </span>
          <div className="w-5 flex justify-end">
            <span className="flex items-center justify-center min-w-4 h-4 px-1 rounded-md text-[10px] font-black tabular-nums bg-primary text-primary-foreground">
              {trainingCount}
            </span>
          </div>
        </div>
      </ItemContent>
    </Item>
  );
}
