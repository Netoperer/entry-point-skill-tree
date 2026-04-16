import type { PerkEntry } from "../../types";

interface Props {
  perkEntry: PerkEntry;
}

export default function PerkNode({ perkEntry }: Props) {
  const size = perkEntry.coordinates.z * 1.75;

  return (
    <>
      <image
        width={size}
        height={size}
        x={perkEntry.coordinates.x - size / 2}
        y={perkEntry.coordinates.y - size / 2}
        href={perkEntry.perk.icon}
      >
        <title>{perkEntry.perk.name}</title>
      </image>

      {/* <text
              x={perk.position.x + perk.position.size / 2}
              y={perk.position.y + perk.position.size / 2}
              textAnchor="middle"
              fontSize="10"
              fill="white"
              pointerEvents={"none"}
            >
              {perk.id}
            </text> */}
    </>
  );
}
