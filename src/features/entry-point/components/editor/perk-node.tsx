import { useEntryPointStore } from "@/features/entry-point/store";
import type { PerkEntry } from "@/features/entry-point/types";
import { handleClick } from "@/features/entry-point/core/handle-click";
import { selectSelectedNodes } from "@/features/entry-point/store/selectors";

interface Props {
  perkEntry: PerkEntry;
  id: string;
}

export default function PerkNode({ perkEntry, id }: Props) {
  const size = perkEntry.coordinates.z * 2;

  const isUnlocked = useEntryPointStore((store) => store.unlockedNodes.has(id));
  const isSelected = useEntryPointStore((store) =>
    selectSelectedNodes(store).has(id),
  );
  const setHoveredNode = useEntryPointStore((store) => store.setHoveredNode);

  const filter = isSelected
    ? "url(#selected)"
    : isUnlocked
      ? "url(#unlocked)"
      : "url(#default)";

  return (
    <image
      width={size}
      height={size}
      x={perkEntry.coordinates.x - size / 2}
      y={perkEntry.coordinates.y - size / 2}
      href={perkEntry.perk.icon}
      filter={filter}
      style={{ cursor: "pointer", pointerEvents: "auto" }}
      onClick={() => {
        handleClick(id);
      }}
      onMouseEnter={() => {
        setHoveredNode(id);
      }}
      onMouseLeave={() => {
        setHoveredNode(null);
      }}
    >
      <title>{perkEntry.perk.description}</title>
    </image>
  );
}

