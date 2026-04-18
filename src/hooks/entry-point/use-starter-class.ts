import { parseAsInteger, useQueryState } from "nuqs";

export function useStarterClass() {
  const [starterClass] = useQueryState(
    "starterClass",
    parseAsInteger.withDefault(0),
  );

  return `${starterClass}`;
}
