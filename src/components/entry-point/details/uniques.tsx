import { uniques } from "@/config/perks/uniques";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Item, ItemContent, ItemTitle, ItemMedia } from "@/components/ui/item";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Perk } from "@/types";
import { useEntryPointStore } from "@/store/entry-point";
import { selectUnlockedUniquePerks } from "@/store/entry-point/selectors";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function UniquePerksDetails() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className="max-w-2/7 gap-2 p-2 shadow-none transition-all duration-200 bg-card/50">
      <CardHeader className="flex flex-row items-center gap-3 px-4 py-2 cursor-pointer select-none">
        <div className="h-6 w-1 rounded-full bg-primary" />
        <span className="font-semibold text-lg flex-1 text-left">
          Unique Perks
        </span>
      </CardHeader>
      <CardContent className="px-2 pb-3">
        <div className="grid grid-cols-1 gap-1 mt-0.5">
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
        "p-2 group relative overflow-hidden transition-all duration-200 w-full cursor-default rounded-lg",
        "border border-border/50 hover:border-border hover:bg-muted/40",
        isUnlocked && [
          "border-primary/40 bg-primary/10",
          "hover:bg-primary/15 hover:border-primary/60 shadow-sm shadow-primary/10",
        ],
      )}
    >
      {isUnlocked && (
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent" />
      )}

      <ItemContent className="flex flex-row items-center">
        <ItemMedia className="pr-2">
          <div
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-md transition-colors",
              isUnlocked ? "bg-primary/20" : "bg-muted",
            )}
          >
            <img
              src={perk.icon}
              alt={perk.name}
              title={perk.description}
              width={24}
              height={24}
              className={cn(
                isUnlocked ? "opacity-100" : "opacity-40 grayscale",
              )}
            />
          </div>
        </ItemMedia>

        <ItemTitle
          className={cn(
            "flex-1 min-w-0 font-medium text-[14px] leading-tight truncate",
            isUnlocked ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {perk.name}
        </ItemTitle>
      </ItemContent>
    </Item>
  );
}
