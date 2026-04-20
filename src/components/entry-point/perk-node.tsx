import { useEntryPointStore } from "@/store/entry-point";
import type { PerkEntry } from "@/types";
import { handleClick } from "@/core/entry-point/handle-click";
import { selectSelectedNodes } from "@/store/entry-point/selectors";

interface Props {
  perkEntry: PerkEntry;
  id: string;
}

export default function PerkNode({ perkEntry, id }: Props) {
  const size = perkEntry.coordinates.z * 2;

  const isUnocked = useEntryPointStore((store) => store.unlockedNodes.has(id));
  const isSelected = useEntryPointStore((store) =>
    selectSelectedNodes(store).has(id),
  );
  const setHoveredNode = useEntryPointStore((store) => store.setHoveredNode);
  console.log(`rerender ${id}`);

  const filter = isSelected
    ? "url(#selected)"
    : isUnocked
      ? ""
      : "url(#default)";

  return (
    <>
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
    </>
  );
}
