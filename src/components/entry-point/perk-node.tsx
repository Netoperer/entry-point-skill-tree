import { useTreeStore } from "../../store/entry-point-store";
import type { PerkEntry } from "../../types";
import { EntryPointGraph } from "../../utils/entry-point/graph";

interface Props {
  perkEntry: PerkEntry;
  id: string;
}

export default function PerkNode({ perkEntry, id }: Props) {
  const size = perkEntry.coordinates.z * 2;

  const isLocked = useTreeStore((state) => !state.unlockedNodes.has(id));

  const handleClick = () => {
    if (!isLocked) {
      if (EntryPointGraph.wouldDisconnect(id)) {
        return;
      }

      if (useTreeStore.getState().starterClass == id) {
        return;
      }

      useTreeStore.getState().lockNode(id);
      return;
    }

    if (!EntryPointGraph.isAdjacentToUnlocked(id)) {
      return;
    }

    useTreeStore.getState().unlockNode(id);
  };

  // const handleHover = () => {}

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
