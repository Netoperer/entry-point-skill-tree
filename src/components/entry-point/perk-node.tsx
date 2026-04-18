import { useEntryPointStore } from "../../store/entry-point";
import type { PerkEntry } from "../../types";
import { handleClick } from "../../utils/entry-point/handle-click";

interface Props {
  perkEntry: PerkEntry;
  id: string;
}

export default function PerkNode({ perkEntry, id }: Props) {
  const size = perkEntry.coordinates.z * 2;

  const isLocked = useEntryPointStore((s) => !s.unlockedNodes.has(id));
  console.log(`rerender ${id}`);

  return (
    <>
      <image
        width={size}
        height={size}
        x={perkEntry.coordinates.x - size / 2}
        y={perkEntry.coordinates.y - size / 2}
        href={perkEntry.perk.icon}
        filter={isLocked ? "url(#default)" : ""}
        style={{ cursor: "pointer", pointerEvents: "auto" }}
        onClick={() => {
          handleClick(id);
        }}
      >
        <title>{perkEntry.perk.description}</title>
      </image>
    </>
  );
}
