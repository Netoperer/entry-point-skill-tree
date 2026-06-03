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
        <div className="font-bold">{getClassPerksTitle(classesUnlocked)}</div>
      </CardHeader>
    </Card>
  );
}
