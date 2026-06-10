import MajorPerksDetails from "./majors";
import MinorPerksDetails from "./minors";
import PerkCount from "./perk-count";
import ClassPlaceholder from "./class-placeholder";

export default function Details() {
  return (
    <div className="flex w-full flex-col gap-4 p-1 h-full">
      <div className="flex w-full flex-col lg:flex-row items-start gap-3 2xl:gap-4">
        {/* Left Side: Class and Majors */}
        <div className="lg:w-7/11 w-full flex flex-col gap-4">
          <ClassPlaceholder />
          <MajorPerksDetails />
        </div>

        {/* Right Side: PerkCount and Minors */}
        <div className="w-full flex-1 flex flex-col gap-4">
          <PerkCount />
          <MinorPerksDetails />
        </div>
      </div>
    </div>
  );
}
