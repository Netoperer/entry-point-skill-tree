import { CONNECTIONS } from "@/config/freelancers-cut/connections";
import { PERK_ENTRIES } from "@/config/freelancers-cut/entries";
import ConnectionLine from "./connection-line";
import { PerkNode } from "./perk-node";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import FilterDefs from "./filter-defs";

export default function Editor() {
  return (
    <TransformWrapper
      initialPositionX={0}
      initialPositionY={0}
      centerOnInit={true}
      doubleClick={{ disabled: true }}
      maxScale={3}
      wheel={{ step: 0.001 }}
      pinch={{ step: 0.001 }}
      panning={{
        excluded: ["image"],
      }}
    >
      <TransformComponent
        wrapperStyle={{
          width: "100%",
          height: "100%",
        }}
        contentStyle={{
          width: "100%",
          height: "100%",
        }}
      >
        <svg
          viewBox="0 -20 640 690"
          className="w-full h-full select-none"
          preserveAspectRatio="xMidYMid meet"
          width="100%"
          height="100%"
        >
          <FilterDefs />

          {...CONNECTIONS.map((entries) => {
            return <ConnectionLine entries={entries} key={entries.join("-")} />;
          })}
          {...Object.entries(PERK_ENTRIES).map(([id, perk]) => (
            <PerkNode perkEntry={perk} id={id} key={`Perk_${id}`} />
          ))}
        </svg>
      </TransformComponent>
    </TransformWrapper>
  );
}
