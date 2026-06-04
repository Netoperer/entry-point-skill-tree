import ClassDetails from "./class";
import MinorPerksDetails from "./minors";
import UniquePerksDetails from "./uniques";
import WeaponMasteriesDetails from "./weapon-masteries";

export default function Details() {
  return (
    <div className="flex w-full lg:flex-row flex-col items-start gap-3 p-1 2xl:gap-4">
      <div className="lg:w-7/10 w-full flex flex-col gap-4">
        <ClassDetails />
        <MinorPerksDetails />
        <WeaponMasteriesDetails />
      </div>
      <UniquePerksDetails />
    </div>
  );
}
