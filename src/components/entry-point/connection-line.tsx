import { PERK_ENTRIES } from "@/config/entries";
import { useEntryPointStore } from "@/store/entry-point";
import { selectSelectedNodes } from "@/store/entry-point/selectors";

interface Props {
  entries: [string, string];
}

// TODO: fix type mismatch (string and number)
export default function ConnectionLine({ entries }: Props) {
  const [id1, id2] = entries;

  const isPathUnlocked = useEntryPointStore(
    (s) => s.unlockedNodes.has(id1) && s.unlockedNodes.has(id2),
  );

  const isPathSelected = useEntryPointStore((s) => {
    const selectedNodes = selectSelectedNodes(s);
    return (
      (selectedNodes.has(id1) && selectedNodes.has(id2)) ||
      (selectedNodes.has(id1) && s.unlockedNodes.has(id2)) ||
      (selectedNodes.has(id2) && s.unlockedNodes.has(id1))
    );
  });

  const perk1 = PERK_ENTRIES[id1]!;
  const perk2 = PERK_ENTRIES[id2]!;

  const stroke = isPathSelected ? "red" : isPathUnlocked ? "white" : "#ddd";

  return (
    <line
      x1={perk1.coordinates.x}
      y1={perk1.coordinates.y}
      x2={perk2.coordinates.x}
      y2={perk2.coordinates.y}
      stroke={stroke}
      strokeWidth={isPathUnlocked || isPathSelected ? 1.5 : 0.5}
    />
  );
}
