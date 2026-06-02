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
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="gap-2 pt-2 shadow-none transition-all duration-200">
        <CollapsibleTrigger asChild>
          <CardHeader className="flex flex-row items-center gap-3 px-5 py-4 cursor-pointer hover:bg-muted/30 select-none">
            <div className="h-7 w-1 rounded-full bg-primary" />
            <span className="font-semibold text-xl flex-1 text-left">
              Unique Perks
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
              {Object.values(uniques).map((perk) => (
                <UniquePerkItem key={perk.name} perk={perk} />
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

export function UniquePerkItem({ perk }: Props) {
  const isUnlocked = useEntryPointStore((store) =>
    selectUnlockedUniquePerks(store).has(perk),
  );

  return (
    <Item
      variant="outline"
      className={cn(
        "group relative overflow-hidden transition-all duration-200 w-full cursor-default",
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

      <ItemContent className="flex flex-row items-center gap-1.5 p-1.5">
        <ItemMedia>
          <div className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-md transition-colors",
            isUnlocked ? "bg-primary/20" : "bg-muted"
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
      </ItemContent>
    </Item>
  );
}
