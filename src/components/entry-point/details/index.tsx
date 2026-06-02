import MinorPerksDetails from "./minors";
import UniquePerksDetails from "./uniques";

export default function Details() {
  return (
    <div className="flex flex-1 w-full flex-col gap-6">
      <UniquePerksDetails />
      <MinorPerksDetails />
    </div>
  );
}
