import { PERK_ENTRIES } from "../../config/entries";

interface Props {
  entries: [number, number];
}

export default function ConnectionLine({ entries }: Props) {
  const [id1, id2] = entries;

  console.log(id1, id2);

  const perk1 = PERK_ENTRIES[id1]!;
  const perk2 = PERK_ENTRIES[id2]!;

  return (
    <line
      x1={perk1.coordinates.x}
      y1={perk1.coordinates.y}
      x2={perk2.coordinates.x}
      y2={perk2.coordinates.y}
      stroke="white"
    />
  );
}
