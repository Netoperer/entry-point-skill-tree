import MinorPerksDetails from "./minors";
import UniquePerksDetails from "./uniques";

export default function Details() {
  return (
    <div className="flex w-full flex-row gap-4 p-2">
      <MinorPerksDetails />
      <UniquePerksDetails />
    </div>
  );
}
