import MajorPerksDetails from "./majors";
import MinorPerksDetails from "./minors";
import PerkCount from "./perk-count";
import ClassPlaceholder from "./class-placeholder";

export default function Details() {
  return (
    <div className="flex w-full flex-col gap-4 p-1">
      <div className="flex flex-row gap-3 items-stretch">
        <div className="flex-1">
          <ClassPlaceholder />
        </div>
        <div className="w-1/3 min-w-[100px]">
          <PerkCount />
        </div>
      </div>

      <MajorPerksDetails />
      <MinorPerksDetails />
    </div>
  );
}
