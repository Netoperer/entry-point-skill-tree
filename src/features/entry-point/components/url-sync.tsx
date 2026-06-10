import { useEffect, useRef } from "react";
import { useQueryState, createParser, parseAsInteger } from "nuqs";
import { useEntryPointStore } from "@/features/entry-point/store";
import { decode, encode } from "@/shared/utils/compress-url";
import { areSetsEqual } from "@/shared/utils/are-sets-equal";
import { StarterClass } from "@/features/entry-point/types";

const parseAsSet = createParser({
  parse(queryValue) {
    return decode(queryValue);
  },
  serialize(value) {
    return encode(value);
  },
});

// Yes i know this file is a mess
export function URLSync() {
  const [unlockedQuery, setUnlockedQuery] = useQueryState(
    "unlocked",
    parseAsSet.withDefault(new Set<string>([StarterClass.TheArtOfTheSteal])),
  );

  const [starterClassQuery, setStarterClassQuery] = useQueryState(
    "starterClass",
    parseAsInteger.withDefault(Number(StarterClass.TheArtOfTheSteal)),
  );

  const [perkLimitQuery, setPerkLimitQuery] = useQueryState(
    "perkLimit",
    parseAsInteger.withDefault(75),
  );

  const unlockedNodes = useEntryPointStore((s) => s.unlockedNodes);
  const starterClass = useEntryPointStore((s) => s.starterClass);
  const perkLimit = useEntryPointStore((s) => s.perkLimit);
  const setUnlocked = useEntryPointStore((s) => s.setUnlocked);
  const changeStarterClass = useEntryPointStore((s) => s.changeStarterClass);
  const setPerkLimit = useEntryPointStore((s) => s.setPerkLimit);

  // Track the state that we last successfully synced to both URL and Store
  const lastSyncedNodes = useRef<Set<string>>(unlockedNodes);
  const lastSyncedClass = useRef<string>(starterClass);
  const lastSyncedLimit = useRef<number>(perkLimit);

  // 1. URL -> Store
  useEffect(() => {
    if (String(starterClassQuery) !== lastSyncedClass.current) {
      lastSyncedClass.current = String(starterClassQuery);

      const starterClass = `${starterClassQuery}`;

      if (!unlockedQuery.has(starterClass)) {
        setUnlocked(new Set([starterClass]));
      }

      changeStarterClass(starterClass as StarterClass);
    }
    if (!areSetsEqual(unlockedQuery, lastSyncedNodes.current)) {
      lastSyncedNodes.current = unlockedQuery;
      setUnlocked(unlockedQuery);
    }
    if (perkLimitQuery !== lastSyncedLimit.current) {
      lastSyncedLimit.current = perkLimitQuery;
      setPerkLimit(perkLimitQuery);
    }
  }, [
    unlockedQuery,
    starterClassQuery,
    perkLimitQuery,
    setUnlocked,
    changeStarterClass,
    setPerkLimit,
  ]);

  // 2. Store -> URL
  useEffect(() => {
    if (starterClass !== lastSyncedClass.current) {
      lastSyncedClass.current = starterClass;
      setStarterClassQuery(Number(starterClass), { shallow: true });
    }
    if (!areSetsEqual(unlockedNodes, lastSyncedNodes.current)) {
      lastSyncedNodes.current = unlockedNodes;
      setUnlockedQuery(unlockedNodes, { shallow: true });
    }
    if (perkLimit !== lastSyncedLimit.current) {
      lastSyncedLimit.current = perkLimit;
      setPerkLimitQuery(perkLimit, { shallow: true });
    }
  }, [
    unlockedNodes,
    starterClass,
    perkLimit,
    setUnlockedQuery,
    setStarterClassQuery,
    setPerkLimitQuery,
  ]);

  return null;
}
