import { useEffect, useRef } from "react";
import { useQueryState, createParser, parseAsInteger } from "nuqs";
import { useEntryPointStore } from "store/entry-point";
import { decode, encode } from "utils/compress-url";
import { areSetsEqual } from "utils/are-sets-equal";
import { StarterClass } from "types";

const parseAsSet = createParser({
  parse(queryValue) {
    return decode(queryValue);
  },
  serialize(value) {
    return encode(value);
  },
});

export function URLSync() {
  const [unlockedQuery, setUnlockedQuery] = useQueryState(
    "unlocked",
    parseAsSet.withDefault(new Set<string>([StarterClass.Prodigy])),
  );

  const [starterClassQuery, setStarterClassQuery] = useQueryState(
    "starterClass",
    parseAsInteger.withDefault(Number(StarterClass.Prodigy)),
  );

  const unlockedNodes = useEntryPointStore((s) => s.unlockedNodes);
  const starterClass = useEntryPointStore((s) => s.starterClass);
  const setUnlocked = useEntryPointStore((s) => s.setUnlocked);
  const changeStarterClass = useEntryPointStore((s) => s.changeStarterClass);

  // Track the state that we last successfully synced to both URL and Store
  const lastSyncedNodes = useRef<Set<string>>(unlockedNodes);
  const lastSyncedClass = useRef<string>(starterClass);

  // 1. URL -> Store
  useEffect(() => {
    if (!areSetsEqual(unlockedQuery, lastSyncedNodes.current)) {
      lastSyncedNodes.current = unlockedQuery;
      setUnlocked(unlockedQuery);
    }
    if (String(starterClassQuery) !== lastSyncedClass.current) {
      lastSyncedClass.current = String(starterClassQuery);
      changeStarterClass(String(starterClassQuery) as StarterClass);
    }
  }, [unlockedQuery, starterClassQuery, setUnlocked, changeStarterClass]);

  // 2. Store -> URL
  useEffect(() => {
    if (!areSetsEqual(unlockedNodes, lastSyncedNodes.current)) {
      lastSyncedNodes.current = unlockedNodes;
      setUnlockedQuery(unlockedNodes, { shallow: true });
    }
    if (starterClass !== lastSyncedClass.current) {
      lastSyncedClass.current = starterClass;
      setStarterClassQuery(Number(starterClass), { shallow: true });
    }
  }, [unlockedNodes, starterClass, setUnlockedQuery, setStarterClassQuery]);

  return null;
}
