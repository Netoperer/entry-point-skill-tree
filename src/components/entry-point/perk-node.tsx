import { useTreeStore } from "../../store/entry-point-store";
import type { PerkEntry } from "../../types";

interface Props {
  perkEntry: PerkEntry;
  id: string;
}

export default function PerkNode({ perkEntry, id }: Props) {
  const size = perkEntry.coordinates.z * 2;

  const isLocked = useTreeStore((state) => !state.unlockedNodes.has(id));

  const handleClick = () => {
    if (!isLocked) {
      useTreeStore.getState().lockNode(id);
      return;
    }
    useTreeStore.getState().unlockNode(id);
  };

  return (
    <>
      <image
        width={size}
        height={size}
        x={perkEntry.coordinates.x - size / 2}
        y={perkEntry.coordinates.y - size / 2}
        href={perkEntry.perk.icon}
        filter={isLocked ? "url(#default)" : ""}
        onClick={handleClick}
      >
        <title>{perkEntry.perk.description}</title>
      </image>
    </>
  );
}
