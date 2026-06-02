import { uniques } from "@/config/perks/uniques";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Item, ItemContent, ItemTitle, ItemMedia } from "@/components/ui/item";
import type { Perk } from "@/types";

export default function UniquePerksDetails() {
  return (
    <Card className="gap-2 pt-1 shadow-none">
      <CardHeader className="flex flex-row items-center gap-3 px-5 py-4">
        <div className="h-7 w-1 rounded-full bg-foreground" />
        <span className="font-semibold text-xl">Unique Perks</span>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div className="grid grid-cols-3 gap-2.5">
          {...Object.entries(uniques).map(([, perk]) => (
            <UniquePerkItem perk={perk} />
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
  return (
    <Item
      variant="outline"
      className="group transition-colors hover:bg-muted/60"
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
        <div className="flex flex-col min-w-0">
          <ItemTitle className="text-sm font-medium leading-tight">
            {perk.name}
          </ItemTitle>
        </div>
      </ItemContent>
    </Item>
  );
}
