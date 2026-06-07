import { CONNECTIONS } from "@/config/freelancers-cut/connections";
import { PERK_ENTRIES } from "@/config/freelancers-cut/entries";
import ConnectionLine from "./connection-line";
import { PerkNode } from "./perk-node";

export default function Editor() {
  return (
    <svg
      viewBox="0 0 500 500"
      preserveAspectRatio="xMidYMid meet"
      width="100%"
      height="100%"
      className="m-auto rounded-xl shadow-md lg:h-screen lg:p-4"
    >
      {...CONNECTIONS.map((entries) => {
        return <ConnectionLine entries={entries} key={entries.join("-")} />;
      })}
      {...Object.entries(PERK_ENTRIES).map(([id, perk]) => (
        <PerkNode perkEntry={perk} id={id} key={`Perk_${id}`} />
      ))}
    </svg>
  );
}
