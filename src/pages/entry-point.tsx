import ConnectionLine from "@/components/entry-point/connection-line";
import FilterDefs from "@/components/entry-point/filter-defs";
import PerkNode from "@/components/entry-point/perk-node";
import { CONNECTIONS } from "@/config/connections";
import { PERK_ENTRIES } from "@/config/entries";
import { URLSync } from "@/components/entry-point/url-sync";
import { HoverHighlight } from "@/components/entry-point/hover-highlight";

export default function EntryPoint() {
  return (
    <div className="h-screen rounded-sm p-2 lg:h-screen 2xl:w-full aspect-square">
      <URLSync />
      <HoverHighlight />
      <svg
        viewBox="0 0 700 700"
        preserveAspectRatio="xMidYMid meet"
        width="100%"
        height="100%"
        className="m-auto rounded-xl shadow-md lg:h-screen lg:p-4"
      >
        <FilterDefs />

        {...CONNECTIONS.map((entries) => {
          return <ConnectionLine entries={entries} key={entries.join("-")} />;
        })}

        {...Object.entries(PERK_ENTRIES).map(([id, perk]) => (
          <PerkNode perkEntry={perk} id={id} key={`Perk_${id}`} />
        ))}
      </svg>
    </div>
  );
}
