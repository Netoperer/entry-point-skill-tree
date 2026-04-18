import { PERK_ENTRIES } from "../../config/entries";
import { useUnlockedNodes } from "../../hooks/entry-point/use-unlocked-nodes";

interface Props {
  entries: [number, number];
}

// TODO: fix type mismatch (string and number)
export default function ConnectionLine({ entries }: Props) {
  const [id1, id2] = entries;

  const { unlockedNodes } = useUnlockedNodes();

  const isPathUnlocked =
    unlockedNodes.has(`${id1}`) && unlockedNodes.has(`${id2}`);

  const perk1 = PERK_ENTRIES[id1]!;
  const perk2 = PERK_ENTRIES[id2]!;

  return (
    <line
      x1={perk1.coordinates.x}
      y1={perk1.coordinates.y}
      x2={perk2.coordinates.x}
      y2={perk2.coordinates.y}
      stroke={isPathUnlocked ? "white" : "#ddd"}
      strokeWidth={isPathUnlocked ? 1.5 : 0.5}
    />
  );
}
