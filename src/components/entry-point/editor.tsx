import { CONNECTIONS } from "@/config/connections";
import { PERK_ENTRIES } from "@/config/entries";
import ConnectionLine from "./connection-line";
import FilterDefs from "./filter-defs";
import PerkNode from "./perk-node";

export default function Editor() {
  return (
    <svg viewBox="0 0 700 700" className="w-full h-full select-none">
      <FilterDefs />

      {...CONNECTIONS.map((entries) => {
        return <ConnectionLine entries={entries} key={entries.join("-")} />;
      })}

      {...Object.entries(PERK_ENTRIES).map(([id, perk]) => (
        <PerkNode perkEntry={perk} id={id} key={`Perk_${id}`} />
      ))}
    </svg>
  );
}
