import { useUnlockedNodes } from "../../hooks/entry-point/use-unlocked-nodes";
import type { PerkEntry } from "../../types";
import { useHandleClick } from "../../hooks/entry-point/use-handle-click";

interface Props {
  perkEntry: PerkEntry;
  id: string;
}

export default function PerkNode({ perkEntry, id }: Props) {
  const size = perkEntry.coordinates.z * 2;

  const { unlockedNodes } = useUnlockedNodes();
  const isLocked = !unlockedNodes.has(id);

  console.log("rerneder");

  const handleClick = useHandleClick();

  return (
    <>
      <image
        width={size}
        height={size}
        x={perkEntry.coordinates.x - size / 2}
        y={perkEntry.coordinates.y - size / 2}
        href={perkEntry.perk.icon}
        filter={isLocked ? "url(#default)" : ""}
        onClick={() => handleClick(id)}
      >
        <title>{perkEntry.perk.description}</title>
      </image>
    </>
  );
}
