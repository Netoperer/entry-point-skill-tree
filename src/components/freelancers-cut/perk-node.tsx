import { PerkType, type PerkEntry } from "@/types/freelancers-cut";

interface Props {
  perkEntry: PerkEntry;
  id: string;
}

const sizeMap: Record<PerkType, number> = {
  [PerkType.Minor]: 4,
  [PerkType.Major]: 6,
  [PerkType.Specialisation]: 8,
};

export function PerkNode({ perkEntry, id }: Props) {
  //   const isUnlocked = useEntryPointStore((store) => store.unlockedNodes.has(id));
  //   const isSelected = useEntryPointStore((store) =>
  //     selectSelectedNodes(store).has(id),
  //   );
  //   const setHoveredNode = useEntryPointStore((store) => store.setHoveredNode);

  const isSelected = false;
  const isUnlocked = false;

  const filter = isSelected
    ? "url(#selected)"
    : isUnlocked
      ? "url(#unlocked)"
      : "url(#default)";

  const size = sizeMap[perkEntry.perk.perkType] * 2;

  return (
    <>
      <image
        width={size}
        height={size}
        x={perkEntry.position.x - size / 2}
        y={perkEntry.position.y - size / 2}
        href={perkEntry.perk.icon}
        filter={filter}
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

      <text
        x={perkEntry.position.x - size / 2}
        y={perkEntry.position.y - size / 2}
        font-size="24"
        fill="blue"
      >
        {id}
      </text>
    </>
  );
}
