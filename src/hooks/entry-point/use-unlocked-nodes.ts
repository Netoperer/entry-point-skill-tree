import { useQueryState } from "nuqs";

import { createParser } from "nuqs";
import { decode, encode } from "../../utils/compress-url";
import { produce } from "immer";

const parseAsSet = createParser({
  parse(queryValue) {
    return decode(queryValue);
  },
  serialize(value) {
    return encode(value);
  },
});

export function useUnlockedNodes() {
  const [unlockedNodes, setUnlockedNodes] = useQueryState(
    "unlocked",
    parseAsSet.withDefault(new Set<string>(["0"])),
  );

  const unlockNode = (id: string) => {
    setUnlockedNodes(
      produce(unlockedNodes, (draft) => {
        draft.add(id);
      }),
    );
  };

  const lockNode = (id: string) => {
    setUnlockedNodes(
      produce(unlockedNodes, (draft) => {
        draft.delete(id);
      }),
    );
  };

  return { unlockedNodes, unlockNode, lockNode };
}
