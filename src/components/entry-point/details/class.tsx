import { Card, CardHeader } from "@/components/ui/card";
import { getClassPerksTitle } from "@/core/entry-point/getClassPerksTitle";
import { useEntryPointStore } from "@/store/entry-point";
import { selectUnlockedClassPerks } from "@/store/entry-point/selectors";

export default function ClassDetails() {
  const classesUnlocked = useEntryPointStore(selectUnlockedClassPerks);

  return (
    <Card className="w-full flex flex-col gap-4 p-4 transition-all duration-200 bg-card/50">
      <CardHeader className="px-2 py-0 flex justify-between items-center">
        <div className="flex flex-row items-center select-none gap-3">
          <div className="h-6 w-1 rounded-full bg-foreground" />
          <span className="font-semibold text-lg flex-1 text-left">Class</span>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex">
            {[...classesUnlocked].map((perk) => (
              <img
                src={perk.icon}
                width={24}
                height={24}
                className="-ml-2 first:ml-0 border-card border-2 rounded-full"
              />
            ))}
          </div>
          <span className="pl-2 font-bold">
            {getClassPerksTitle(classesUnlocked)}
          </span>
        </div>
      </CardHeader>
    </Card>
  );
}
