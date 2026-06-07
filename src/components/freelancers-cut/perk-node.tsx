import type { PerkEntry } from "@/types/freelancers-cut";

interface Props {
  perkEntry: PerkEntry;
  id: string;
}

export function PerkNode({ perkEntry, id }: Props) {
  const size = 8;

  //   const isUnlocked = useEntryPointStore((store) => store.unlockedNodes.has(id));
  //   const isSelected = useEntryPointStore((store) =>
  //     selectSelectedNodes(store).has(id),
  //   );
  //   const setHoveredNode = useEntryPointStore((store) => store.setHoveredNode);

  //   const filter = isSelected
  //     ? "url(#selected)"
  //     : isUnlocked
  //       ? "url(#unlocked)"
  //       : "url(#default)";

  return (
    <image
      width={size}
      height={size}
      x={perkEntry.position.x - size / 2}
      y={perkEntry.position.y - size / 2}
      href={perkEntry.perk.icon}
      //   filter={filter}
      style={{ cursor: "pointer", pointerEvents: "auto" }}
      //   onClick={() => {
      //     handleClick(id);
      //   }}
      //   onMouseEnter={() => {
      //     setHoveredNode(id);
      //   }}
      //   onMouseLeave={() => {
      //     setHoveredNode(null);
      //   }}
    >
      <title>{perkEntry.perk.description(1, [])}</title>
    </image>
  );
}
